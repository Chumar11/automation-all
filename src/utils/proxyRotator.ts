import ProxyLists from 'proxy-lists';
import {  Server } from 'proxy-chain';
export class ProxyRotator {
  private static instance: ProxyRotator;

  private proxyList: string[] = [];
  private currentIndex: number = 0;
  private proxyServer: Server | null = null;
  private constructor() {}
  static getInstance(): ProxyRotator {
    if (!ProxyRotator.instance) {
      ProxyRotator.instance = new ProxyRotator();
    }
    return ProxyRotator.instance;
  }
  async initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      const proxies: string[] = [];
      ProxyLists.getProxies({
        countries: ['us', 'gb', 'ca'], // Add desired countries
        protocols: ['http', 'https']
      })
        .on('data', (proxyBatch) => {
          proxies.push(...proxyBatch.map((p: any) => `http://${p.ipAddress}:${p.port}`));
        })
        .on('error', reject)
        .on('end', () => {
          this.proxyList = proxies;
          if (this.proxyList.length === 0) {
            return reject(new Error('No proxies retrieved.'));
          }
          resolve();
        });
    });
  }

  static async startServer(): Promise<string> {
    const instance = ProxyRotator.getInstance();
    return instance.startLocalServer();
  }

  private async startLocalServer(): Promise<string> {
    if (this.proxyList.length === 0) {
      throw new Error('Proxy list is empty. Initialize before starting the server.');
    }

    this.proxyServer = new Server({
      port: 8000,
      prepareRequestFunction: () => {
        const proxy = this.getNextProxy();
        return {
          upstreamProxyUrl: proxy
        };
      }
    });

    await this.proxyServer.listen();
    return 'http://localhost:8000';
  }

  

  private getNextProxy(): string {
    if (this.proxyList.length === 0) {
      throw new Error('No available proxies.');
    }
    const proxy = this.proxyList[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.proxyList.length;
    return proxy;
  }

  async stop(): Promise<void> {
    if (this.proxyServer) {
      await this.proxyServer.close(true);
      this.proxyServer = null;
    }
  }
}

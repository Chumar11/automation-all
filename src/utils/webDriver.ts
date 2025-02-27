import { WebDriver, Builder } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';

class DriverManager {
  private drivers: Map<string, WebDriver>;

  constructor() {
    this.drivers = new Map();
  }

  async createDriver(id: string): Promise<WebDriver> {
    const options = new Options();
    const driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
    
    this.drivers.set(id, driver);
    return driver;
  }

  getDriver(id: string): WebDriver | undefined {
    return this.drivers.get(id);
  }

  async closeDriver(id: string): Promise<void> {
    const driver = this.drivers.get(id);
    if (driver) {
      await driver.quit();
      this.drivers.delete(id);
    }
  }

  getAllDrivers(): Map<string, WebDriver> {
    return this.drivers;
  }
}

// Export a singleton instance
export const driverManager = new DriverManager();
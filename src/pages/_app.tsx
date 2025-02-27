import * as React from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
// import "src/style/globals.css";
import "src/styles/global.css";
// theme provider
import ThemeProvider from "src/theme";
import GlobalStyles from "src/theme/globalStyles";

// contexts
import { AuthProvider } from "src/contexts/AuthContext";

// redux
import { Provider as ReduxProvider } from "react-redux";
import { store } from "src/redux/store";
import { ContextProvider } from "../contexts/SettingsContext";
// react-qurery
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

// notification toaster
import { Toaster } from "react-hot-toast";
import "animate.css"; // layout
import Layout from "src/layout";
import { motion, useScroll, useSpring } from "framer-motion";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export async function getServerSideProps({ ...props }) {
  const { req, res } = props;
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return {
    props: {},
  };
}

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  const { pathname } = useRouter();
  const isDemo = pathname.includes("/auth");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {/* <ReduxProvider store={store}> */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ContextProvider>
          <ThemeProvider>
            <AuthProvider>
              <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                  <Layout>
                    <GlobalStyles />
                    <Component {...pageProps} />
                  </Layout>
                </Hydrate>
              </QueryClientProvider>
            </AuthProvider>
          </ThemeProvider>
        </ContextProvider>
      </LocalizationProvider>
      {/* </ReduxProvider> */}
    </>
  );
}

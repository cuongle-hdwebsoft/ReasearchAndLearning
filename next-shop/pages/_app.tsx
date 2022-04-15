import "../styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from "../common/hocs/MainLayout";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";
import { SnackbarProvider } from "notistack";
import HydrateContextProvider from "../common/hocs/HydrateContextProvider";
import AuthContextProvider, {
  handler,
} from "../common/hocs/AuthContextProvider";
import AppContextProvider from "../common/hocs/AppContextProvider";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <HydrateContextProvider dehydratedState={pageProps.dehydratedState}>
          <AuthContextProvider handler={handler}>
            <AppContextProvider>
              <SnackbarProvider
                maxSnack={5}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                autoHideDuration={1000}
              >
                <MainLayout>
                  <Component {...pageProps} />
                </MainLayout>
              </SnackbarProvider>
            </AppContextProvider>
          </AuthContextProvider>
        </HydrateContextProvider>
        <ReactQueryDevtools></ReactQueryDevtools>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;

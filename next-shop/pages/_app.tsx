import "../styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from "../common/hocs/MainLayout";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";
import { SnackbarProvider } from "notistack";
import HydrateContextProvider from "../common/hocs/HydrateContextProvider";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(new QueryClient());

  // console.log("pageProps", pageProps);
  // console.log("pageProps.dehydratedState", pageProps.dehydratedState);

  console.log("MyApp", typeof window === "undefined");

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <HydrateContextProvider dehydratedState={pageProps.dehydratedState}>
          <SnackbarProvider
            maxSnack={5}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </SnackbarProvider>
        </HydrateContextProvider>
        <ReactQueryDevtools></ReactQueryDevtools>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;

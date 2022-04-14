import "../styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from "../common/hocs/MainLayout";
import {
  hydrate,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useEffect, useState } from "react";
import HydrateContextProvider from "../common/hooks/HydrateContextProvider";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(new QueryClient());

  // console.log("pageProps", pageProps);
  // console.log("pageProps.dehydratedState", pageProps.dehydratedState);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <HydrateContextProvider dehydratedState={pageProps.dehydratedState}>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </HydrateContextProvider>
        <ReactQueryDevtools></ReactQueryDevtools>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;

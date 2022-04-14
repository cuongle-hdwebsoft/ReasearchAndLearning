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

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(new QueryClient());

  console.log("pageProps.dehydratedState", pageProps.dehydratedState);
  useEffect(() => {
    hydrate(queryClient, pageProps.dehydratedState, {
      defaultOptions: {
        queries: {
          cacheTime: Infinity,
        },
      },
    });
  }, [pageProps.dehydratedState, queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
        <ReactQueryDevtools></ReactQueryDevtools>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;

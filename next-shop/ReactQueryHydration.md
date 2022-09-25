# Example 1

```
import {
  dehydrate,
  QueryClient,
  useHydrate,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

export const getServerSideProps = async () => {
  console.log("getServerSideProps index.js");

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["todos", { page: 0, limit: 5 }],
    queryFn: ({ queryKey: { page, limit } }) => {
      return axios({
        method: "GET",
        url: "http://localhost:3001/todos",
        params: {
          _p: page,
          _l: limit,
        },
      }).then((res) => res.data);
    },
  });

  return {
    props: {
      count: 1,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Home({ count, dehydratedState }) {
  useHydrate(dehydratedState);
  const [state, setState] = useState(11);
  const {} = useQuery({
    queryKey: ["todos", { page: 0, limit: 5 }],
    queryFn: ({ queryKey: { page, limit } }) => {
      return axios({
        method: "GET",
        url: "http://localhost:3001/todos",
        params: {
          _p: page,
          _l: limit,
        },
      }).then((res) => res.data);
    },
    staleTime: 3000,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setState(100);
  }, []);

  return (
    <div>
      <h1>Homepage {state}</h1>
      <div>{count}</div>
    </div>
  );
}

import "../styles/globals.css";
import { QueryClient, hydrate, Hydrate } from "@tanstack/react-query";
import Link from "next/link";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";

let count = 0;

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(new QueryClient());

  // if (typeof window === "object") {
  //   console.log(queryClient);
  //   hydrate(queryClient, pageProps.dehydratedState);
  // }

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={{}}>
        <div>
          <Link href="/">home</Link>
          <Link href="/about">about</Link>
          <Link href="/contact">contact</Link>
          <Component {...pageProps} />
        </div>
        <ReactQueryDevtools initialIsOpen={true}></ReactQueryDevtools>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
```

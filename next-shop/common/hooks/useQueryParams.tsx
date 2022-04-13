import { useRouter } from "next/router";
import queryString from "query-string";

export default function useQueryParams<T>() {
  const { query, push, pathname } = useRouter();

  const updateUrlShallow = (query?: {
    [key: string]: string | number | undefined;
  }) => {
    push(
      pathname.concat("?").concat(queryString.stringify(query ? query : {})),
      undefined,
      {
        shallow: true,
      }
    );
  };

  return {
    query: query as unknown as T,
    updateUrlShallow,
  };
}

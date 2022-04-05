import queryString from "query-string";
import React from "react";

export default function useQuery<T>() {
  const url = window.location.href;
  const parser = queryString.parseUrl(url);

  return React.useMemo(
    () => ({
      query: parser.query as unknown as T,
      url,
    }),
    [window.location.href],
  );
}

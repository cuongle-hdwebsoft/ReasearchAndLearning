import queryString from "query-string";
import React from "react";

export default function useQuery<T extends object>() {
  const url = window.location.href;
  const parser = queryString.parseUrl(url);

  return React.useMemo(
    () => ({
      query: parser.query as unknown as T & { limit: number; page: number },
      url,
    }),
    [window.location.href],
  );
}

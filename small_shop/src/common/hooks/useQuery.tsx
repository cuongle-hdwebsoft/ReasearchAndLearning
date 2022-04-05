import queryString from "query-string";
import React from "react";

interface IUseQuery<T> {
  limit: number;
  page: number;
  filter: T;
}

export default function useQuery<T>() {
  const url = window.location.href;
  const parser = queryString.parseUrl(url);
  let error: unknown = {};
  const query: IUseQuery<T> = {} as IUseQuery<T>;

  const getQuery = () => {
    try {
      if (parser.query.page) {
        query.page = parser.query.page as unknown as number;
      }

      if (parser.query.limit) {
        query.limit = parser.query.limit as unknown as number;
      }

      delete parser.query.page;
      delete parser.query.limit;

      query["filter"] = {
        ...(parser.query as unknown as T),
      };
    } catch (e) {
      error = e;
    }

    return {
      url,
      query,
      parser,
      error,
    };
  };

  return React.useMemo(() => getQuery(), [window.location.href]);
}

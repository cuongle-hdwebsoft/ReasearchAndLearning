import queryString from "query-string";

export default function formatData<F>(
  prevQuery: {
    page: number;
    limit: number;
    filter: F | undefined;
  },
  newQuery: {
    page: number | undefined;
    limit: number | undefined;
    filter: F | undefined;
  },
) {
  let page = typeof newQuery.page === "string" ? parseInt(newQuery.page) : newQuery.page;
  let limit = typeof newQuery.limit === "string" ? parseInt(newQuery.limit) : newQuery.limit;

  page = page || 0;
  limit = limit || prevQuery.limit || 10;

  const filter = {
    ...prevQuery.filter,
    ...newQuery.filter,
  };

  const params: { _limit: number; _page: number; [value: string]: number | string | boolean } = {
    ...filter,
    _limit: limit,
    _page: page + 1,
  };

  Object.keys(params).forEach((key) => {
    if (params[key] === "") {
      delete params[key];
    }
  });

  const url = queryString.stringify({
    ...filter,
    limit: limit,
    page: page,
  });

  return {
    params,
    filter,
    limit,
    page,
    url,
  };
}

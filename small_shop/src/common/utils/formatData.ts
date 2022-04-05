import queryString from "query-string";
import { IBaseFilter, IBaseLoad } from "../../modules/products/constant";

export default function formatData<F>(prevQuery: IBaseLoad<F>, newQuery: IBaseLoad<F>) {
  let page = typeof newQuery.page === "string" ? parseInt(newQuery.page) : newQuery.page;
  let limit = typeof newQuery.limit === "string" ? parseInt(newQuery.limit) : newQuery.limit;

  page = page || 0;
  limit = limit || prevQuery.limit || 10;

  const filter = {
    ...prevQuery.filter,
    ...newQuery.filter,
  };

  const params: { _limit: number; _page: number } & IBaseFilter = {
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

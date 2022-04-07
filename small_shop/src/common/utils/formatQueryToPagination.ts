import { IBaseFilter } from "../../modules/products/constant";

export default function formatQueryToPagination<F>(query: {
  [key: string]: string | number | boolean | unknown;
}): IBaseFilter<F> {
  const result: { limit?: number; page?: number; filter?: F } = {};

  if (query.page) {
    Object.defineProperty(result, "page", {
      value: query.page,
    });
  }

  if (query.limit) {
    Object.defineProperty(result, "limit", {
      value: query.limit,
    });
  }

  delete query.page;
  delete query.limit;

  Object.defineProperty(result, "filter", {
    value: {
      ...query,
    },
  });

  return result;
}

export default function formatQueryToPagination<T>(query: { [key: string]: string | number | boolean }) {
  const result: { limit?: number; page?: number; filter?: T } = {};

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

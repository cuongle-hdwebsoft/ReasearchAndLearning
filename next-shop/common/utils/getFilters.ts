export default function getFilters(
  query: { [key: string]: string | string[] | undefined },
  acceptedKeys: string[]
) {
  let obj = {} as any;

  acceptedKeys.forEach((key) => {
    if (query[key]) {
      obj[key] = query[key];
    }
  });

  return obj;
}

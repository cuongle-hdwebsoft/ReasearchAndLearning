export default function getFilters(
  query: { [key: string]: string | string[] | undefined },
  acceptedKeys: string[]
) {
  let obj = {} as any;

  acceptedKeys.forEach((key) => {
    console.log(query[key]);
    console.log(key);
    if (query[key]) {
      obj[key] = query[key];
    }
  });

  return obj;
}

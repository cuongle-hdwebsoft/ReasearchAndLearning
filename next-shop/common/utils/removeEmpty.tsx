export default function removeEmpty(object: {
  [key: string]: string | number | undefined | any;
}) {
  Object.keys(object).forEach((key: string) => {
    if (object[key] === "") delete object[key];
  });

  return object;
}

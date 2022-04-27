export default function removeEmptyField(obj) {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === "") {
      delete obj[key];
    }
  });

  return obj;
}

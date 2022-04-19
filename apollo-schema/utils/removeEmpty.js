function removeEmpty(object) {
  Object.keys(object).forEach((key) => {
    if (object[key] === "") delete object[key];
  });

  return object;
}

module.exports = removeEmpty;

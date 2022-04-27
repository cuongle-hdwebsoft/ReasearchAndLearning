export function debounce(fn, delay) {
  let t = null;

  return function () {
    if (t) {
      clearTimeout(t);
    }

    t = setTimeout(() => {
      fn();
    }, delay);
  };
}

import { useEffect, useRef, useState } from "react";

export default function useDebounce<T>(value: T, delay?: number) {
  const [debounceValue, setDebouceValue] = useState(value);
  const ref = useRef<any>(null);

  useEffect(() => {
    ref.current = setTimeout(() => {
      setDebouceValue(value);
    }, delay);

    return () => {
      clearTimeout(ref.current);
    };
  }, [value]);

  // console.log("filter", value);

  return debounceValue;
}

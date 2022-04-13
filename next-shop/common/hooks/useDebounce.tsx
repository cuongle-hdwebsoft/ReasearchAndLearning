import React, { useEffect, useRef, useState } from "react";

export default function useDebounce(value: any, delay?: number) {
  const [debounceValue, setDebounceValue] = useState(value);
  const ref = useRef<any>();

  useEffect(() => {
    ref.current = setTimeout(() => {
      setDebounceValue(value);
    }, delay || 500);

    return () => {
      if (ref.current) {
        clearTimeout(ref.current);
      }
    };
  }, [value, delay]);

  return debounceValue;
}

import { useRef, useEffect, useMemo } from "react";

import { debounce } from "lodash";

type Callback = () => void;

export const useDebounce = (callback: Callback, delay: number) => {
  const ref = useRef<Callback>(() => {});

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(func, delay);
  }, [delay]);

  return debouncedCallback;
};

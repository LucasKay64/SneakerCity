import { useRef, useEffect, useMemo } from "react";

import { debounce } from "lodash";

// shouldnt use Function as type, because its way to general and doesnt provide sufficient type safety
// shouldnt also use any as type, because the same applies but its less general than Function
// and this hook is meant to work with any function, so i suppose for now this will suffice
// also used generics to strike somewhat of a balance between type safety and generality

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Callback = (...args: any[]) => any;

export const useDebounce = <T extends Callback>(
  callback: T,
  delay: number
): T => {
  const ref = useRef<T>(callback);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const func = (...args: any[]) => {
      ref.current?.(...args);
    };

    return debounce(func, delay);
  }, [delay]);

  return debouncedCallback as unknown as T;
};

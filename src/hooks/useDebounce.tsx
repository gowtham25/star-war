import { useCallback, useRef } from "react";

function useDebounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
  immediate = false
): (...args: Parameters<T>) => void {
  const timerId = useRef<NodeJS.Timeout | null>(null);

  const debounce = useCallback(
    (...args: Parameters<T>) => {
      const callNow = immediate && !timerId.current;

      if (timerId.current) {
        clearTimeout(timerId.current);
      }

      timerId.current = setTimeout(() => {
        timerId.current = null;
        if (!immediate) {
          fn(...args);
        }
      }, delay);

      if (callNow) {
        fn(...args);
      }
    },
    [fn, delay, immediate]
  );

  return debounce;
}

export default useDebounce;

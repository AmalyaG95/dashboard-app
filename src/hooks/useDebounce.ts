import { useEffect, useRef, useCallback } from "react";

const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedFunction = (...args: any[]) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return debouncedFunction;
};

export default useDebounce;

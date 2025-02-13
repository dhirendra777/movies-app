type DebouncedFunction = {
  (value: string): void;
  cancel: () => void;
};

export function debounce<F extends (value: string) => void>(func: F, wait = 500): DebouncedFunction {
  let timeout: NodeJS.Timeout | null = null;

  const debounced = (value: string) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(value);
      timeout = null;
    }, wait);
  };

  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
}

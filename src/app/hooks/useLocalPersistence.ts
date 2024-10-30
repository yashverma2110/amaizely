import { Dispatch, SetStateAction, useEffect } from "react";

/**
 * Hook that persists the state to local storage
 * Only works for client-side
 */
export default function useLocalPersistence<T>({ initialValue, setter, key }: { initialValue?: T, setter: (value: T) => void, key: string }) {
  useEffect(() => {
    const item = localStorage.getItem(key);
    if (item) {
      setter(JSON.parse(item));
      return;
    }

    if (initialValue) {
      setter(initialValue);
    }
  }, [setter, key, initialValue])

  function persist(value: T) {
    localStorage.setItem(key, JSON.stringify(value));
    setter(value);
  }

  function clear() {
    localStorage.removeItem(key);
  }

  return { persist, clear };
}

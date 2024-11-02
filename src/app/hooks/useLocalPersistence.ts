import { Dispatch, SetStateAction, useEffect } from "react";

/**
 * Hook that persists the state to local storage
 * Only works for client-side
 */
export default function useLocalPersistence<T>({ initialValue, setter, key, onPersist }: { initialValue?: T, setter: (value: T) => void, key: string, onPersist?: (value: T, timestamp: number) => void }) {
  useEffect(() => {
    const item = localStorage.getItem(key);
    if (item) {
      const parsedItem = JSON.parse(item);
      setter(parsedItem.value);
      if (onPersist) {
        onPersist(parsedItem.value, parsedItem.timestamp);
      }
      return;
    }

    if (initialValue) {
      setter(initialValue);
    }
  }, [setter, key, initialValue])

  function persist(value: T) {
    const valueToPersist: { value: T, timestamp: number } = { value, timestamp: Date.now() };
    localStorage.setItem(key, JSON.stringify(valueToPersist));
    setter(value);
  }

  function clear() {
    localStorage.removeItem(key);
  }

  return { persist, clear };
}

import { useState } from "react";

export function useSessionStorage<T>(key: string, initialValue: T) {
  const storedValue = sessionStorage.getItem(key);
  const [value, setValue] = useState<T>(
    storedValue ? JSON.parse(storedValue) : initialValue
  );

  const setSessionStorage = (newValue: T) => {
    setValue(newValue);
    sessionStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setSessionStorage] as const;
}

import { useState, useEffect } from "react";

// ----------------------------------------------------------------------

export default function useLocalStorage(key: string, defaultValue: string) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const storedValue = window.localStorage.getItem(key);
    if (storedValue !== null) {
      setValue(JSON.parse(storedValue));
    }
  }, [key]);

  return [value, setValue];
}

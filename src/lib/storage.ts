const isBrowser = typeof window !== "undefined";

const persistToStorage = <T>(key: string, value: T): void => {
  if (!isBrowser) return;
  const serializedValue = JSON.stringify(value);
  localStorage.setItem(key, serializedValue);
};

const getItemFromStorage = <T>(key: string): T | null => {
  if (!isBrowser) return null;
  const serializedValue = localStorage.getItem(key);
  return serializedValue ? (JSON.parse(serializedValue) as T) : null;
};

const removeFromStorage = (key: string): void => {
  if (!isBrowser) return;
  localStorage.removeItem(key);
};

export { persistToStorage, getItemFromStorage, removeFromStorage };

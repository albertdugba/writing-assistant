const persistToStorage = <T>(key: string, value: T): void => {
  const serializedValue = JSON.stringify(value);
  localStorage.setItem(key, serializedValue);
};

const getItemFromStorage = <T>(key: string): T | null => {
  const serializedValue = localStorage.getItem(key);
  return serializedValue ? (JSON.parse(serializedValue) as T) : null;
};

const removeFromStorage = (key: string) => {
  localStorage.removeItem(key);
};

export { persistToStorage, getItemFromStorage, removeFromStorage };

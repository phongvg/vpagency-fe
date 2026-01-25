export const getStorageItem = <T>(key: string, defaultValue: T): T => {
  if (typeof window === "undefined") {
    return defaultValue;
  }

  const item = localStorage.getItem(key);

  if (!item) {
    return defaultValue;
  }

  try {
    return JSON.parse(item) as T;
  } catch {
    return item as unknown as T;
  }
};

export const setStorageItem = <T>(key: string, value: T): void => {
  if (typeof window === "undefined") {
    return;
  }

  if (typeof value === "string") {
    localStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeStorageItem = (key: string): void => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(key);
};

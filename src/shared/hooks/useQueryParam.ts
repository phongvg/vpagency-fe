import { useSearchParams } from "react-router-dom";

export function useQueryParam<T = string>(key: string, defaultValue?: T): T | undefined {
  const [searchParams] = useSearchParams();
  const value = searchParams.get(key);

  if (value === null) return defaultValue;
  return value as T;
}

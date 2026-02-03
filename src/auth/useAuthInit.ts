import { useEffect } from "react";

export const useAuthInit = () => {
  useEffect(() => {
    // const expiresAt = getStorageItem<string | null>(EXPIRES_AT, null);
    // const refreshToken = getStorageItem<string | null>(REFRESH_TOKEN, null);
    // if (expiresAt && refreshToken) {
    //   authService.scheduleRefresh();
    // }
  }, []);
};

import { authService } from "@/auth/services/auth.service";
import { EXPIRES_AT, REFRESH_TOKEN } from "@/shared/constants/auth.constant";
import { getStorageItem } from "@/shared/utils/storage.util";
import { useEffect } from "react";

export const useAuthInit = () => {
  useEffect(() => {
    const expiresAt = getStorageItem<string | null>(EXPIRES_AT, null);
    const refreshToken = getStorageItem<string | null>(REFRESH_TOKEN, null);

    if (expiresAt && refreshToken) {
      authService.scheduleRefresh();
    }
  }, []);
};

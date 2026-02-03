import { authApi } from "@/auth/api/auth.api";
import type { LoginResponse } from "@/auth/types/auth.type";
import { queryClient } from "@/configs/queryClient";
import { ACCESS_TOKEN, EXPIRES_AT, FIVE_MINUTES_IN_MS, REFRESH_TOKEN, USER_ID } from "@/shared/constants/auth.constant";
import { useAuthStore } from "@/shared/stores/auth/useAuthStore";
import { getExpiresAtFromToken } from "@/shared/utils/jwt.util";
import { getStorageItem, setStorageItem } from "@/shared/utils/storage.util";
import toast from "react-hot-toast";

let refreshTimeoutId: number | null = null;
let refreshPromise: Promise<void> | null = null;

export const authService = {
  login: (data: LoginResponse): void => {
    const { user, accessToken, refreshToken } = data;
    const { setUser, setAuthenticated, setLoading } = useAuthStore.getState();

    setLoading(true);

    authService.setSession(accessToken, refreshToken);

    const expiresAtMs = getExpiresAtFromToken(accessToken);
    if (expiresAtMs) {
      setStorageItem(EXPIRES_AT, expiresAtMs.toString());
    }

    setStorageItem(USER_ID, user.id);

    setUser(user);
    setAuthenticated(true);
    setLoading(false);

    setTimeout(() => {
      authService.scheduleRefresh();
    }, 0);
  },

  setSession: (accessToken: string, refreshToken: string): void => {
    setStorageItem(ACCESS_TOKEN, accessToken);
    setStorageItem(REFRESH_TOKEN, refreshToken);
  },

  scheduleRefresh: () => {
    if (refreshTimeoutId) clearTimeout(refreshTimeoutId);

    const expiresAt = Number(getStorageItem<string | null>(EXPIRES_AT, null));
    if (!expiresAt) return;

    const target = expiresAt - FIVE_MINUTES_IN_MS;
    const delay = target - Date.now();

    console.log("target :>> ", target);
    console.log("delay :>> ", delay);

    if (delay <= 0) {
      authService.refreshToken().catch((error) => {
        console.error("Failed to refresh token:", error);
        authService.logout();
      });
      return;
    }

    const MAX_TIMEOUT = 2_000_000_000;
    const timeout = Math.min(delay, MAX_TIMEOUT);

    refreshTimeoutId = window.setTimeout(() => {
      authService.refreshToken().catch((error) => {
        console.error("Failed to refresh token:", error);
        authService.logout();
      });
    }, timeout);
  },

  refreshToken: async (): Promise<void> => {
    if (!refreshPromise) {
      const userId = getStorageItem<string | null>(USER_ID, null);

      if (!userId) {
        throw new Error("No user ID available");
      }

      refreshPromise = authApi
        .refreshToken(userId)
        .then((res) => {
          const { accessToken, refreshToken } = res.data;
          authService.setSession(accessToken, refreshToken);

          const expiresAtMs = getExpiresAtFromToken(accessToken);
          if (expiresAtMs) {
            setStorageItem(EXPIRES_AT, expiresAtMs.toString());
            authService.scheduleRefresh();
          }
        })
        .catch((error) => {
          console.error("Refresh token failed:", error);
          authService.logout();
          throw error;
        })
        .finally(() => {
          refreshPromise = null;
        });
    }

    return refreshPromise;
  },

  clearSession() {
    if (refreshTimeoutId) clearTimeout(refreshTimeoutId);
    localStorage.clear();
  },

  logout: async (): Promise<void> => {
    const { setUser, setAuthenticated, setLoading } = useAuthStore.getState();

    try {
      const res = await authApi.logout();

      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      authService.clearSession();
      queryClient.clear();

      setUser(null);
      setAuthenticated(false);
      setLoading(false);
    }
  },

  getMe: async (): Promise<void> => {
    const { setUser, setAuthenticated, setLoading } = useAuthStore.getState();

    setLoading(true);

    try {
      const response = await authApi.getMe();
      const user = response.data;

      setUser(user);
      setAuthenticated(true);
    } catch {
      setUser(null);
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  },
};

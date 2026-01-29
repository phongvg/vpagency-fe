import { authApi } from "@/auth/api/auth.api";
import type { LoginResponse } from "@/auth/types/auth.type";
import { ACCESS_TOKEN, EXPIRES_AT, FIVE_MINUTES_IN_MS, REFRESH_TOKEN, USER_ID } from "@/shared/constants/auth.constant";
import { useAuthStore } from "@/shared/stores/auth/useAuthStore";
import { getStorageItem, setStorageItem } from "@/shared/utils/storage.util";
import { useQueryClient } from "@tanstack/react-query";

let refreshTimeoutId: number | null = null;
let refreshPromise: Promise<void> | null = null;

export const authService = {
  login: (data: LoginResponse): void => {
    const { user, accessToken, refreshToken, expiresAt } = data;
    const { setUser, setAuthenticated, setLoading } = useAuthStore.getState();

    setLoading(true);

    authService.setSession(accessToken, refreshToken);

    const expiresAtMs = new Date(expiresAt).getTime();

    setStorageItem(USER_ID, user.id);
    setStorageItem(EXPIRES_AT, expiresAtMs.toString());

    setUser(user);
    setAuthenticated(true);
    setLoading(false);

    authService.scheduleRefresh();
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

    if (delay <= 0) {
      authService.refreshToken();
      return;
    }

    const MAX_TIMEOUT = 2_000_000_000;
    const timeout = Math.min(delay, MAX_TIMEOUT);

    refreshTimeoutId = window.setTimeout(() => {
      authService.scheduleRefresh();
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

  logout: (): void => {
    const { setUser, setAuthenticated, setLoading } = useAuthStore.getState();
    const queryClient = useQueryClient();

    authService.clearSession();
    queryClient.clear();

    setUser(null);
    setAuthenticated(false);
    setLoading(false);
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

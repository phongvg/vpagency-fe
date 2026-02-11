import { authApi } from "@/auth/api/auth.api";
import type { LoginResponse } from "@/auth/types/auth.type";
import { queryClient } from "@/configs/queryClient";
import { ACCESS_TOKEN, EXPIRES_AT, REFRESH_TOKEN, USER_ID } from "@/shared/constants/auth.constant";
import { useAuthStore } from "@/shared/stores/auth/useAuthStore";
import { getExpiresAtFromToken } from "@/shared/utils/jwt.util";
import { getStorageItem, setStorageItem } from "@/shared/utils/storage.util";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

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
  },

  setSession: (accessToken: string, refreshToken: string): void => {
    setStorageItem(ACCESS_TOKEN, accessToken);
    Cookies.set(REFRESH_TOKEN, refreshToken, {
      secure: true,
      sameSite: "strict",
    });
  },

  clearSession() {
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
    const token = getStorageItem<string | null>(ACCESS_TOKEN, null);
    const expiresAt = Number(getStorageItem<string | null>(EXPIRES_AT, null));

    const { setUser, setAuthenticated, setLoading } = useAuthStore.getState();

    if (token && expiresAt && expiresAt > Date.now()) {
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
    }
  },
};

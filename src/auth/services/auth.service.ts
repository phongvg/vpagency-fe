import { authApi } from "@/auth/api/auth.api";
import type { LoginPayload } from "@/auth/types/auth.type";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_ID } from "@/shared/constants/token.constant";
import { useAuthStore } from "@/shared/stores/auth/useAuthStore";
import { getStorageItem, removeStorageItem, setStorageItem } from "@/shared/utils/storage.util";

export const authService = {
  login: async (payload: LoginPayload): Promise<void> => {
    const { setUser, setAuthenticated, setLoading } = useAuthStore.getState();

    setLoading(true);

    const response = await authApi.login(payload);

    const { user, accessToken, refreshToken } = response.data;

    setStorageItem(ACCESS_TOKEN, accessToken);
    setStorageItem(REFRESH_TOKEN, refreshToken);
    setStorageItem(USER_ID, user.id);

    setUser(user);
    setAuthenticated(true);
    setLoading(false);
  },

  refreshToken: async (): Promise<string> => {
    const userId = getStorageItem<string | null>(USER_ID, null);
    const token = getStorageItem<string | null>(REFRESH_TOKEN, null);

    if (!userId) {
      throw new Error("No user ID available");
    }

    if (!token) {
      throw new Error("No refresh token available");
    }

    const response = await authApi.refreshToken(userId);

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    setStorageItem(ACCESS_TOKEN, accessToken);
    setStorageItem(REFRESH_TOKEN, newRefreshToken);

    return accessToken;
  },

  logout: (): void => {
    const { setUser, setAuthenticated, setLoading } = useAuthStore.getState();

    removeStorageItem(ACCESS_TOKEN);
    removeStorageItem(REFRESH_TOKEN);
    removeStorageItem(USER_ID);

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
    } catch (error) {
      setUser(null);
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  },
};

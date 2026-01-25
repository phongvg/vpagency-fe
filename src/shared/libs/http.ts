import { urls } from "@/app/routes/route.constant";
import { authService } from "@/auth/services/auth.service";
import { env } from "@/configs/env";
import { MESSAGE } from "@/shared/constants/message.constant";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_ID } from "@/shared/constants/token.constant";
import { isTokenExpiringSoon } from "@/shared/utils/jwt.util";
import { getStorageItem, removeStorageItem } from "@/shared/utils/storage.util";
import axios, { AxiosError, HttpStatusCode, type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import toast from "react-hot-toast";

export const http: AxiosInstance = axios.create({
  baseURL: env.baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

http.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    let accessToken = getStorageItem<string | null>(ACCESS_TOKEN, null);

    if (accessToken) {
      // Không refresh token khi đang call API refresh
      if (config.url !== "/auth/refresh" && isTokenExpiringSoon(accessToken)) {
        if (isRefreshing && refreshPromise) {
          accessToken = await refreshPromise;
        } else {
          isRefreshing = true;
          refreshPromise = refreshAccessToken();

          try {
            accessToken = await refreshPromise;
          } finally {
            isRefreshing = false;
            refreshPromise = null;
          }
        }
      }

      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Xử lý lỗi 403 - Forbidden
    if (error.response?.status === HttpStatusCode.Forbidden) {
      window.location.href = urls.forbidden;
      return Promise.reject(error);
    }

    if (error.response?.status === HttpStatusCode.Unauthorized) {
      window.location.href = `${urls.auth}/${urls.login}?redirect=${window.location.pathname}`;
      authService.logout();
      return Promise.reject(error);
    }

    // Xử lý các lỗi không phải 401 hoặc các trường hợp đặc biệt
    if (originalRequest.url === "/auth/refresh" || originalRequest._retry || error.response?.status !== HttpStatusCode.Unauthorized) {
      const apiError = error as AxiosError<{ message: string }>;
      const message = apiError?.response?.data?.message || MESSAGE.SOME_THING_WENT_WRONG;
      toast.error(message);

      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // Nếu đang trong quá trình refresh, đợi nó hoàn thành
    if (isRefreshing && refreshPromise) {
      try {
        const newAccessToken = await refreshPromise;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return http(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    // Nếu chưa refresh, bắt đầu refresh
    isRefreshing = true;
    refreshPromise = refreshAccessToken();

    try {
      const newAccessToken = await refreshPromise;
      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

      return http(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  }
);

async function refreshAccessToken(): Promise<string> {
  try {
    return authService.refreshToken();
  } catch (error) {
    removeStorageItem(ACCESS_TOKEN);
    removeStorageItem(REFRESH_TOKEN);
    removeStorageItem(USER_ID);

    toast.error(MESSAGE.SESSION_EXPIRED);

    window.location.href = urls.login;

    throw error;
  }
}

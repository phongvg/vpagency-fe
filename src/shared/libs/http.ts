import { urls } from "@/app/routes/route.constant";
import { authService } from "@/auth/services/auth.service";
import { env } from "@/configs/env";
import { ACCESS_TOKEN, EXPIRES_AT, FIVE_MINUTES_IN_MS } from "@/shared/constants/auth.constant";
import { MESSAGE } from "@/shared/constants/message.constant";
import { getStorageItem } from "@/shared/utils/storage.util";
import axios, { AxiosError, HttpStatusCode, type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import toast from "react-hot-toast";

export const http: AxiosInstance = axios.create({
  baseURL: env.baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const expiresAt = Number(getStorageItem<string | null>(EXPIRES_AT, null));

    if (expiresAt && expiresAt - Date.now() < FIVE_MINUTES_IN_MS) {
      await authService.refreshToken();
    }

    const accessToken = getStorageItem<string | null>(ACCESS_TOKEN, null);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
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
    const originalRequest = error.config as InternalAxiosRequestConfig;

    if (!originalRequest.skipAuth && error.response?.status === HttpStatusCode.Unauthorized) {
      authService.clearSession();
      window.location.href = `${urls.auth}/${urls.login}?redirect=${encodeURIComponent(window.location.pathname)}`;
    }

    const apiError = error as AxiosError<{ message: string }>;
    const message = apiError?.response?.data?.message || MESSAGE.SOME_THING_WENT_WRONG;
    toast.error(message);

    return Promise.reject(error);
  }
);

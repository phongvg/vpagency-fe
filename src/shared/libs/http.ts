import { urls } from "@/app/routes/route.constant";
import { authApi } from "@/auth/api/auth.api";
import { authService } from "@/auth/services/auth.service";
import { env } from "@/configs/env";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_ID } from "@/shared/constants/auth.constant";
import { MESSAGE } from "@/shared/constants/message.constant";
import { getStorageItem } from "@/shared/utils/storage.util";
import axios, { AxiosError, HttpStatusCode, type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const http: AxiosInstance = axios.create({
  baseURL: env.baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

http.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
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
      return handleRefreshToken(error);
    }

    const apiError = error as AxiosError<{ message: string }>;
    const message = apiError?.response?.data?.message || MESSAGE.SOME_THING_WENT_WRONG;
    toast.error(message);

    return Promise.reject(error);
  }
);

const handleRefreshToken = async (error: AxiosError) => {
  if (!error.config) {
    return Promise.reject(error);
  }

  const originalRequest = error.config;
  const refreshToken = Cookies.get(REFRESH_TOKEN);
  const userId = getStorageItem<string | null>(USER_ID, null);

  if (!refreshToken || !userId) {
    redirectToLogin();
    return Promise.reject(error);
  }

  if (!isRefreshing) {
    isRefreshing = true;

    try {
      const res = await authApi.refreshToken(userId);
      const { accessToken } = res.data;

      authService.setSession(accessToken);

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;

      processQueue(accessToken);

      isRefreshing = false;

      return http(originalRequest);
    } catch (error) {
      isRefreshing = false;
      refreshSubscribers = [];
      redirectToLogin();
      return Promise.reject(error);
    }
  }
};

const processQueue = (newToken: string): void => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

const redirectToLogin = () => {
  authService.clearSession();
  window.location.href = `${urls.auth}/${urls.login}?redirect=${encodeURIComponent(window.location.pathname)}`;
};

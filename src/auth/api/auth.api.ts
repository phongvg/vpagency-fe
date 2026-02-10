import type { LoginPayload, LoginResponse, RefreshTokenResponse } from "@/auth/types/auth.type";
import type { User } from "@/modules/user/types/user.type";
import { http } from "@/shared/libs/http";
import type { ApiBaseResponse } from "@/shared/types/common/apiResponse.type";
import { convertQueryParams } from "@/shared/utils/common.util";

export const authApi = {
  login: (payload: LoginPayload): Promise<ApiBaseResponse<LoginResponse>> => {
    return http.post("/auth/login", payload, { skipAuth: true });
  },

  refreshToken: (userId: string): Promise<ApiBaseResponse<RefreshTokenResponse>> => {
    return http.post(
      "/auth/refresh",
      { userId },
      {
        withCredentials: true,
      }
    );
  },

  logout: (): Promise<ApiBaseResponse<null>> => {
    return http.post("/auth/logout", undefined, {
      withCredentials: true,
    });
  },

  getMe: (): Promise<ApiBaseResponse<User>> => {
    return http.get("/users/me");
  },

  loginTelegram: (code: string): Promise<ApiBaseResponse<LoginResponse>> => {
    return http.get(`/auth/telegram${convertQueryParams({ code })}`, { skipAuth: true });
  },
};

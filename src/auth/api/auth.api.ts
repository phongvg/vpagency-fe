import type { LoginPayload, LoginResponse, RefreshTokenResponse } from "@/auth/types/auth.type";
import type { User } from "@/modules/user/types/user.type";
import { http } from "@/shared/libs/http";
import type { ApiBaseResponse } from "@/shared/types/common/apiResponse.type";

export const authApi = {
  login: async (payload: LoginPayload): Promise<ApiBaseResponse<LoginResponse>> => {
    return await http.post("/auth/login", payload, { skipAuth: true });
  },

  refreshToken: async (userId: string): Promise<ApiBaseResponse<RefreshTokenResponse>> => {
    return await http.post(
      "/auth/refresh",
      { userId },
      {
        withCredentials: true,
      }
    );
  },

  logout: async (): Promise<ApiBaseResponse<null>> => {
    return await http.post("/auth/logout", undefined, {
      withCredentials: true,
    });
  },

  getMe: async (): Promise<ApiBaseResponse<User>> => {
    return await http.get("/users/me");
  },
};

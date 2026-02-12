import type { User } from "@/modules/user/types/user.type";

export type LoginResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
  isOnboarding: boolean;
};

export type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};

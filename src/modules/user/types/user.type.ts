import type { Role } from "@/shared/constants/role.constant";
import type { BaseParams } from "@/shared/types/common/param.type";

export const UserStatus = {
  OnBoarding: "ONBOARDING",
  Active: "ACTIVE",
  Inactive: "INACTIVE",
} as const;

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

export type UserListParams = BaseParams & {
  search?: string;
};

export type User = {
  id: string;
  username: string;
  telegramId: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  roles: Role[];
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateUserRequest = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
};

export type ChangePasswordRequest = {
  newPassword: string;
  confirmPassword?: string;
};

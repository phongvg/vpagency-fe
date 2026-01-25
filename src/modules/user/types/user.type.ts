import type { Role } from "@/shared/constants/role.constant";
import type { BaseParam } from "@/shared/types/common/param.type";
import type { UserStatus } from "../constants/user.constant";

export type UserListParams = BaseParam & {
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

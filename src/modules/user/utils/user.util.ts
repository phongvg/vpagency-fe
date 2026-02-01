import { UserStatus } from "@/modules/user/types/user.type";

export const UserStatusColorMap: Record<UserStatus, string> = {
  [UserStatus.OnBoarding]: "text-emerald-600",
  [UserStatus.Active]: "text-green-600",
  [UserStatus.Inactive]: "text-gray-600",
};

export const UserStatusBgColorMap: Record<UserStatus, string> = {
  [UserStatus.OnBoarding]: "bg-emerald-100",
  [UserStatus.Active]: "bg-green-100",
  [UserStatus.Inactive]: "bg-gray-100",
};

export const UserStatusLabelMap: Record<UserStatus, string> = {
  [UserStatus.OnBoarding]: "Đã gia nhập",
  [UserStatus.Active]: "Đang hoạt động",
  [UserStatus.Inactive]: "Không hoạt động",
};

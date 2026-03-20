import { UserStatus } from "@/modules/user/types/user.type";

export const UserStatusColorMap: Record<UserStatus, string> = {
  [UserStatus.OnBoarding]: "text-black",
  [UserStatus.Active]: "text-white",
  [UserStatus.Inactive]: "text-white",
};

export const UserStatusBgColorMap: Record<UserStatus, string> = {
  [UserStatus.OnBoarding]: "bg-[#fce0a6]",
  [UserStatus.Active]: "bg-[#22b14c]",
  [UserStatus.Inactive]: "bg-[#e52521]",
};

export const UserStatusLabelMap: Record<UserStatus, string> = {
  [UserStatus.OnBoarding]: "Đã gia nhập",
  [UserStatus.Active]: "Đang hoạt động",
  [UserStatus.Inactive]: "Không hoạt động",
};

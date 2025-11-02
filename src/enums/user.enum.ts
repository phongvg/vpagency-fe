export enum UserStatus {
  OnBoarding = 'ONBOARDING',
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export const UserStatusLabels: Record<UserStatus, string> = {
  [UserStatus.OnBoarding]: 'Đã gia nhập',
  [UserStatus.Active]: 'Đã kích hoạt',
  [UserStatus.Inactive]: 'Chưa kích hoạt',
}

export const UserStatusOptions = Object.values(UserStatus).map((status) => ({
  label: UserStatusLabels[status],
  value: status,
}))

export const UserStatusColors: Record<UserStatus, string> = {
  [UserStatus.OnBoarding]: 'emerald-500',
  [UserStatus.Active]: 'green-500',
  [UserStatus.Inactive]: 'gray-500',
}

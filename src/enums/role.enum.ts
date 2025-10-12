export enum Role {
  ADMIN = 'ADMIN',
  MANAGER_AFF = 'MANAGER_AFF',
  MANAGER_AGENCY = 'MANAGER_AGENCY',
  ACCOUNTING = 'ACCOUNTING',
  MEMBER_AFF = 'MEMBER_AFF',
  MEMBER_AGENCY = 'MEMBER_AGENCY',
  USER = 'USER',
}

export const roleColors: Record<Role, string> = {
  [Role.ADMIN]: 'bg-red-500',
  [Role.MANAGER_AFF]: 'bg-blue-500',
  [Role.MANAGER_AGENCY]: 'bg-purple-500',
  [Role.ACCOUNTING]: 'bg-green-500',
  [Role.MEMBER_AFF]: 'bg-yellow-500',
  [Role.MEMBER_AGENCY]: 'bg-indigo-500',
  [Role.USER]: 'bg-gray-500',
}

export const roleLabels: Record<Role, string> = {
  [Role.ADMIN]: 'Quản trị viên',
  [Role.MANAGER_AFF]: 'Quản lý Affiliate',
  [Role.MANAGER_AGENCY]: 'Quản lý Agency',
  [Role.ACCOUNTING]: 'Kế toán',
  [Role.MEMBER_AFF]: 'Thành viên Affiliate',
  [Role.MEMBER_AGENCY]: 'Thành viên Agency',
  [Role.USER]: 'Người dùng',
}

export const getAllRoles = (): Role[] => {
  return Object.values(Role)
}

export const getRoleLabel = (role: Role | string): string => {
  return roleLabels[role as Role] || role
}

export const getRoleColor = (role: Role | string): string => {
  return roleColors[role as Role] || 'bg-gray-500'
}

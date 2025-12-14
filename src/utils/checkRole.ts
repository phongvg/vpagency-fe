import { Role } from '@/enums/role.enum'

export const isAdmin = (role: Role[] | undefined) => {
  if (!role) return false

  return role.includes(Role.ADMIN)
}

export const isAccounting = (role: Role[] | undefined) => {
  if (!role) return false

  return role.includes(Role.ACCOUNTING)
}

export const isAdminOrAccounting = (role: Role[] | undefined) => {
  if (!role) return false

  return [Role.ADMIN, Role.ACCOUNTING].some((r) => role.includes(r))
}

export const isAdminOrManager = (role: Role[] | undefined) => {
  if (!role) return false

  return [Role.ADMIN, Role.MANAGER_AFF, Role.MANAGER_AGENCY].some((r) => role.includes(r))
}

export const isAdminOrManagerOrAccounting = (role: Role[] | undefined) => {
  if (!role) return false

  return [Role.ADMIN, Role.MANAGER_AFF, Role.MANAGER_AGENCY, Role.ACCOUNTING].some((r) => role.includes(r))
}

export const isManager = (role: Role[] | undefined) => {
  if (!role) return false

  return [Role.MANAGER_AFF, Role.MANAGER_AGENCY].some((r) => role.includes(r))
}

export const isMember = (role: Role[] | undefined) => {
  if (!role) return false

  return [Role.MEMBER_AFF, Role.MEMBER_AGENCY].some((r) => role.includes(r))
}

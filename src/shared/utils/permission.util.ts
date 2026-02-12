import { Role } from "@/shared/constants/role.constant";

export const isAdminOrManager = (role: Role[] | undefined) => {
  if (!role || role.length === 0) return false;

  return [Role.ADMIN, Role.MANAGER_AFF, Role.MANAGER_AGENCY].some((r) => role.includes(r));
};

export const isAdminOrAccounting = (role: Role[] | undefined) => {
  if (!role) return false;

  return [Role.ADMIN, Role.ACCOUNTING].some((r) => role.includes(r));
};

export const isAdminOrManagerOrAccounting = (role: Role[] | undefined) => {
  if (!role || role.length === 0) return false;

  return [Role.ADMIN, Role.MANAGER_AFF, Role.MANAGER_AGENCY, Role.ACCOUNTING].some((r) => role.includes(r));
};

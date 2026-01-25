import { Role } from "@/shared/constants/role.constant";

export const isAdminOrManager = (role: Role[] | undefined) => {
  if (!role || role.length === 0) return false;

  return [Role.ADMIN, Role.MANAGER_AFF, Role.MANAGER_AGENCY].some((r) => role.includes(r));
};

import { appRoutes } from "@/app/routes/route.config";
import { urls } from "@/app/routes/route.constant";
import type { AppRoute } from "@/app/routes/route.type";
import type { Role } from "@/shared/constants/role.constant";

export const getSidebarRoutes = (userRoles: Role[] = []): AppRoute[] => {
  const adminLayout = appRoutes.find((r) => r.path === urls.root && r.children);
  const sidebarRoutes = (adminLayout?.children as AppRoute[])?.filter((r) => r.showInSidebar) || [];

  return sidebarRoutes.filter((route) => {
    if (!route.roles || route.roles.length === 0) return true;
    return route.roles.some((role) => userRoles.includes(role));
  });
};

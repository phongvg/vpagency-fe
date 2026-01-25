import { appRoutes } from "@/app/routes/route.config";
import { urls } from "@/app/routes/route.constant";
import type { AppRoute } from "@/app/routes/route.type";

export const getSidebarRoutes = (): AppRoute[] => {
  const adminLayout = appRoutes.find((r) => r.path === urls.root && r.children);
  return (adminLayout?.children as AppRoute[])?.filter((r) => r.showInSidebar) || [];
};

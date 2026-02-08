import type { Role } from "@/shared/constants/role.constant";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type AppRoute = {
  path?: string;
  title?: string;
  pageTitle?: string;
  icon?: LucideIcon;
  children?: AppRoute[];
  showInSidebar?: boolean;
  roles?: Role[];
  element: ReactNode;
  isActive?: boolean;
};

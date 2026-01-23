import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type AppRoute = {
  path?: string;
  title?: string;
  pageTitle?: string;
  icon?: LucideIcon;
  children?: AppRoute[];
  showInSidebar?: boolean;
  roles?: string[];
  element: ReactNode;
  isActive?: boolean;
};

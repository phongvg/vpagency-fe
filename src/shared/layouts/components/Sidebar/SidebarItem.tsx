import type { AppRoute } from "@/app/routes/route.type";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

interface SidebarItemProps {
  route: AppRoute;
}

export default function SidebarItem({ route }: SidebarItemProps) {
  return (
    <NavLink
      title={route.title}
      to={route.path ?? "#"}
      className={({ isActive }) =>
        clsx("flex items-center gap-2 p-1 uppercase font-medium hover:bg-slate-700", {
          "text-primary": isActive,
          "text-white/50": !isActive,
        })
      }>
      {route.icon && <route.icon size={14} />}
      {route.title}
    </NavLink>
  );
}

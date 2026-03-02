import type { AppRoute } from "@/app/routes/route.type";
import clsx from "clsx";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

interface SidebarItemProps {
  route: AppRoute;
}

export default function SidebarItem({ route }: SidebarItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Kiểm tra xem có children nào đang active không
  const hasActiveChild = route.children?.some((child) => child.path && location.pathname.includes(child.path));

  // Nếu là group (dropdown)
  if (route.isGroup && route.children) {
    return (
      <div className='w-full'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={clsx("flex justify-between items-center gap-2 hover:bg-slate-700 p-1 w-full font-medium uppercase transition-colors", {
            "text-primary": hasActiveChild,
            "text-white/50": !hasActiveChild,
          })}>
          <div className='flex items-center gap-2'>
            {route.icon && <route.icon size={14} />}
            <span className='text-xs'>{route.title}</span>
          </div>
          {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>

        {isOpen && (
          <div className='space-y-1 mt-1 ml-4 pl-2 border-white/10 border-l'>
            {route.children
              .filter((child) => child.showInSidebar)
              .map((child) => (
                <NavLink
                  key={child.path}
                  title={child.title}
                  to={child.path ?? "#"}
                  className={({ isActive }) =>
                    clsx("flex items-center gap-2 hover:bg-slate-700 p-1 rounded font-medium text-xs uppercase transition-colors", {
                      "text-primary bg-slate-700/50": isActive,
                      "text-white/50": !isActive,
                    })
                  }>
                  {child.icon && <child.icon size={12} />}
                  {child.title}
                </NavLink>
              ))}
          </div>
        )}
      </div>
    );
  }

  // Menu item thông thường (không phải group)
  return (
    <NavLink
      title={route.title}
      to={route.path ?? "#"}
      className={({ isActive }) =>
        clsx("flex items-center gap-2 hover:bg-slate-700 p-1 font-medium uppercase transition-colors", {
          "text-primary": isActive,
          "text-white/50": !isActive,
        })
      }>
      {route.icon && <route.icon size={14} />}
      <span className='text-xs'>{route.title}</span>
    </NavLink>
  );
}

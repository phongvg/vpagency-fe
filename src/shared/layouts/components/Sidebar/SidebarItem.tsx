import type { AppRoute } from "@/app/routes/route.type";
import clsx from "clsx";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

interface SidebarItemProps {
  route: AppRoute;
}

export default function SidebarItem({ route }: SidebarItemProps) {
  const location = useLocation();
  const navigate = useNavigate();

  // Kiểm tra xem có children nào đang active không
  const hasActiveChild = route.children?.some((child) => child.path && location.pathname.includes(child.path));

  const [isOpen, setIsOpen] = useState(hasActiveChild ?? false);

  // Tự động mở/đóng group khi navigate sang child khác
  useEffect(() => {
    if (hasActiveChild) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [hasActiveChild]);

  // Nếu là group (dropdown)
  if (route.isGroup && route.children) {
    const handleGroupClick = () => {
      if (!isOpen) {
        // Khi mở group, tự động navigate đến child đầu tiên
        const firstVisibleChild = route.children?.find((child) => child.showInSidebar && child.path);
        if (firstVisibleChild?.path) {
          navigate(firstVisibleChild.path);
        }
      }
      setIsOpen(!isOpen);
    };

    return (
      <div className='w-full'>
        <button
          onClick={handleGroupClick}
          className={clsx("flex justify-between items-center gap-2 p-3 rounded-none w-full font-bold uppercase transition-transform text-sm", {
            "mario-item-active mario-border": hasActiveChild || isOpen,
            "text-white hover:bg-[#437de3]": !hasActiveChild && !isOpen,
          })}>
          <div className='flex items-center gap-2 drop-shadow-md'>
            {route.icon && <route.icon size={18} />}
            <span className='pr-2'>{route.title}</span>
          </div>
          {isOpen ? <ChevronDown size={18} className="drop-shadow-md" /> : <ChevronRight size={18} className="drop-shadow-md" />}
        </button>

        {isOpen && (
          <div className='space-y-1 mt-2 ml-4 pl-2 border-white/30 border-l-[3px] border-dashed'>
            {route.children
              .filter((child) => child.showInSidebar)
              .map((child) => (
                <NavLink
                  key={child.path}
                  title={child.title}
                  to={child.path ?? "#"}
                  className={({ isActive }) =>
                    clsx("flex items-center gap-2 p-3 rounded-none font-bold text-sm uppercase transition-transform", {
                      "mario-item-active mario-border": isActive,
                      "text-white/80 hover:bg-[#437de3] hover:text-white": !isActive,
                    })
                  }>
                  {child.icon && <child.icon size={14} className="drop-shadow-md" />}
                  <span className="drop-shadow-md">{child.title}</span>
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
        clsx("flex items-center gap-2 p-3 font-roboto font-bold uppercase transition-transform rounded-none text-sm", {
          "mario-item-active mario-border": isActive,
          "text-white hover:bg-[#437de3]": !isActive,
        })
      }>
      {route.icon && <route.icon size={16} className="drop-shadow-md" />}
      <span className="drop-shadow-md">{route.title}</span>
    </NavLink>
  );
}

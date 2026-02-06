import Logo from "@/shared/components/Logo";
import NavUser from "@/shared/layouts/components/Sidebar/NavUser";
import { Box } from "lucide-react";
import { getSidebarRoutes } from "./sidebar.config";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  const routes = getSidebarRoutes();

  return (
    <aside className='top-0 left-0 z-20 fixed bg-[rgba(var(--body-bg-rgb))] min-w-64 h-full'>
      <div className='flex flex-col h-full'>
        <div className='space-y-3'>
          <div className='flex items-center gap-2 p-2 border-border border-b'>
            <Box className='text-2xl' />
            <Logo />
          </div>

          <NavUser />

          <div className='px-2'>
            <div className='flex items-center text-[7.5px] text-white'>
              <div className='font-bold'>MENU</div>
              <div className='flex-1 ps-1 pt-[3px]'>
                <div className='bg-white/25 h-[1px]'></div>
                <div className='flex py-[3px]'>
                  <div className='flex-1 opacity-50 h-[4px] hud-line'></div>
                </div>
              </div>
            </div>
            <div className='bg-white/25 h-[1px]'></div>
          </div>

          <div className='flex flex-col gap-1 px-1 w-full min-w-0'>
            {routes.map((route) => (
              <SidebarItem key={route.path} route={route} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

import Logo from "@/shared/components/Logo";
import NavUser from "@/shared/layouts/components/Sidebar/NavUser";
import { Box } from "lucide-react";
import { getSidebarRoutes } from "./sidebar.config";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  const routes = getSidebarRoutes();

  return (
    <aside className='w-[250px] min-w-64 bg-[rgba(var(--body-bg-rgb),.75)]'>
      <div className='flex flex-col h-full'>
        <div className='space-y-3'>
          <div className='border-border border-b p-2 flex items-center gap-2'>
            <Box className='text-2xl' />
            <Logo />
          </div>

          <NavUser />

          <div className='px-2'>
            <div className='flex items-center text-white text-[7.5px]'>
              <div className='font-bold'>NAVIGATION</div>
              <div className='flex-1 pt-[3px] ps-1'>
                <div className='h-[1px] bg-white/25'></div>
                <div className='py-[3px] flex'>
                  <div className='hud-line flex-1 h-[4px] opacity-50'></div>
                </div>
              </div>
            </div>
            <div className='h-[1px] bg-white/25'></div>
          </div>

          <div className='flex w-full min-w-0 flex-col gap-1 px-1'>
            {routes.map((route) => (
              <SidebarItem key={route.path} route={route} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

import Logo from "@/shared/components/Logo";
import NavUser from "@/shared/layouts/components/Sidebar/NavUser";
import { useAuthStore } from "@/shared/stores/auth/useAuthStore";
import { useRankingPopupStore } from "@/shared/stores/rankingPopup/useRankingPopupStore";
import { Box, Trophy } from "lucide-react";
import { getSidebarRoutes } from "./sidebar.config";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  const { user } = useAuthStore();
  const routes = getSidebarRoutes(user?.roles || []);
  const { setOpen } = useRankingPopupStore();

  return (
    <aside className='top-0 left-0 z-20 fixed bg-[rgba(30,45,55,0.70)] backdrop-blur-md border-[rgba(103,206,255,0.15)] border-r w-[300px] h-full'>
      <div className='flex flex-col h-full'>
        <div className='space-y-3'>
          <div className='flex items-center gap-2 p-2 border-border border-b'>
            <Box className='text-2xl' />
            <Logo />
            <button
              type='button'
              onClick={() => setOpen(true)}
              className='hover:bg-white/10 ml-auto p-1.5 rounded-md text-yellow-400 transition-colors'
              title='Top nhân viên tháng này'>
              <Trophy size={18} />
            </button>
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
            {routes.map((route, index) => (
              <SidebarItem key={index} route={route} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

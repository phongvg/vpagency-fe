import LogoImage from "@/assets/coins__1_-removebg-preview.png";
import NavUser from "@/shared/layouts/components/Sidebar/NavUser";
import { useAuthStore } from "@/shared/stores/auth/useAuthStore";
import { useRankingPopupStore } from "@/shared/stores/rankingPopup/useRankingPopupStore";
import { Trophy } from "lucide-react";
import { getSidebarRoutes } from "./sidebar.config";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  const { user } = useAuthStore();
  const routes = getSidebarRoutes(user?.roles || []);
  const { setOpen } = useRankingPopupStore();

  return (
    <aside className='top-0 z-10 sticky bg-[#5c94fc] mario-border w-[300px] h-dvh overflow-y-auto shrink-0'>
      <div className='flex flex-col min-h-full'>
        <div className='space-y-3 p-2'>
          <div className='mario-block flex items-center gap-2 mb-4 p-2 mario-border'>
            <img src={LogoImage} alt='VP Agency' className='drop-shadow-md w-9 h-9 object-contain' />
            <div
              style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "18px" }}
              className='drop-shadow-md text-[#fce0a6] uppercase tracking-wider'>
              VP AGENCY
            </div>
            <button
              type='button'
              onClick={() => setOpen(true)}
              className='hover:bg-white/10 ml-auto p-1.5 rounded-md text-yellow-400 transition-colors'
              title='Top nhân viên tháng này'>
              <Trophy size={18} />
            </button>
          </div>

          <NavUser />

          <div className='mt-4 px-2'>
            <div className='flex items-center drop-shadow-md font-bold text-white text-xs uppercase tracking-wider'>
              <span>WORLD MENU</span>
            </div>
          </div>

          <div className='flex flex-col gap-2 mt-2 px-1 w-full min-w-0'>
            {routes.map((route, index) => (
              <SidebarItem key={index} route={route} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

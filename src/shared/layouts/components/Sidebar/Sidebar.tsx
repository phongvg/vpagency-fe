import LogoImage from "@/assets/coins__1_-removebg-preview.png";
import NavUser from "@/shared/layouts/components/Sidebar/NavUser";
import { useAuthStore } from "@/shared/stores/auth/useAuthStore";
import { getSidebarRoutes } from "./sidebar.config";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  const { user } = useAuthStore();
  const routes = getSidebarRoutes(user?.roles || []);

  return (
    <aside className='sticky top-0 shrink-0 z-10 bg-[#5c94fc] mario-border w-[300px] h-dvh overflow-y-auto'>
      <div className='flex flex-col min-h-full'>
        <div className='space-y-3 p-2'>
          <div className='flex items-center gap-2 p-2 mario-block mario-border mb-4'>
            <img src={LogoImage} alt="VP Agency" className="w-9 h-9 object-contain drop-shadow-md" />
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "18px" }} className='text-[#fce0a6] drop-shadow-md uppercase tracking-wider'>
              VP AGENCY
            </div>
          </div>

          <NavUser />

          <div className='px-2 mt-4'>
            <div className='flex items-center font-bold text-white text-xs drop-shadow-md uppercase tracking-wider'>
              <span>WORLD MENU</span>
            </div>
          </div>

          <div className='flex flex-col gap-2 px-1 w-full min-w-0 mt-2'>
            {routes.map((route, index) => (
              <SidebarItem key={index} route={route} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

import Sidebar from "@/shared/layouts/components/Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <>
      <div className='app-cover'></div>
      <div className='flex flex-auto min-h-dvh w-full app'>
        <Sidebar />
        <main className='p-2 relative flex flex-1 flex-col m-4 shadow-sm'>
          <Outlet />
        </main>
      </div>
    </>
  );
}

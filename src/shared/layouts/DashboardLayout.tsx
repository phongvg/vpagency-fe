import Sidebar from "@/shared/layouts/components/Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className='pl-64'>
      <div className='app-cover' />
      <div className='flex h-dvh app'>
        <Sidebar />
        <main className='relative flex-1 p-4 min-w-0 h-full'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

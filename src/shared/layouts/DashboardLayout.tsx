import Sidebar from "@/shared/layouts/components/Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <>
      <div className='app-cover'></div>
      <div className='app flex h-dvh'>
        <Sidebar />
        <main className='relative flex-1 h-full p-4'>
          <Outlet />
        </main>
      </div>
    </>
  );
}

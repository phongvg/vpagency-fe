import { useCurrentRoute } from "@/shared/hooks/useCurrentRoute";
import Sidebar from "@/shared/layouts/components/Sidebar";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const currentRoute = useCurrentRoute();

  useEffect(() => {
    document.title = currentRoute?.pageTitle ? `${currentRoute.pageTitle} | VP Agency` : "VP Agency";
  }, [currentRoute]);

  return (
    <div className='pl-64'>
      <div className='app-cover' />
      <div className='flex min-h-dvh app'>
        <Sidebar />
        <main className='relative flex-1 p-4 min-w-0 h-full'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

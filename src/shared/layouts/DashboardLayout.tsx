import ClickSpark from "@/shared/components/ClickSpark";
import { useCurrentRoute } from "@/shared/hooks/useCurrentRoute";
import Header from "@/shared/layouts/components/Header/Header";
import Sidebar from "@/shared/layouts/components/Sidebar";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const currentRoute = useCurrentRoute();

  useEffect(() => {
    document.title = currentRoute?.pageTitle ? `${currentRoute.pageTitle} | VP Agency` : "VP Agency";
  }, [currentRoute]);

  return (
    <div className='relative flex min-h-dvh app'>
      <div className='app-cover' />

      <Sidebar />

      <div className='flex-1 flex flex-col min-w-0 h-dvh'>
        <Header />
        <main className='flex-1 p-4 overflow-y-auto'>
          <ClickSpark sparkColor='#fff' sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
            <Outlet />
          </ClickSpark>
        </main>
      </div>
    </div>
  );
}

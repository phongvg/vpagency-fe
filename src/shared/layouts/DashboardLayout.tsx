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
    <div className='relative'>
      <div className='app-cover' />
      <div className='flex min-h-dvh app'>
        <Sidebar />
        <main className='relative flex-1 ml-[300px] p-4 min-w-0 h-full'>
          <Outlet />
        </main>
      </div>

      {/* <LightRays
        raysOrigin='top-center'
        raysColor='#ffffff'
        raysSpeed={1}
        lightSpread={0.5}
        rayLength={3}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0}
        distortion={0}
        className='custom-rays'
        pulsating={false}
        fadeDistance={1}
        saturation={1}
      /> */}
    </div>
  );
}

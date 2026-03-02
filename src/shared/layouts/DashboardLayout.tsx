import ClickSpark from "@/shared/components/ClickSpark";
import LightRays from "@/shared/components/LightRays";
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
          <ClickSpark sparkColor='#fff' sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
            <Outlet />
          </ClickSpark>
        </main>
      </div>

      <LightRays
        raysOrigin='top-center'
        raysSpeed={1}
        lightSpread={0.5}
        rayLength={2}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0}
        distortion={0}
        className='custom-rays'
        pulsating={false}
        fadeDistance={0.2}
        saturation={1}
      />
    </div>
  );
}

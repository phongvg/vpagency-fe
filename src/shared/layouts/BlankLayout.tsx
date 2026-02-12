import LightRays from "@/shared/components/LightRays/LightRays";
import { Outlet } from "react-router-dom";

export default function BlankLayout() {
  return (
    <div className='relative'>
      <div className='app-cover'></div>
      <div className='flex justify-center items-center p-6 md:p-10 w-full min-h-dvh app'>
        <Outlet />
      </div>

      <LightRays
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
      />
    </div>
  );
}

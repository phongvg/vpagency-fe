import LightRays from "@/shared/components/LightRays/LightRays";
import { Outlet } from "react-router-dom";
import Silk from "@/shared/components/Silk/index.tsx";

export default function BlankLayout() {
  return (
    <div className='relative'>
      <div className='app-cover' />
      {/* <Silk speed={5} scale={1} color='#7B7481' noiseIntensity={1.5} rotation={0} /> */}
      <div className='flex justify-center items-center '>
        <Outlet />
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

import { Outlet } from "react-router-dom";

export default function BlankLayout() {
  return (
    <>
      <div className='app-cover'></div>
      <div className='app min-h-dvh w-full flex items-center justify-center p-6 md:p-10'>
        <Outlet />
      </div>
    </>
  );
}

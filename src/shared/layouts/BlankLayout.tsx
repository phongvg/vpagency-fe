import { Outlet } from "react-router-dom";

export default function BlankLayout() {
  return (
    <div className='bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10'>
      <Outlet />
    </div>
  );
}

import { ShieldX } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <div className='flex justify-center items-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 min-h-screen'>
      <div className='space-y-6 px-4 text-center'>
        <div className='flex justify-center'>
          <div className='relative'>
            <ShieldX className='w-32 h-32 text-red-500 animate-pulse' />
            <div className='absolute inset-0 bg-red-500/20 blur-2xl rounded-full animate-pulse' />
          </div>
        </div>

        <div className='space-y-2'>
          <h1 className='font-bold text-red-500 text-8xl'>403</h1>
          <h2 className='font-semibold text-white text-3xl uppercase'>Truy cập bị từ chối</h2>
        </div>

        <p className='mx-auto max-w-md text-gray-400 text-lg uppercase'>
          Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị viên nếu bạn nghĩ đây là nhầm lẫn.
        </p>

        <div className='pt-8 text-gray-500 text-sm'>
          <p>Mã lỗi: FORBIDDEN_ACCESS</p>
        </div>
      </div>
    </div>
  );
}

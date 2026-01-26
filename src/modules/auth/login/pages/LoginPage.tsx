import LoginForm from "@/modules/auth/login/components/LoginForm";
import { Icon } from "@iconify/react";

export default function LoginPage() {
  return (
    <div className='w-full max-w-[360px] mx-auto relative flex-1'>
      <div className='space-y-4 mb-6'>
        <div className='flex items-center justify-center'>
          <Icon icon='solar:shield-keyhole-linear' className='text-6xl text-white/50' />
        </div>

        <h1 className='text-center uppercase text-3xl font-bold'>Đăng nhập</h1>
        <p className='text-center uppercase text-white/50'>Để bảo vệ bạn, vui lòng xác minh danh tính.</p>
      </div>

      <LoginForm />
    </div>
  );
}

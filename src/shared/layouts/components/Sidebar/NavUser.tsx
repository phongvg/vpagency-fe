import { useAuthStore } from "@/shared/stores/auth/useAuthStore";
import { Icon } from "@iconify/react";

export default function NavUser() {
  const { user } = useAuthStore();

  return (
    <div className='flex items-center gap-2 px-2'>
      <Icon icon='solar:shield-user-linear' className='text-2xl text-white' />
      <div className='flex-1'>
        <div className='uppercase'>
          <span>Welcome back, {user?.lastName + " " + user?.firstName}</span>
        </div>
      </div>
    </div>
  );
}

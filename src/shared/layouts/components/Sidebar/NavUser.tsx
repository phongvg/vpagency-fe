import { useAuthStore } from "@/shared/stores/auth/useAuthStore";
import { ShieldUser } from "lucide-react";

export default function NavUser() {
  const { user } = useAuthStore();

  return (
    <div className='flex items-center gap-2 px-2'>
      <ShieldUser className='text-2xl text-white' />
      <div className='flex-1'>
        <div className='uppercase'>
          <span>Welcome back, {user?.lastName + " " + user?.firstName}</span>
        </div>
      </div>
    </div>
  );
}

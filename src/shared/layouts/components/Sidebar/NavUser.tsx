import { urls } from "@/app/routes/route.constant";
import { authService } from "@/auth/services/auth.service";
import UpdateProfileModal from "@/modules/me/components/UpdateProfileModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { useAuthStore } from "@/shared/stores/auth/useAuthStore";
import { getInitials } from "@/shared/utils/common.util";
import { ChevronDown, LogOut, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavUser() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleLogout = async () => {
    await authService.logout();
    navigate(urls.auth + "/" + urls.login);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='flex items-center gap-2 hover:bg-[#437de3] px-2 py-2 rounded-none transition-colors cursor-pointer border-b-2 border-dashed border-white/20 pb-4'>
          <Avatar className="mario-border rounded-none w-10 h-10">
            <AvatarImage src={user?.avatar ?? undefined} alt={user?.lastName + " " + user?.firstName} className="rounded-none object-cover" />
            <AvatarFallback className="rounded-none bg-[#f83800] text-xs font-bold drop-shadow-md text-white">{getInitials(user?.lastName + " " + user?.firstName)}</AvatarFallback>
          </Avatar>

          <div className='flex-1'>
            <div className='text-white uppercase drop-shadow-md text-xs font-bold leading-relaxed'>
              <span>HELLO, <br/><span className="text-[#fce0a6]">{user?.lastName + " " + user?.firstName}</span></span>
            </div>
          </div>
          <ChevronDown className='text-white drop-shadow-md ml-1' size={18} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-56 font-roboto'>
        <DropdownMenuLabel>
          <div className='flex flex-col space-y-1'>
            <p className='font-roboto font-medium text-sm leading-none'>{user?.lastName + " " + user?.firstName}</p>
            <p className='font-roboto text-muted-foreground text-xs leading-none'>{user?.email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem className='hover:bg-white/10 cursor-pointer' onClick={() => setIsProfileModalOpen(true)}>
          <User />
          Thông tin cá nhân
        </DropdownMenuItem>

        <DropdownMenuItem className='hover:bg-white/10 cursor-pointer' onClick={handleLogout}>
          <LogOut />
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>

      <UpdateProfileModal open={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
    </DropdownMenu>
  );
}

import { authService } from "@/auth/services/auth.service";
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
import { ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NavUser() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.logout();
    navigate("/auth/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='flex items-center gap-2 hover:bg-white/10 px-2 py-2 rounded-md transition-colors cursor-pointer'>
          <Avatar>
            <AvatarImage src={user?.avatar ?? undefined} alt={user?.lastName + " " + user?.firstName} />
            <AvatarFallback>{getInitials(user?.lastName + " " + user?.firstName)}</AvatarFallback>
          </Avatar>

          <div className='flex-1'>
            <div className='text-white uppercase'>
              <span>Welcome back, {user?.lastName + " " + user?.firstName}</span>
            </div>
          </div>
          <ChevronDown className='text-white' size={16} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-56'>
        <DropdownMenuLabel>
          <div className='flex flex-col space-y-1'>
            <p className='font-medium text-sm leading-none'>{user?.lastName + " " + user?.firstName}</p>
            <p className='text-muted-foreground text-xs leading-none'>{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='cursor-pointer' onClick={handleLogout}>
          <LogOut />
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

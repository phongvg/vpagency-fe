import type { User } from "@/modules/user/types/user.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/components/ui/tooltip";
import { getInitials } from "@/shared/utils/common.util";

interface UserAvatarProps {
  data: Partial<User> | Partial<User>[] | null;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
}

export default function UserAvatar({ data, size }: UserAvatarProps) {
  if (!data) return null;

  const sizeClass = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
    "2xl": "w-20 h-20",
    "3xl": "w-24 h-24",
  }[size || "md"];

  if (Array.isArray(data)) {
    return (
      <div className='flex -space-x-2'>
        {data.map((user) => (
          <Tooltip key={user.id}>
            <TooltipTrigger asChild>
              <Avatar className={sizeClass}>
                <AvatarImage src={user.avatar || undefined} alt={user.username} />
                <AvatarFallback>{getInitials(`${user.firstName} ${user.lastName}`)}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>

            <TooltipContent side='top'>
              {user.firstName} {user.lastName} {user.username && `(${user.username})`}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Avatar className={sizeClass}>
          <AvatarImage src={data.avatar || undefined} alt={data.username} />
          <AvatarFallback>{getInitials(`${data.firstName} ${data.lastName}`)}</AvatarFallback>
        </Avatar>
      </TooltipTrigger>

      <TooltipContent side='top'>
        {data.firstName} {data.lastName} {data.username && `(${data.username})`}
      </TooltipContent>
    </Tooltip>
  );
}

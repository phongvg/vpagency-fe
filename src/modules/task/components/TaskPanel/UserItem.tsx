import type { User } from "@/modules/user/types/user.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/components/ui/tooltip";
import { getInitials } from "@/shared/utils/common.util";

interface UserItemProps {
  data: User | User[] | null;
}

export default function UserItem({ data }: UserItemProps) {
  if (!data) return null;

  if (Array.isArray(data)) {
    return (
      <div className='flex -space-x-2'>
        {data.map((user) => (
          <Tooltip key={user.id}>
            <TooltipTrigger asChild>
              <Avatar className='w-8 h-8'>
                <AvatarImage src={user.avatar || undefined} alt={user.username} />
                <AvatarFallback>{getInitials(`${user.firstName} ${user.lastName}`)}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>

            <TooltipContent side='top'>
              {user.firstName} {user.lastName} ({user.username})
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Avatar className='w-8 h-8'>
          <AvatarImage src={data.avatar || undefined} alt={data.username} />
          <AvatarFallback>{getInitials(`${data.firstName} ${data.lastName}`)}</AvatarFallback>
        </Avatar>
      </TooltipTrigger>

      <TooltipContent side='top'>
        {data.firstName} {data.lastName} ({data.username})
      </TooltipContent>
    </Tooltip>
  );
}

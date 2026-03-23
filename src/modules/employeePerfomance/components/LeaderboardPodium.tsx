import Crown from "@/assets/images/crown.png";
import Medal1 from "@/assets/images/medal-1.png";
import Medal2 from "@/assets/images/medal-2.png";
import Medal3 from "@/assets/images/medal-3.png";
import type { By } from "@/modules/employeePerfomance/types/employeePerformance.type";
import UserAvatar from "@/shared/components/UserAvatar";
import { cn } from "@/shared/libs/utils";

interface LeaderboardPodiumProps {
  rank: number;
  user: By;
  formatValue?: (value: number) => string;
}

const textColorClass: Record<number, string> = {
  1: "text-yellow-300",
  2: "text-gray-300",
  3: "text-yellow-600",
};

const medalMap: Record<number, string> = {
  1: Medal1,
  2: Medal2,
  3: Medal3,
};

export default function LeaderboardPodium({ rank, user, formatValue }: LeaderboardPodiumProps) {
  const medal = medalMap[rank];
  const isTop1 = rank === 1;
  const displayValue = formatValue ? formatValue(user.value) : user.value.toLocaleString();

  return (
    <div className={cn("flex flex-col items-center gap-4", isTop1 && "-translate-y-8")}>
      <div className='relative'>
        {isTop1 && (
          <img
            src={Crown}
            className='-top-6 left-1/2 z-10 absolute w-10 h-10 -translate-x-1/2'
            alt={`${user.firstName} ${user.lastName}`}
            loading='lazy'
          />
        )}

        <UserAvatar data={{ firstName: user.firstName, lastName: user.lastName, avatar: user.avatar }} size='3xl' />

        {medal && (
          <img
            src={medal}
            className={cn("-bottom-3 left-1/2 absolute w-8 h-8 -translate-x-1/2", isTop1 && "scale-110")}
            alt={`${user.firstName} ${user.lastName}`}
            loading='lazy'
          />
        )}
      </div>

      <div className='space-y-1 text-center'>
        <p className={cn("max-w-full font-semibold text-lg", textColorClass[rank])}>
          {user.firstName} {user.lastName}
        </p>
        <p className='font-bold text-[13px] text-primary'>{displayValue}</p>
      </div>
    </div>
  );
}

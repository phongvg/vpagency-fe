import LeaderboardPodium from "@/modules/employeePerfomance/components/LeaderboardPodium";
import type { By } from "@/modules/employeePerfomance/types/employeePerformance.type";

interface LeaderboardProps {
  data: By[];
  formatValue?: (value: number) => string;
}

export default function Leaderboard({ data, formatValue }: LeaderboardProps) {
  const byRank = (rank: number) => data.find((d) => d.rank === rank);
  const rank2 = byRank(2);
  const rank1 = byRank(1);
  const rank3 = byRank(3);

  if (!rank1 && !rank2 && !rank3) {
    return (
      <div className='flex justify-center'>
        <div className='flex flex-col items-center gap-2 bg-neutral-700/30 p-8 rounded-lg w-[400px] max-w-[400px] text-neutral-400'>
          <svg xmlns='http://www.w3.org/2000/svg' className='opacity-40 w-10 h-10' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='M9 17v-2m3 2v-4m3 4v-6M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
            />
          </svg>
          <span className='text-sm'>Chưa có dữ liệu xếp hạng</span>
        </div>
      </div>
    );
  }

  return (
    <div className='flex justify-center items-center gap-10 pt-10 pb-5'>
      {rank2 && <LeaderboardPodium rank={2} user={rank2} formatValue={formatValue} />}
      {rank1 && <LeaderboardPodium rank={1} user={rank1} formatValue={formatValue} />}
      {rank3 && <LeaderboardPodium rank={3} user={rank3} formatValue={formatValue} />}
    </div>
  );
}

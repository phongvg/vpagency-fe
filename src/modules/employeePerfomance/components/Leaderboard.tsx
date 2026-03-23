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

  if (!rank1 && !rank2 && !rank3) return null;

  return (
    <div className='flex justify-center items-center gap-10 pt-10 pb-5'>
      {rank2 && <LeaderboardPodium rank={2} user={rank2} formatValue={formatValue} />}
      {rank1 && <LeaderboardPodium rank={1} user={rank1} formatValue={formatValue} />}
      {rank3 && <LeaderboardPodium rank={3} user={rank3} formatValue={formatValue} />}
    </div>
  );
}

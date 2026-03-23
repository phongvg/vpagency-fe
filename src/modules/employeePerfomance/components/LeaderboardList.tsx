import type { By } from "@/modules/employeePerfomance/types/employeePerformance.type";

interface LeaderboardListProps {
  data: By[];
  formatValue?: (value: number) => string;
}

export default function LeaderboardList({ data, formatValue }: LeaderboardListProps) {
  const rest = data.filter((d) => d.rank > 3).sort((a, b) => a.rank - b.rank);

  if (rest.length === 0) return null;

  return (
    <div className='flex justify-center'>
      <div className='flex flex-col gap-3 w-[400px] max-w-[400px]'>
        {rest.map((item) => (
          <div key={item.userId} className='flex items-center bg-neutral-700/50 p-3 rounded-lg'>
            <div className='w-6 font-bold text-[13px] text-center'>{item.rank}</div>
            <div className='flex items-center gap-3'>
              <img
                src={item.avatar || `https://i.pravatar.cc/150?img=${item.rank}`}
                alt={`${item.firstName} ${item.lastName}`}
                className='rounded-full w-8 h-8'
                loading='lazy'
              />
              <span className='font-medium'>
                {item.firstName} {item.lastName}
              </span>
            </div>
            <div className='ml-auto font-bold text-primary'>{formatValue ? formatValue(item.value) : item.value.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

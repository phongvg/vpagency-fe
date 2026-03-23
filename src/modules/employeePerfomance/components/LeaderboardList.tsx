import type { By } from "@/modules/employeePerfomance/types/employeePerformance.type";

interface LeaderboardListProps {
  data: By[];
  formatValue?: (value: number) => string;
}

export default function LeaderboardList({ data, formatValue }: LeaderboardListProps) {
  const rest = data.filter((d) => d.rank > 3).sort((a, b) => a.rank - b.rank);

  if (rest.length === 0) {
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

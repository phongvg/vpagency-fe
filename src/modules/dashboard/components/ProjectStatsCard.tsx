import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { useCountUp } from "@/shared/hooks/useCountUp";

export default function ProjectStatsCard() {
  const totalCount = useCountUp(12, { duration: 1500, enableScrollSpy: true });
  const activeCount = useCountUp(12, { duration: 1500, enableScrollSpy: true });
  const assignedCount = useCountUp(12, { duration: 1500, enableScrollSpy: true });
  const completedCount = useCountUp(12, { duration: 1500, enableScrollSpy: true });
  const spendingCount = useCountUp(12, { duration: 1500, enableScrollSpy: true });

  return (
    <Card className='hover:shadow-lg transition-all animate-in duration-700 fade-in-50'>
      <CardHeader>
        <CardTitle>Thống kê dự án</CardTitle>
      </CardHeader>

      <CardContent className='p-0'>
        <div className='grid grid-cols-2 p-1'>
          <div className='group p-1 text-[9px]'>
            <div className='text-white/50 group-hover:text-white/70 transition-colors'>Tổng dự án</div>
            <div className='font-bold text-lg' ref={totalCount.ref as React.RefObject<HTMLDivElement>}>
              {totalCount.count}
            </div>
          </div>

          <div className='group p-1 text-[9px]'>
            <div className='text-white/50 group-hover:text-white/70 transition-colors'>Dự án đang hoạt động</div>
            <div className='font-bold text-green-400 text-lg' ref={activeCount.ref as React.RefObject<HTMLDivElement>}>
              {activeCount.count}
            </div>
          </div>

          <div className='group p-1 text-[9px]'>
            <div className='text-white/50 group-hover:text-white/70 transition-colors'>Công việc được giao hôm nay</div>
            <div className='font-bold text-blue-400 text-lg' ref={assignedCount.ref as React.RefObject<HTMLDivElement>}>
              {assignedCount.count}
            </div>
          </div>

          <div className='group p-1 text-[9px]'>
            <div className='text-white/50 group-hover:text-white/70 transition-colors'>Công việc hoàn thành hôm nay</div>
            <div className='font-bold text-purple-400 text-lg' ref={completedCount.ref as React.RefObject<HTMLDivElement>}>
              {completedCount.count}
            </div>
          </div>

          <div className='group p-1 text-[9px]'>
            <div className='text-white/50 group-hover:text-white/70 transition-colors'>Tổng chi tiêu hôm nay</div>
            <div className='font-bold text-yellow-400 text-lg' ref={spendingCount.ref as React.RefObject<HTMLDivElement>}>
              {spendingCount.count}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

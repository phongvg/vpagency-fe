import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";

export default function ProjectStatsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thống kê dự án</CardTitle>
      </CardHeader>

      <CardContent className='p-0'>
        <div className='grid grid-cols-2 p-1'>
          <div className='p-1 text-[9px]'>
            <div className='text-white/50'>Tổng dự án</div>
            <div className='font-bold'>12</div>
          </div>

          <div className='p-1 text-[9px]'>
            <div className='text-white/50'>Dự án đang hoạt động</div>
            <div className='font-bold'>12</div>
          </div>

          <div className='p-1 text-[9px]'>
            <div className='text-white/50'>Công việc được giao hôm nay</div>
            <div className='font-bold'>12</div>
          </div>

          <div className='p-1 text-[9px]'>
            <div className='text-white/50'>Công việc hoàn thành hôm nay</div>
            <div className='font-bold'>12</div>
          </div>

          <div className='p-1 text-[9px]'>
            <div className='text-white/50'>Tổng chi tiêu hôm nay</div>
            <div className='font-bold'>12</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

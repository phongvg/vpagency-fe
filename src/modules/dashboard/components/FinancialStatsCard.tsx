import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { formatDollarAmount } from "@/shared/utils/common.util";

export default function FinancialStatsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thống kê tài chính</CardTitle>
      </CardHeader>

      <CardContent className='p-0'>
        <div className='grid grid-cols-2 p-1'>
          <div className='p-1 text-[9px]'>
            <div className='text-white/50'>Tổng chi tiêu tháng 1</div>
            <div className='font-bold'>{formatDollarAmount(12000)}</div>
          </div>

          <div className='p-1 text-[9px]'>
            <div className='text-white/50'>Hoa hồng rút về</div>
            <div className='font-bold'>{formatDollarAmount(12000)}</div>
          </div>

          <div className='p-1 text-[9px]'>
            <div className='text-white/50'>Hoa hồng tạm giữ</div>
            <div className='font-bold'>{formatDollarAmount(12000)}</div>
          </div>

          <div className='p-1 text-[9px]'>
            <div className='text-white/50'>Lợi nhuận</div>
            <div className='font-bold'>{formatDollarAmount(12000)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

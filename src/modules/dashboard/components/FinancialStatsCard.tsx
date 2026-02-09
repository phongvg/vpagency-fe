import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { useCountUp } from "@/shared/hooks/useCountUp";
import { formatDollarAmount } from "@/shared/utils/common.util";

export default function FinancialStatsCard() {
  const totalSpending = useCountUp(12000, { duration: 2000, decimals: 2, enableScrollSpy: true });
  const receivedRevenue = useCountUp(12000, { duration: 2000, decimals: 2, enableScrollSpy: true });
  const holdRevenue = useCountUp(12000, { duration: 2000, decimals: 2, enableScrollSpy: true });
  const profit = useCountUp(12000, { duration: 2000, decimals: 2, enableScrollSpy: true });

  return (
    <Card className='hover:shadow-lg transition-all animate-in duration-1000 fade-in-50'>
      <CardHeader>
        <CardTitle>Thống kê tài chính</CardTitle>
      </CardHeader>

      <CardContent className='p-0'>
        <div className='grid grid-cols-2 p-1'>
          <div className='group p-1 text-[9px]'>
            <div className='text-white/50 group-hover:text-white/70 transition-colors'>Tổng chi tiêu tháng 1</div>
            <div className='font-bold text-red-400 text-lg' ref={totalSpending.ref as React.RefObject<HTMLDivElement>}>
              {formatDollarAmount(totalSpending.count)}
            </div>
          </div>

          <div className='group p-1 text-[9px]'>
            <div className='text-white/50 group-hover:text-white/70 transition-colors'>Hoa hồng rút về</div>
            <div className='font-bold text-green-400 text-lg' ref={receivedRevenue.ref as React.RefObject<HTMLDivElement>}>
              {formatDollarAmount(receivedRevenue.count)}
            </div>
          </div>

          <div className='group p-1 text-[9px]'>
            <div className='text-white/50 group-hover:text-white/70 transition-colors'>Hoa hồng tạm giữ</div>
            <div className='font-bold text-orange-400 text-lg' ref={holdRevenue.ref as React.RefObject<HTMLDivElement>}>
              {formatDollarAmount(holdRevenue.count)}
            </div>
          </div>

          <div className='group p-1 text-[9px]'>
            <div className='text-white/50 group-hover:text-white/70 transition-colors'>Lợi nhuận</div>
            <div className='font-bold text-blue-400 text-lg' ref={profit.ref as React.RefObject<HTMLDivElement>}>
              {formatDollarAmount(profit.count)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

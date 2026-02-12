import { useMonthlySpendingStats } from "@/modules/dashboard/hooks/useMonthlySpendingStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { formatDollarAmount, getDaysInMonth } from "@/shared/utils/common.util";
import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function MonthlySpendingChart() {
  const { data: monthlySpendingStats } = useMonthlySpendingStats();

  const chartData = useMemo(() => {
    if (!monthlySpendingStats) return [];

    const daysInMonth = getDaysInMonth(monthlySpendingStats.month);
    const dataLength = monthlySpendingStats.cost?.length || 0;

    return Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;
      const hasData = index < dataLength;

      return {
        day: `${day}`,
        receivedRevenue: hasData ? monthlySpendingStats.receivedRevenue?.[index] || 0 : 0,
        holdRevenue: hasData ? monthlySpendingStats.holdRevenue?.[index] || 0 : 0,
        cost: hasData ? monthlySpendingStats.cost?.[index] || 0 : 0,
        profit: hasData ? monthlySpendingStats.profit?.[index] || 0 : 0,
      };
    });
  }, [monthlySpendingStats]);

  return (
    <Card className='hover:shadow-xl transition-shadow duration-300'>
      <CardHeader>
        <CardTitle>Thống kê chi tiêu tháng {monthlySpendingStats?.month}</CardTitle>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width='100%' height={400}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id='receivedRevenue' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#10b981' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#10b981' stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id='holdRevenue' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#f59e0b' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#f59e0b' stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id='cost' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#ef4444' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#ef4444' stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id='profit' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#3b82f6' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#3b82f6' stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray='3 3' stroke='#ffffff10' />
            <XAxis dataKey='day' label={{ value: "Ngày", position: "insideBottom", offset: -5 }} stroke='#ffffff50' />
            <YAxis
              label={{ value: "USD", angle: -90, position: "insideLeft" }}
              tickFormatter={(value) => formatDollarAmount(value)}
              stroke='#ffffff50'
            />
            <Tooltip
              formatter={(value: number | undefined) => formatDollarAmount(value ?? 0)}
              labelFormatter={(label) => `Ngày ${label}`}
              contentStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Area
              type='monotone'
              dataKey='receivedRevenue'
              stackId='1'
              stroke='#10b981'
              fill='url(#receivedRevenue)'
              name='Hoa hồng rút về'
              animationDuration={1500}
            />
            <Area
              type='monotone'
              dataKey='holdRevenue'
              stackId='1'
              stroke='#f59e0b'
              fill='url(#holdRevenue)'
              name='Hoa hồng tạm giữ'
              animationDuration={1500}
            />
            <Area type='monotone' dataKey='cost' stackId='2' stroke='#ef4444' fill='url(#cost)' name='Tổng chi tiêu' animationDuration={1500} />
            <Area type='monotone' dataKey='profit' stackId='3' stroke='#3b82f6' fill='#3b82f6' name='Lợi nhuận' />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

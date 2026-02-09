import { useMonthlySpendingStats } from "@/modules/dashboard/hooks/useMonthlySpendingStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { formatDollarAmount, getDaysInMonth } from "@/shared/utils/common.util";
import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function MonthlySpendingChart() {
  const { data: monthlySpendingStats } = useMonthlySpendingStats();

  const totalSpentMonth = useMemo(() => {
    return monthlySpendingStats?.cost?.reduce((acc, curr) => acc + curr, 0) || 0;
  }, [monthlySpendingStats]);

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
    <Card>
      <CardHeader>
        <CardTitle>Thống kê chi tiêu tháng {monthlySpendingStats?.month}</CardTitle>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width='100%' height={400}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='day' label={{ value: "Ngày", position: "insideBottom", offset: -5 }} />
            <YAxis label={{ value: "USD", angle: -90, position: "insideLeft" }} tickFormatter={(value) => formatDollarAmount(value)} />
            <Tooltip formatter={(value: number | undefined) => formatDollarAmount(value ?? 0)} labelFormatter={(label) => `Ngày ${label}`} />
            <Legend />
            <Area type='monotone' dataKey='receivedRevenue' stackId='1' stroke='#10b981' fill='#10b981' name='Hoa hồng rút về' />
            <Area type='monotone' dataKey='holdRevenue' stackId='1' stroke='#f59e0b' fill='#f59e0b' name='Hoa hồng tạm giữ' />
            <Area type='monotone' dataKey='cost' stackId='2' stroke='#ef4444' fill='#ef4444' name='Tổng chi tiêu' />
            <Area type='monotone' dataKey='profit' stackId='3' stroke='#3b82f6' fill='#3b82f6' name='Lợi nhuận' />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

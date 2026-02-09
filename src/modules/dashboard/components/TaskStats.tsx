import { taskColumnConfig } from "@/modules/dashboard/configs/task-column.config";
import { useTaskStats } from "@/modules/dashboard/hooks/useTaskStats";
import { useTasks } from "@/modules/task/hooks/useTasks";
import type { TaskListParams } from "@/modules/task/types/task.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { AppTable } from "@/shared/components/common/AppTable";
import { useCountUp } from "@/shared/hooks/useCountUp";
import { useAuthStore } from "@/shared/stores/auth/useAuthStore";
import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function TaskStats() {
  const [params, setParams] = useState<TaskListParams>({
    page: 1,
    limit: 10,
    search: undefined,
    type: undefined,
    status: undefined,
    assignedUserId: undefined,
    creatorId: undefined,
    fromDate: undefined,
    toDate: undefined,
    priority: undefined,
    projectId: undefined,
  });

  const { data: taskStats } = useTaskStats();
  const { data: tasks } = useTasks(params);

  const { user } = useAuthStore();

  const onGoingCount = useCountUp(taskStats?.onGoing || 0, { duration: 1500, enableScrollSpy: true });

  const chartData = useMemo(() => {
    if (!taskStats?.series || !taskStats?.range) return [];

    return taskStats.range.map((date, index) => {
      const dataPoint: any = { date };

      taskStats.series.forEach((serie) => {
        dataPoint[serie.name] = serie.data[index] || 0;
      });

      return dataPoint;
    });
  }, [taskStats]);

  return (
    <div className='space-y-4'>
      <Card className='hover:shadow-lg transition-all animate-in duration-500 fade-in-50'>
        <CardHeader>
          <CardTitle>Xin chào, {`${user?.firstName} ${user?.lastName}`}!</CardTitle>
        </CardHeader>

        <CardContent>
          <div className='text-lg'>
            Bạn có{" "}
            <span className='font-bold text-orange-400 text-2xl' ref={onGoingCount.ref}>
              {onGoingCount.count}
            </span>{" "}
            công việc cần xử lý.
          </div>
        </CardContent>
      </Card>

      <Card className='slide-in-from-bottom-4 hover:shadow-lg transition-all animate-in duration-700 fade-in-50'>
        <CardHeader>
          <CardTitle>Tổng quan công việc 7 ngày gần nhất</CardTitle>
        </CardHeader>

        <CardContent>
          <ResponsiveContainer width='100%' height={350}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray='3 3' stroke='#ffffff10' />
              <XAxis dataKey='date' tick={{ fontSize: 12 }} stroke='#ffffff50' />
              <YAxis label={{ value: "Số lượng", angle: -90, position: "insideLeft" }} allowDecimals={false} stroke='#ffffff50' />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                }}
              />
              <Legend wrapperStyle={{ paddingTop: "20px" }} />
              <Bar dataKey='Đang hoàn thiện' fill='#f59e0b' radius={[8, 8, 0, 0]} animationDuration={1500} />
              <Bar dataKey='Hoàn thành' fill='#10b981' radius={[8, 8, 0, 0]} animationDuration={1500} />
              <Bar dataKey='Trễ' fill='#ef4444' radius={[8, 8, 0, 0]} animationDuration={1500} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách công việc</CardTitle>
        </CardHeader>

        <CardContent>
          <AppTable
            data={tasks?.items ?? []}
            columns={taskColumnConfig()}
            page={params.page}
            pageCount={tasks?.meta?.totalPages}
            pageSize={params.limit}
            onPageChange={(page, pageSize) => setParams((prev) => ({ ...prev, page, limit: pageSize }))}
          />
        </CardContent>
      </Card>
    </div>
  );
}

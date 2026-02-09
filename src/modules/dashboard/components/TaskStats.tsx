import { taskColumnConfig } from "@/modules/dashboard/configs/task-column.config";
import { useTaskStats } from "@/modules/dashboard/hooks/useTaskStats";
import { useTasks } from "@/modules/task/hooks/useTasks";
import type { TaskListParams } from "@/modules/task/types/task.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { AppTable } from "@/shared/components/common/AppTable";
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
      <Card>
        <CardHeader>
          <CardTitle>Xin chào, {`${user?.firstName} ${user?.lastName}`}!</CardTitle>
        </CardHeader>

        <CardContent>Bạn có {taskStats?.onGoing} công việc cần xử lý.</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tổng quan công việc 7 ngày gần nhất</CardTitle>
        </CardHeader>

        <CardContent>
          <ResponsiveContainer width='100%' height={350}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='date' tick={{ fontSize: 12 }} />
              <YAxis label={{ value: "Số lượng", angle: -90, position: "insideLeft" }} allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey='Đang hoàn thiện' fill='#f59e0b' radius={[4, 4, 0, 0]} />
              <Bar dataKey='Hoàn thành' fill='#10b981' radius={[4, 4, 0, 0]} />
              <Bar dataKey='Trễ' fill='#ef4444' radius={[4, 4, 0, 0]} />
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

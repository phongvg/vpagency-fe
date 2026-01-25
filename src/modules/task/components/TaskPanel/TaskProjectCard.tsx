import InfoRow from "@/modules/task/components/TaskPanel/InfoRow";
import type { Task } from "@/modules/task/types/task.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { formatDollarAmount } from "@/shared/utils/common.util";

interface TaskProjectCardProps {
  task: Task;
}

export default function TaskProjectCard({ task }: TaskProjectCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin Dự án</CardTitle>
      </CardHeader>

      <CardContent className='space-y-2'>
        <InfoRow label='Tên dự án' value={task.project.name} />
        <InfoRow label='Loại dự án' value={task.project.typeName} />
        <InfoRow label='Trạng thái' value={task.project.statusName} />
        <InfoRow label='Tổng ngân sách' value={formatDollarAmount(task.project.totalBudget)} />
        <InfoRow label='Tổng ngân sách chi tiêu' value={formatDollarAmount(task.totalCost)} />
        <InfoRow label='CPC trung bình' value={formatDollarAmount(task.avgCpc)} />
      </CardContent>
    </Card>
  );
}

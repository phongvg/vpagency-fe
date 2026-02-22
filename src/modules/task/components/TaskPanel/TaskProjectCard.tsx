import InfoRow from "@/modules/task/components/TaskPanel/InfoRow";
import type { Task } from "@/modules/task/types/task.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { formatDollarAmount } from "@/shared/utils/common.util";
import { Activity, BarChart3, Coins, FolderKanban, Tag, TrendingDown } from "lucide-react";

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
        <InfoRow label='Tên dự án' value={task.project.name} icon={<FolderKanban className='w-4 h-4' />} />
        <InfoRow label='Loại dự án' value={task.project.typeName} icon={<Tag className='w-4 h-4' />} />
        <InfoRow label='Trạng thái' value={task.project.statusName} icon={<Activity className='w-4 h-4' />} />
        <InfoRow label='Tổng ngân sách' value={formatDollarAmount(task.project.totalBudget)} icon={<Coins className='w-4 h-4' />} />
        <InfoRow label='Tổng ngân sách chi tiêu' value={formatDollarAmount(task.totalCost)} icon={<TrendingDown className='w-4 h-4' />} />
        <InfoRow label='CPC trung bình' value={formatDollarAmount(task.avgCpc)} icon={<BarChart3 className='w-4 h-4' />} />
      </CardContent>
    </Card>
  );
}

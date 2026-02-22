import InfoRow from "@/modules/task/components/TaskPanel/InfoRow";
import TaskStatusChip from "@/modules/task/components/TaskStatusChip";
import type { Task } from "@/modules/task/types/task.type";
import { TaskPriorityMap, TaskTypeMap } from "@/modules/task/utils/task.util";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { formatDate } from "date-fns";
import { Calendar, FileText, Flag, FolderKanban, ListChecks, TrendingUp } from "lucide-react";

interface TaskOverviewCardProps {
  task: Task;
}

export default function TaskOverviewCard({ task }: TaskOverviewCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin chung</CardTitle>
      </CardHeader>

      <CardContent className='space-y-2'>
        <InfoRow label='Trạng thái' value={<TaskStatusChip status={task.status} />} icon={<ListChecks className='w-4 h-4' />} />
        <InfoRow label='Loại công việc' value={TaskTypeMap[task.type]} icon={<FolderKanban className='w-4 h-4' />} />
        <InfoRow label='Ưu tiên' value={TaskPriorityMap[task.priority]} icon={<Flag className='w-4 h-4' />} />
        <InfoRow label='Deadline' value={formatDate(task.deadline, "dd/MM/yyyy")} icon={<Calendar className='w-4 h-4' />} />
        <InfoRow label='Tiến độ công việc' value={task.progress + "%"} icon={<TrendingUp className='w-4 h-4' />} />
        <InfoRow label='Ghi chú' value={task.note} icon={<FileText className='w-4 h-4' />} />
      </CardContent>
    </Card>
  );
}

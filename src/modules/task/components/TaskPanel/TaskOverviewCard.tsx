import InfoRow from "@/modules/task/components/TaskPanel/InfoRow";
import TaskStatusChip from "@/modules/task/components/TaskStatusChip";
import type { Task } from "@/modules/task/types/task.type";
import { TaskPriorityMap, TaskTypeMap } from "@/modules/task/utils/task.util";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { formatDate } from "date-fns";

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
        <InfoRow label='Trạng thái' value={<TaskStatusChip status={task.status} />} />
        <InfoRow label='Loại công việc' value={TaskTypeMap[task.type]} />
        <InfoRow label='Ưu tiên' value={TaskPriorityMap[task.priority]} />
        <InfoRow label='Deadline' value={formatDate(task.deadline, "dd/MM/yyyy")} />
        <InfoRow label='Tiến độ công việc' value={task.progress + "%"} />
        <InfoRow label='Ghi chú' value={task.note} />
      </CardContent>
    </Card>
  );
}

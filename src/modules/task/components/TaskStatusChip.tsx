import { TaskStatus } from "@/modules/task/types/task.type";
import { TaskStatusBgClassMap, TaskStatusMap, TaskStatusTextClassMap } from "@/modules/task/utils/task.util";
import { cn } from "@/shared/libs/utils";

interface TaskStatusChipProps {
  status: TaskStatus;
}

export default function TaskStatusChip({ status }: TaskStatusChipProps) {
  return (
    <span
      className={cn(
        "inline-flex inset-ring inset-ring-red-400/20 items-center px-2 py-1 rounded-md font-semibold",
        TaskStatusTextClassMap[status],
        TaskStatusBgClassMap[status]
      )}>
      {TaskStatusMap[status]}
    </span>
  );
}

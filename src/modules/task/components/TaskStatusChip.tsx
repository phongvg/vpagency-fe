import { TaskStatus } from "@/modules/task/types/task.type";
import { TaskStatusBgClassMap, TaskStatusMap, TaskStatusTextClassMap } from "@/modules/task/utils/task.util";
import { cn } from "@/shared/libs/utils";

interface TaskStatusChipProps {
  status: TaskStatus;
  animated?: boolean;
}

export default function TaskStatusChip({ status, animated = true }: TaskStatusChipProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-1.5 py-1 rounded-full font-bold text-[8px]",
        "transition-all duration-300",
        animated && "hover:scale-110 hover:shadow-lg",
        TaskStatusBgClassMap[status],
        TaskStatusTextClassMap[status]
      )}>
      <span
        className={cn(
          "rounded-full w-1 h-1",
          status === TaskStatus.PENDING && "bg-gray-500",
          status === TaskStatus.IN_PROGRESS && "bg-blue-500 animate-pulse",
          status === TaskStatus.COMPLETED && "bg-green-500",
          status === TaskStatus.CANCELLED && "bg-red-500"
        )}
      />
      {TaskStatusMap[status]}
    </div>
  );
}

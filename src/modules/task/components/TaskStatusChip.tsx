import type { TaskStatus } from "@/modules/task/types/task.type";
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
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-xs",
        "transition-all duration-300",
        animated && "hover:scale-110 hover:shadow-lg",
        TaskStatusBgClassMap[status],
        TaskStatusTextClassMap[status]
      )}>
      <span
        className={cn(
          "rounded-full w-2 h-2",
          status === "PENDING" && "bg-gray-500",
          status === "IN_PROGRESS" && "bg-blue-500 animate-pulse",
          status === "COMPLETED" && "bg-green-500",
          status === "CANCELLED" && "bg-red-500"
        )}
      />
      {TaskStatusMap[status]}
    </div>
  );
}

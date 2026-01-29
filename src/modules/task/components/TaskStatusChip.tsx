import type { TaskStatus } from "@/modules/task/types/task.type";
import { TaskStatusBgClassMap, TaskStatusMap, TaskStatusTextClassMap } from "@/modules/task/utils/task.util";
import { cn } from "@/shared/libs/utils";

interface TaskStatusChipProps {
  status: TaskStatus;
}

export default function TaskStatusChip({ status }: TaskStatusChipProps) {
  return (
    <div className={cn("px-2 py-[2px] rounded-[9999px] font-bold", TaskStatusBgClassMap[status], TaskStatusTextClassMap[status])}>
      {TaskStatusMap[status]}
    </div>
  );
}

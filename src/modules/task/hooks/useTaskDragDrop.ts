import { useUpdateTaskStatus } from "@/modules/task/hooks/useUpdateTaskStatus";
import type { TaskStatus } from "@/modules/task/types/task.type";
import { useState } from "react";

export const useTaskDragDrop = () => {
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);
  const [draggingFromStatus, setDraggingFromStatus] = useState<TaskStatus | null>(null);
  const updateTaskStatus = useUpdateTaskStatus();

  const handleDragStart = (taskId: string, currentStatus: TaskStatus) => {
    setDraggingTaskId(taskId);
    setDraggingFromStatus(currentStatus);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>, targetStatus: TaskStatus) => {
    e.preventDefault();

    if (!draggingTaskId || !draggingFromStatus) return;

    // Nếu drop vào cùng cột thì không làm gì
    if (draggingFromStatus === targetStatus) {
      setDraggingTaskId(null);
      setDraggingFromStatus(null);
      return;
    }

    await updateTaskStatus.mutateAsync(
      {
        id: draggingTaskId,
        status: targetStatus,
      },
      {
        onSettled: () => {
          setDraggingTaskId(null);
          setDraggingFromStatus(null);
        },
      }
    );
  };

  const handleDragEnd = () => {
    setDraggingTaskId(null);
    setDraggingFromStatus(null);
  };

  return {
    draggingTaskId,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    isUpdating: updateTaskStatus.isPending,
  };
};

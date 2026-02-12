import { taskApi } from "@/modules/task/api/task.api";
import { useMutation } from "@tanstack/react-query";

export const useUpdateTaskProgress = () => {
  return useMutation({
    mutationFn: ({ taskId, progress }: { taskId: string; progress: number }) => taskApi.updateTaskProgress(taskId, progress),
  });
};

import { taskApi } from "@/modules/task/api/task.api";
import { taskQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) => taskApi.deleteTask(taskId),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.all });
      toast.success(res.message);
    },
  });
};

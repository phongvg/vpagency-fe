import { taskApi } from "@/modules/task/api/task.api";
import { taskQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteResearchDetail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { taskId: string; id: string }) => taskApi.deleteResearchDetail(data.taskId, data.id),
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.detail(variables.taskId) });
      toast.success(res.message);
    },
  });
};

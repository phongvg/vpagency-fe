import { taskApi } from "@/modules/task/api/task.api";
import type { UpdateDocumentAppealMetricsRequest } from "@/modules/task/types/task.type";
import { taskQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateDocumentAppealDetail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { taskId: string; id: string; payload: UpdateDocumentAppealMetricsRequest }) =>
      taskApi.updateDocumentAppealDetail(data.taskId, data.id, data.payload),
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.detail(variables.taskId) });
      toast.success(res.message);
    },
  });
};

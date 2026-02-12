import { taskApi } from "@/modules/task/api/task.api";
import type { UpdateAppealMetricsRequest } from "@/modules/task/types/task.type";
import { taskQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateAppealMetrics = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; payload: UpdateAppealMetricsRequest }) => taskApi.updateAppealMetrics(data.id, data.payload),
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.detail(variables.id) });
      toast.success(res.message);
    },
  });
};

import { taskApi } from "@/modules/task/api/task.api";
import type { UpdateResearchMetricsRequest } from "@/modules/task/types/task.type";
import { taskQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateResearchMetrics = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; payload: UpdateResearchMetricsRequest }) => taskApi.updateResearchMetrics(data.id, data.payload),
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.detail(variables.id) });
      toast.success(res.message);
    },
  });
};

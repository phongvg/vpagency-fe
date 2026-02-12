import { projectDailyStatsApi } from "@/modules/projectDailyStats/api/projectDailyStats.api";
import type { UpdateProjectDailyStatRequest } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import { projectDailyStatsQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateProjectDailyReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateProjectDailyStatRequest }) =>
      projectDailyStatsApi.updateProjectDailyStats(id, payload),
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({ queryKey: projectDailyStatsQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: projectDailyStatsQueryKeys.lists() });
      toast.success(res.message);
    },
  });
};

import { projectDailyStatsApi } from "@/modules/projectDailyStats/api/projectDailyStats.api";
import type { GenerateProjectDailyStatRequest } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import { projectDailyStatsQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useGenerateProjectDailyReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: GenerateProjectDailyStatRequest) => projectDailyStatsApi.generateProjectDailyStats(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectDailyStatsQueryKeys.lists() });
    },
  });
};

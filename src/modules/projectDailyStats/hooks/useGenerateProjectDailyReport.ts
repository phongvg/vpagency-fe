import { projectDailyStatsApi } from "@/modules/projectDailyStats/api/projectDailyStats.api";
import type { GenerateProjectDailyStatRequest } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import { useMutation } from "@tanstack/react-query";

export const useGenerateProjectDailyReport = () => {
  return useMutation({
    mutationFn: (data: GenerateProjectDailyStatRequest) => projectDailyStatsApi.generateProjectDailyStats(data),
  });
};

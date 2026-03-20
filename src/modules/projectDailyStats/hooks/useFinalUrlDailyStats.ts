import { projectDailyStatsApi } from "@/modules/projectDailyStats/api/projectDailyStats.api";
import type { ProjectDailyStatsListParams } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import { finalUrlDailyStatsQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useFinalUrlDailyStats = (params: ProjectDailyStatsListParams) => {
  return useQuery({
    queryKey: finalUrlDailyStatsQueryKeys.list(params),
    queryFn: () => projectDailyStatsApi.getFinalUrlDailyStats(params),
  });
};

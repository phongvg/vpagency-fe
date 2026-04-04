import { projectDailyStatsApi } from "@/modules/projectDailyStats/api/projectDailyStats.api";
import type { ProjectDailyStatsListParams } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import { projectDailyStatsQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useProjectDailyStatsPending = (params: ProjectDailyStatsListParams, enabled = true) => {
  return useQuery({
    queryKey: projectDailyStatsQueryKeys.pending(params),
    queryFn: () => projectDailyStatsApi.getProjectDailyStatsPending(params),
    select: (res) => res.data,
    enabled,
  });
};

export const useProjectDailyStatsCompleted = (params: ProjectDailyStatsListParams, enabled = true) => {
  return useQuery({
    queryKey: projectDailyStatsQueryKeys.completed(params),
    queryFn: () => projectDailyStatsApi.getProjectDailyStatsCompleted(params),
    select: (res) => res.data,
    enabled,
  });
};

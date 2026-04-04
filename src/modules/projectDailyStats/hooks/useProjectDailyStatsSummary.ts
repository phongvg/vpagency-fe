import { projectDailyStatsApi } from "@/modules/projectDailyStats/api/projectDailyStats.api";
import type { ProjectDailyStatsListParams } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import { projectDailyStatsQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useProjectDailyStatsSummary = (params: ProjectDailyStatsListParams) => {
  return useQuery({
    queryKey: projectDailyStatsQueryKeys.summary(params),
    queryFn: () => projectDailyStatsApi.getProjectDailyStatsSummary(params),
    select: (res) => res.data,
  });
};

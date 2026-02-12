import { projectDailyStatsApi } from "@/modules/projectDailyStats/api/projectDailyStats.api";
import { projectDailyStatsQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useProjectDailyReport = (id: string | null) => {
  return useQuery({
    enabled: !!id,
    queryKey: projectDailyStatsQueryKeys.detail(id as string),
    queryFn: () => projectDailyStatsApi.getProjectDailyStatsById(id as string),
    select: (res) => res.data,
  });
};

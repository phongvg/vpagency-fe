import { projectDailyStatsApi } from "@/modules/projectDailyStats/api/projectDailyStats.api";
import type { FinalUrlDailyStatsListParams } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import { finalUrlDailyStatsQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useFinalUrlStatsSummary = (params: FinalUrlDailyStatsListParams) => {
  return useQuery({
    queryKey: finalUrlDailyStatsQueryKeys.summary(params),
    queryFn: () => projectDailyStatsApi.getFinalUrlDailyStatsSummary(params),
    select: (res) => res.data,
  });
};

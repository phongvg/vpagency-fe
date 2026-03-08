import { dashboardApi } from "@/modules/dashboard/api/dashboard.api";
import { dashboardQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useTopFinalUrlsByCost = (enabled: boolean = false) => {
  return useQuery({
    enabled,
    queryKey: dashboardQueryKeys.topFinalUrlsByCost(),
    queryFn: () => dashboardApi.getTopFinalUrlsByCost(),
    select: (res) => res.data,
  });
};

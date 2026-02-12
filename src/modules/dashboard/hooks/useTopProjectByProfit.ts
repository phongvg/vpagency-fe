import { dashboardApi } from "@/modules/dashboard/api/dashboard.api";
import { dashboardQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useTopProjectByProfit = () => {
  return useQuery({
    queryKey: dashboardQueryKeys.topProjectByProfit(),
    queryFn: () => dashboardApi.getTopProjectsByProfit(),
    select: (res) => res.data,
  });
};

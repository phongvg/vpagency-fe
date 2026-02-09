import { dashboardApi } from "@/modules/dashboard/api/dashboard.api";
import { dashboardQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useMonthlySpendingStats = () => {
  return useQuery({
    queryKey: dashboardQueryKeys.monthlySpendingStats(),
    queryFn: () => dashboardApi.getMonthlySpendingStats(),
    select: (res) => res.data,
  });
};

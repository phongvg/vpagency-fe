import { dashboardApi } from "@/modules/dashboard/api/dashboard.api";
import { dashboardQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useTaskStats = () => {
  return useQuery({
    queryKey: dashboardQueryKeys.taskStats(),
    queryFn: () => dashboardApi.getTaskStats(),
    select: (res) => res.data,
  });
};

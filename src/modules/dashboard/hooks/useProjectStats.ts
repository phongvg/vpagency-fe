import { dashboardApi } from "@/modules/dashboard/api/dashboard.api";
import { dashboardQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useProjectStats = () => {
  return useQuery({
    queryKey: dashboardQueryKeys.projectStats(),
    queryFn: () => dashboardApi.getProjectStats(),
    select: (res) => res.data,
  });
};

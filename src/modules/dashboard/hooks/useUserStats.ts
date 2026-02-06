import { dashboardApi } from "@/modules/dashboard/api/dashboard.api";
import { dashboardQueryKeys } from "@/shared/constants/query-keys.constant";
import { useAuthStore } from "@/shared/stores/auth/useAuthStore";
import { isAdminOrManagerOrAccounting } from "@/shared/utils/permission.util";
import { useQuery } from "@tanstack/react-query";

export const useUserStats = () => {
  const { user } = useAuthStore();

  return useQuery({
    enabled: isAdminOrManagerOrAccounting(user?.roles),
    queryKey: dashboardQueryKeys.userStats(),
    queryFn: () => dashboardApi.getUserStats(),
    select: (res) => res.data,
  });
};

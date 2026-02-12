import { projectDailyStatsApi } from "@/modules/projectDailyStats/api/projectDailyStats.api";
import { projectDailyStatsQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useDeleteProjectDailyReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => projectDailyStatsApi.deleteProjectDailyReport(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: projectDailyStatsQueryKeys.lists() });
      toast.success(res.message);
    },
  });
};

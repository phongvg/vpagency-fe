import { taskApi } from "@/modules/task/api/task.api";
import { taskQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useTasksByStatus = () => {
  return useQuery({
    queryKey: taskQueryKeys.byStatus(),
    queryFn: () => taskApi.getTasksByStatus(),
    select: (res) => res.data,
  });
};

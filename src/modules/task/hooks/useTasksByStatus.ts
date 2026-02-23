import { taskApi } from "@/modules/task/api/task.api";
import { taskQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useTasksByStatus = (taskFilter: "all" | "mine") => {
  return useQuery({
    queryKey: taskQueryKeys.byStatus(taskFilter),
    queryFn: () => taskApi.getTasksByStatus(taskFilter),
    select: (res) => res.data,
  });
};

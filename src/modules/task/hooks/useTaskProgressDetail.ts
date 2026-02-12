import { taskApi } from "@/modules/task/api/task.api";
import { taskQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useTaskProgressDetail = (taskId: string | null) => {
  return useQuery({
    enabled: !!taskId,
    queryKey: taskQueryKeys.taskProgressDetail(taskId),
    queryFn: () => taskApi.getTaskProgressDetail(taskId as string),
    select: (res) => res.data,
  });
};

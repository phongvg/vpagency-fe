import { taskApi } from "@/modules/task/api/task.api";
import type { TaskListParams } from "@/modules/task/types/task.type";
import { taskQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useTasks = (params: TaskListParams) => {
  return useQuery({
    queryKey: taskQueryKeys.list(params),
    queryFn: () => taskApi.getTasks(params),
    select: (res) => res.data,
  });
};

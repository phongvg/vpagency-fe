import { taskApi } from "@/modules/task/api/task.api";
import { taskQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useTaskDetail = (id: string | null | undefined) => {
  return useQuery({
    enabled: !!id,
    queryKey: taskQueryKeys.detail(id as string),
    queryFn: () => taskApi.getTaskById(id as string),
    select: (res) => res.data,
  });
};

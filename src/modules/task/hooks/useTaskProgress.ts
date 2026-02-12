import { taskApi } from "@/modules/task/api/task.api";
import { taskQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useTaskProgress = (id: string | null) => {
  return useQuery({
    enabled: !!id,
    queryKey: taskQueryKeys.progress(id as string),
    queryFn: () => taskApi.getTaskProgress(id as string),
    select: (res) => res.data,
  });
};

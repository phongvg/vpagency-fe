import { projectStatusApi } from "@/modules/projectStatus/api/projectStatus.api";
import { projectStatusQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useProjectStatusDetail = (id: string | null) => {
  return useQuery({
    enabled: !!id,
    queryKey: projectStatusQueryKeys.detail(id!),
    queryFn: () => projectStatusApi.getProjectStatusById(id!),
    select: (res) => res.data,
  });
};

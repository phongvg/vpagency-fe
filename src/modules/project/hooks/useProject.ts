import { projectApi } from "@/modules/project/api/project.api";
import { projectQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useProject = (projectId: string | null) => {
  return useQuery({
    enabled: !!projectId,
    queryKey: projectQueryKeys.detail(projectId!),
    queryFn: () => projectApi.getProjectById(projectId!),
    select: (res) => res.data,
  });
};

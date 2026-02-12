import { projectApi } from "@/modules/project/api/project.api";
import type { ProjectListParams } from "@/modules/project/types/project.type";
import { projectQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useProjects = (params: ProjectListParams) => {
  return useQuery({
    queryKey: projectQueryKeys.list(params),
    queryFn: () => projectApi.getProjects(params),
    select: (res) => res.data,
  });
};

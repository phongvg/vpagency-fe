import { projectTypeApi } from "@/modules/projectType/api/projectType.api";
import type { ProjectTypeListParams } from "@/modules/projectType/types/projectType.type";
import { projectTypeQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useProjectTypes = (params: ProjectTypeListParams) => {
  return useQuery({
    queryKey: projectTypeQueryKeys.list(params),
    queryFn: () => projectTypeApi.getProjectTypes(params),
    select: (res) => res.data,
  });
};

import { projectTypeApi } from "@/modules/projectType/api/projectType.api";
import { projectTypeQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useProjectTypeDetail = (id: string | null) => {
  return useQuery({
    enabled: !!id,
    queryKey: projectTypeQueryKeys.detail(id!),
    queryFn: () => projectTypeApi.getProjectTypeById(id!),
    select: (res) => res.data,
  });
};

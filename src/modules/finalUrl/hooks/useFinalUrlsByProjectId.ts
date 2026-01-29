import { finalUrlApi } from "@/modules/finalUrl/api/final-url.api";
import { finalUrlQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useFinalUrlsByProjectId = (projectId: string) => {
  return useQuery({
    queryKey: finalUrlQueryKeys.listByProject(projectId),
    queryFn: () => finalUrlApi.getFinalUrlsByProjectId(projectId),
    select: (res) => res.data.items,
    enabled: !!projectId,
  });
};

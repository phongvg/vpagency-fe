import { finalUrlApi } from "@/modules/finalUrl/api/final-url.api";
import { finalUrlQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useFinalUrlsByProjectId = (projectId: string | null) => {
  return useQuery({
    enabled: !!projectId,
    queryKey: finalUrlQueryKeys.listByProject(projectId as string),
    queryFn: () => finalUrlApi.getFinalUrlsByProjectId(projectId as string),
    select: (res) => res.data.items,
  });
};

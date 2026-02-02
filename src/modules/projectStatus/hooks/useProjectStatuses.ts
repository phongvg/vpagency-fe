import type { ProjectListParams } from "@/modules/project/types/project.type";
import { projectStatusApi } from "@/modules/projectStatus/api/projectStatus.api";
import { projectStatusQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useProjectStatuses = (params: ProjectListParams) => {
  return useQuery({
    queryKey: projectStatusQueryKeys.list(params),
    queryFn: () => projectStatusApi.getProjectStatuses(params),
    select: (res) => res.data,
  });
};

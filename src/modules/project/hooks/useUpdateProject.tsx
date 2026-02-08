import { projectApi } from "@/modules/project/api/project.api";
import type { UpdateProjectRequest } from "@/modules/project/types/project.type";
import { projectQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProjectRequest }) => projectApi.updateProject(id, data),
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({ queryKey: projectQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: projectQueryKeys.lists() });
      toast.success(res.message);
    },
  });
};

import { projectApi } from "@/modules/project/api/project.api";
import type { UpdateProjectRequest } from "@/modules/project/types/project.type";
import { projectQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProjectRequest) => projectApi.createProject(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: projectQueryKeys.lists() });
      toast.success(res.message);
    },
  });
};

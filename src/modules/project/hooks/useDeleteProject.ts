import { projectApi } from "@/modules/project/api/project.api";
import { projectQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => projectApi.deleteProject(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: projectQueryKeys.lists() });
      toast.success(res.message);
    },
  });
};

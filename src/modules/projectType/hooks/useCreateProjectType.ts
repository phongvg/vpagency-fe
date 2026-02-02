import { projectTypeApi } from "@/modules/projectType/api/projectType.api";
import type { UpdateProjectTypeRequest } from "@/modules/projectType/types/projectType.type";
import { projectTypeQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateProjectType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProjectTypeRequest) => projectTypeApi.createProjectType(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: projectTypeQueryKeys.lists() });
      toast.success(res.message);
    },
  });
};

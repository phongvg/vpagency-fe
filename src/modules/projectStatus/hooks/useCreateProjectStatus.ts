import { projectStatusApi } from "@/modules/projectStatus/api/projectStatus.api";
import type { CreateProjectStatusRequest } from "@/modules/projectStatus/types/projectStatus.type";
import { projectStatusQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateProjectStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectStatusRequest) => projectStatusApi.createProjectStatus(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: projectStatusQueryKeys.lists() });
      toast.success(res.message);
    },
  });
};

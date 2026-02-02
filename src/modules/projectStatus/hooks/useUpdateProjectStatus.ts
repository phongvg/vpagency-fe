import { projectStatusApi } from "@/modules/projectStatus/api/projectStatus.api";
import type { UpdateProjectStatusRequest } from "@/modules/projectStatus/types/projectStatus.type";
import { projectStatusQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateProjectStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; payload: UpdateProjectStatusRequest }) => projectStatusApi.updateProjectStatus(data.id, data.payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: projectStatusQueryKeys.lists() });
      toast.success(res.message);
    },
  });
};

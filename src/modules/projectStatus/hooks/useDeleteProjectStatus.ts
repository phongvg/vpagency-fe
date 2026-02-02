import { projectStatusApi } from "@/modules/projectStatus/api/projectStatus.api";
import { projectStatusQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useDeleteProjectStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => projectStatusApi.deleteProjectStatus(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: projectStatusQueryKeys.lists() });
      toast.success(res.message);
    },
  });
};

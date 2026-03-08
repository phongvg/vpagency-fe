import { taskApi } from "@/modules/task/api/task.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUnassignCampaignMetrics = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) => taskApi.unassignCampaignMetrics(taskId),
    onSuccess: (res) => {
      toast.success(res.message);
    },
  });
};

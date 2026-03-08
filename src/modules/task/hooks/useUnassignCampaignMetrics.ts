import { taskApi } from "@/modules/task/api/task.api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUnassignCampaignMetrics = () => {
  return useMutation({
    mutationFn: (taskId: string) => taskApi.unassignCampaignMetrics(taskId),
    onSuccess: (res) => {
      toast.success(res.message);
    },
  });
};

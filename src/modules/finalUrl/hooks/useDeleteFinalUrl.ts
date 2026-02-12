import { finalUrlApi } from "@/modules/finalUrl/api/final-url.api";
import { finalUrlQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteFinalUrl = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => finalUrlApi.deleteFinalUrl(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: finalUrlQueryKeys.lists() });
      toast.success(res.message);
    },
  });
};

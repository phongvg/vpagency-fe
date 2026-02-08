import { finalUrlApi } from "@/modules/finalUrl/api/final-url.api";
import type { UpdateFinalUrlRequest } from "@/modules/finalUrl/types/finalUrl.type";
import { finalUrlQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateFinalUrl = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateFinalUrlRequest) => finalUrlApi.createFinalUrl(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: finalUrlQueryKeys.lists() });
      toast.success(res.message);
    },
  });
};

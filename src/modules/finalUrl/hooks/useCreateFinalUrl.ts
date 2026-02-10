import { finalUrlApi } from "@/modules/finalUrl/api/final-url.api";
import type { UpdateFinalUrlRequest } from "@/modules/finalUrl/types/finalUrl.type";
import { useMutation } from "@tanstack/react-query";

export const useCreateFinalUrl = () => {
  return useMutation({
    mutationFn: (data: UpdateFinalUrlRequest) => finalUrlApi.createFinalUrl(data),
  });
};

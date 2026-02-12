import { appealAccountApi } from "@/modules/appealAccount/api/appealAccount.api";
import { appealAccountQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useDeleteAppealAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => appealAccountApi.deleteAppealAccount(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: appealAccountQueryKeys.lists() });
      toast.success(res.message);
    },
  });
};

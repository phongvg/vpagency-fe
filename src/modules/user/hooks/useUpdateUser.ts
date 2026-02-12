import { userApi } from "@/modules/user/api/user.api";
import type { UpdateUserRequest } from "@/modules/user/types/user.type";
import { userQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; payload: UpdateUserRequest }) => userApi.updateUser(data.id, data.payload),
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userQueryKeys.detail(variables.id) });
      toast.success(res.message);
    },
  });
};

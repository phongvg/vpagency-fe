import { userApi } from "@/modules/user/api/user.api";
import type { ChangePasswordRequest } from "@/modules/user/types/user.type";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useChangePassword = () => {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: ChangePasswordRequest }) => userApi.changePassword(id, payload),
    onSuccess: (res) => {
      toast.success(res.message);
    },
  });
};

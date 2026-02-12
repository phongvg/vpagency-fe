import { userApi } from "@/modules/user/api/user.api";
import type { UserListParams } from "@/modules/user/types/user.type";
import { userQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useUsers = (params: UserListParams) => {
  return useQuery({
    queryKey: userQueryKeys.list(params),
    queryFn: () => userApi.getUsers(params),
    select: (res) => res.data,
  });
};

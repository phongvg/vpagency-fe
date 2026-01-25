import type { User, UserListParams } from "@/modules/user/types/user.type";
import { http } from "@/shared/libs/http";
import type { ApiBaseListResponse } from "@/shared/types/common/apiResponse.type";
import { convertQueryParams } from "@/shared/utils/common.util";

export const userApi = {
  getUsers: async (params?: UserListParams): Promise<ApiBaseListResponse<User>> => {
    return await http.get(`/admin/users${convertQueryParams(params)}`);
  },
};

import type { ChangePasswordRequest, UpdateUserRequest, User, UserListParams } from "@/modules/user/types/user.type";
import { http } from "@/shared/libs/http";
import type { ApiBaseListResponse, ApiBaseResponse } from "@/shared/types/common/apiResponse.type";
import { convertQueryParams } from "@/shared/utils/common.util";

export const userApi = {
  getUsers: async (params?: UserListParams): Promise<ApiBaseListResponse<User>> => {
    return await http.get(`/admin/users${convertQueryParams(params)}`);
  },

  getUserById: async (id: string): Promise<ApiBaseResponse<User>> => {
    return await http.get(`/admin/users/${id}`);
  },

  updateUserStatus: async (id: string): Promise<ApiBaseResponse<User>> => {
    return await http.post(`/admin/users/${id}/toggle-status`);
  },

  updateUser: async (id: string, payload: UpdateUserRequest): Promise<ApiBaseResponse<User>> => {
    return await http.put(`/admin/users/${id}`, payload);
  },

  changePassword: async (id: string, payload: ChangePasswordRequest): Promise<ApiBaseResponse<null>> => {
    return await http.post(`/admin/users/${id}/reset-password`, payload);
  },
};

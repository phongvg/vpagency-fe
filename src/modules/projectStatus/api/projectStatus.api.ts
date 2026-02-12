import type {
  CreateProjectStatusRequest,
  ProjectStatus,
  ProjectStatusListParams,
  UpdateProjectStatusRequest,
} from "@/modules/projectStatus/types/projectStatus.type";
import { http } from "@/shared/libs/http";
import type { ApiBaseListResponse, ApiBaseResponse } from "@/shared/types/common/apiResponse.type";
import { convertQueryParams } from "@/shared/utils/common.util";

export const projectStatusApi = {
  getProjectStatuses: (params: ProjectStatusListParams): Promise<ApiBaseListResponse<ProjectStatus>> => {
    return http.get(`/project-statuses${convertQueryParams(params)}`);
  },

  getProjectStatusById: (id: string): Promise<ApiBaseResponse<ProjectStatus>> => {
    return http.get(`/project-statuses/${id}`);
  },

  createProjectStatus: (data: CreateProjectStatusRequest): Promise<ApiBaseResponse<ProjectStatus>> => {
    return http.post(`/project-statuses`, data);
  },

  updateProjectStatus: (id: string, data: UpdateProjectStatusRequest): Promise<ApiBaseResponse<ProjectStatus>> => {
    return http.put(`/project-statuses/${id}`, data);
  },

  deleteProjectStatus: (id: string): Promise<ApiBaseResponse<null>> => {
    return http.delete(`/project-statuses/${id}`);
  },
};

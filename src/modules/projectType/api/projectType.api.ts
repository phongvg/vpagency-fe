import type { ProjectType, ProjectTypeListParams, UpdateProjectTypeRequest } from "@/modules/projectType/types/projectType.type";
import { http } from "@/shared/libs/http";
import type { ApiBaseListResponse, ApiBaseResponse } from "@/shared/types/common/apiResponse.type";
import { convertQueryParams } from "@/shared/utils/common.util";

export const projectTypeApi = {
  getProjectTypes: (params: ProjectTypeListParams): Promise<ApiBaseListResponse<ProjectType>> => {
    return http.get(`/project-types${convertQueryParams(params)}`);
  },

  getProjectTypeById: (id: string): Promise<ApiBaseResponse<ProjectType>> => {
    return http.get(`/project-types/${id}`);
  },

  createProjectType: (data: UpdateProjectTypeRequest): Promise<ApiBaseResponse<ProjectType>> => {
    return http.post(`/project-types`, data);
  },

  updateProjectType: (id: string, data: UpdateProjectTypeRequest): Promise<ApiBaseResponse<ProjectType>> => {
    return http.put(`/project-types/${id}`, data);
  },

  deleteProjectType: (id: string): Promise<ApiBaseResponse<null>> => {
    return http.delete(`/project-types/${id}`);
  },
};

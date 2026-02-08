import type { Project, ProjectListParams, UpdateProjectRequest } from "@/modules/project/types/project.type";
import { http } from "@/shared/libs/http";
import type { ApiBaseListResponse, ApiBaseResponse } from "@/shared/types/common/apiResponse.type";
import { convertQueryParams } from "@/shared/utils/common.util";

export const projectApi = {
  getProjects: async (params?: ProjectListParams): Promise<ApiBaseListResponse<Project>> => {
    return await http.get(`/projects${convertQueryParams(params)}`);
  },

  getProjectById: async (projectId: string): Promise<ApiBaseResponse<Project>> => {
    return await http.get(`/projects/${projectId}`);
  },

  createProject: async (payload: UpdateProjectRequest): Promise<ApiBaseResponse<Project>> => {
    return await http.post(`/projects`, payload);
  },

  updateProject: async (projectId: string, payload: UpdateProjectRequest): Promise<ApiBaseResponse<Project>> => {
    return await http.put(`/projects/${projectId}`, payload);
  },

  deleteProject: async (projectId: string): Promise<ApiBaseResponse<null>> => {
    return await http.delete(`/projects/${projectId}`);
  },
};

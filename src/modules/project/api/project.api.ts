import type { Project, ProjectListParams } from "@/modules/project/types/project.type";
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
};

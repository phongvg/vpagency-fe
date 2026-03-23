import type {
  EmployeePerformance,
  EmployeePerformanceParams,
  EmployeeProject,
  EmployeeRanking,
} from "@/modules/employeePerfomance/types/employeePerformance.type";
import { http } from "@/shared/libs/http";
import type { ApiBaseListResponse, ApiBaseResponse } from "@/shared/types/common/apiResponse.type";
import { convertQueryParams } from "@/shared/utils/common.util";

export const employeePerformanceApi = {
  getEmployeePerformance: async (params: EmployeePerformanceParams): Promise<ApiBaseListResponse<EmployeePerformance>> => {
    return await http.get(`/employee-performance${convertQueryParams(params)}`);
  },

  getEmployeeRanking: async (params: EmployeePerformanceParams): Promise<ApiBaseResponse<EmployeeRanking>> => {
    return await http.get(`/employee-performance/ranking${convertQueryParams(params)}`);
  },

  getEmployeeProjects: async (userId: string, params: EmployeePerformanceParams): Promise<ApiBaseResponse<EmployeeProject>> => {
    return await http.get(`/employee-performance/${userId}/projects${convertQueryParams(params)}`);
  },
};

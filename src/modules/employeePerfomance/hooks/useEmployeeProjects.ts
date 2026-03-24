import { employeePerformanceApi } from "@/modules/employeePerfomance/api/employeePerformance.api";
import type { EmployeePerformanceParams } from "@/modules/employeePerfomance/types/employeePerformance.type";
import { employeePerformanceQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useEmployeeProjects = (userId: string, params: EmployeePerformanceParams) => {
  return useQuery({
    enabled: !!userId,
    queryKey: employeePerformanceQueryKeys.projects(userId, params),
    queryFn: () => employeePerformanceApi.getEmployeeProjects(userId, params),
    select: (res) => res.data,
  });
};

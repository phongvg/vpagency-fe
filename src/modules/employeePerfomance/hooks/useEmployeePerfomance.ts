import { employeePerformanceApi } from "@/modules/employeePerfomance/api/employeePerformance.api";
import type { EmployeePerformanceParams } from "@/modules/employeePerfomance/types/employeePerformance.type";
import { employeePerformanceQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useEmployeePerformance = (params: EmployeePerformanceParams) => {
  return useQuery({
    queryKey: employeePerformanceQueryKeys.list(params),
    queryFn: () => employeePerformanceApi.getEmployeePerformance(params),
    select: (res) => res.data,
  });
};

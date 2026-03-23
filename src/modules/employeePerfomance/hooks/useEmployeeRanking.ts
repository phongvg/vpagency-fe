import { employeePerformanceApi } from "@/modules/employeePerfomance/api/employeePerformance.api";
import type { EmployeePerformanceParams } from "@/modules/employeePerfomance/types/employeePerformance.type";
import { employeePerformanceQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useEmployeeRanking = (params: EmployeePerformanceParams) => {
  return useQuery({
    queryKey: employeePerformanceQueryKeys.ranking(params),
    queryFn: () => employeePerformanceApi.getEmployeeRanking(params),
    select: (res) => res.data,
  });
};

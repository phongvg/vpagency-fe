import { employeeComparisonColumnConfig } from "@/modules/dashboard/configs/employee-comparison-column.config";
import { EmployeesMockData } from "@/modules/dashboard/mocks/employees";
import { AppTable } from "@/shared/components/common/AppTable";

export default function EmployeeComparisonTable() {
  return <AppTable columns={employeeComparisonColumnConfig()} data={EmployeesMockData} />;
}

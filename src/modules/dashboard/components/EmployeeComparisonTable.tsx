import { employeeComparisonColumnConfig } from "@/modules/dashboard/configs/employee-comparison-column.config";
import { EmployeesMockData } from "@/modules/dashboard/mocks/employees";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card";
import { AppTable } from "@/shared/components/common/AppTable";

export default function EmployeeComparisonTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tổng quan hiệu suất nhân viên</CardTitle>
      </CardHeader>

      <CardContent className='normal-case'>
        <AppTable columns={employeeComparisonColumnConfig()} data={EmployeesMockData} />
      </CardContent>
    </Card>
  );
}

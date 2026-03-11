import EmployeeProjectTable from "@/modules/dashboard/components/EmployeeDetailTable";
import { EmployeesWithProjects } from "@/modules/dashboard/mocks/employee-projects";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card";

export default function EmployeeProject() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hiệu suất nhân viên theo dự án</CardTitle>
      </CardHeader>

      <CardContent>
        <div className='space-y-4'>
          {EmployeesWithProjects.map((employee) => (
            <EmployeeProjectTable key={employee.id} employee={employee} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

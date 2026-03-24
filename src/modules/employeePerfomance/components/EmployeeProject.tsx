import EmployeeProjectTable from "@/modules/employeePerfomance/components/EmployeeDetailTable";
import { useEmployeeProjects } from "@/modules/employeePerfomance/hooks/useEmployeeProjects";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card";
import { useAuthStore } from "@/shared/stores/auth/useAuthStore";
import { formatDate, startOfMonth } from "date-fns";

export default function EmployeeProject() {
  const { user } = useAuthStore();

  console.log("user", user);

  const { data: employeeProjectsData } = useEmployeeProjects(user?.id as string, {
    dateFrom: formatDate(startOfMonth(new Date()), "yyyy-MM-dd"),
    dateTo: formatDate(new Date(), "yyyy-MM-dd"),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hiệu suất nhân viên theo dự án</CardTitle>
      </CardHeader>

      <CardContent>
        <EmployeeProjectTable employee={employeeProjectsData} />
      </CardContent>
    </Card>
  );
}

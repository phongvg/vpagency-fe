import { appealDetailColumnConfig } from "@/modules/task/configs/appeal-detail-column.config";
import type { TaskAppealDetail } from "@/modules/task/types/task.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { AppTable } from "@/shared/components/common/AppTable";

interface TaskAppealDetailTableProps {
  appealDetails: TaskAppealDetail[];
}

export default function TaskAppealDetailTable({ appealDetails }: TaskAppealDetailTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Danh sách kháng tài khoản</CardTitle>
      </CardHeader>

      <CardContent>
        <AppTable data={appealDetails} columns={appealDetailColumnConfig} />
      </CardContent>
    </Card>
  );
}

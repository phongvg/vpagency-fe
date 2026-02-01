import { researchDetailColumnConfig } from "@/modules/task/configs/research-detail-column.config";
import type { TaskResearchDetail } from "@/modules/task/types/task.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { AppTable } from "@/shared/components/common/AppTable";

interface TaskResearchDetailTableProps {
  researchDetails: TaskResearchDetail[];
  onEdit: (researchDetail: TaskResearchDetail) => void;
  onDelete: (id: string) => void;
}

export default function TaskResearchDetailTable({ researchDetails, onEdit, onDelete }: TaskResearchDetailTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chi tiết kết quả nghiên cứu</CardTitle>
      </CardHeader>

      <CardContent>
        <AppTable data={researchDetails} columns={researchDetailColumnConfig({ onEdit, onDelete })} />
      </CardContent>
    </Card>
  );
}

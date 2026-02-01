import { documentAppealDetailColumnConfig } from "@/modules/task/configs/document-appeal-detail.config";
import type { TaskDocumentAppealDetail } from "@/modules/task/types/task.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { AppTable } from "@/shared/components/common/AppTable";

interface TaskDocumentAppealDetailTableProps {
  documentAppealDetails: TaskDocumentAppealDetail[];
  onEdit: (documentAppealDetail: TaskDocumentAppealDetail) => void;
  onDelete: (id: string) => void;
}

export default function TaskDocumentAppealDetailTable({ documentAppealDetails, onEdit, onDelete }: TaskDocumentAppealDetailTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Danh sách Dự án kháng</CardTitle>
      </CardHeader>

      <CardContent>
        <AppTable data={documentAppealDetails} columns={documentAppealDetailColumnConfig({ onEdit, onDelete })} />
      </CardContent>
    </Card>
  );
}

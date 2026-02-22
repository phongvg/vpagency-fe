import InfoRow from "@/modules/task/components/TaskPanel/InfoRow";
import type { Task } from "@/modules/task/types/task.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { fixedNumber } from "@/shared/utils/common.util";
import { CheckCircle2, FileText, MessageSquareWarning, Percent, XCircle } from "lucide-react";

interface TaskDocumentAppealCardProps {
  task: Task;
}

export default function TaskDocumentAppealCard({ task }: TaskDocumentAppealCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin kháng giấy</CardTitle>
      </CardHeader>

      <CardContent className='space-y-2'>
        <InfoRow label='Số lượng đơn kháng' value={task.numberOfAppealDocuments || 0} icon={<FileText className='w-4 h-4' />} />
        <InfoRow
          label='Tổng số lượng kháng'
          value={task.documentAppealSummary?.totalAppealCount || 0}
          icon={<MessageSquareWarning className='w-4 h-4' />}
        />
        <InfoRow
          label='Tổng số lượng thành công'
          value={task.documentAppealSummary?.totalSuccessCount || 0}
          icon={<CheckCircle2 className='w-4 h-4' />}
        />
        <InfoRow label='Tổng số lượng thất bại' value={task.documentAppealSummary?.totalFailureCount || 0} icon={<XCircle className='w-4 h-4' />} />
        <InfoRow
          label='Tỷ lệ thành công'
          value={fixedNumber(task.documentAppealSummary?.overallSuccessRate || 0) + "%"}
          icon={<Percent className='w-4 h-4' />}
        />
      </CardContent>
    </Card>
  );
}

import InfoRow from "@/modules/task/components/TaskPanel/InfoRow";
import type { Task } from "@/modules/task/types/task.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { fixedNumber } from "@/shared/utils/common.util";

interface TaskAppealCardProps {
  task: Task;
}

export default function TaskAppealCard({ task }: TaskAppealCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin Kháng tài khoản</CardTitle>
      </CardHeader>

      <CardContent className='space-y-2'>
        <InfoRow label='Số lượng tài khoản tạm ngưng' value={task.numberOfSuspendedAccounts || 0} />
        <InfoRow label='Tổng số lượng kháng' value={task.appealSummary?.totalAppealCount || 0} />
        <InfoRow label='Tổng số lượng thành công' value={task.appealSummary?.totalSuccessCount || 0} />
        <InfoRow label='Tổng số lượng thất bại' value={task.appealSummary?.totalFailureCount || 0} />
        <InfoRow label='Tỷ lệ thành công' value={fixedNumber(task.appealSummary?.overallSuccessRate || 0) + "%"} />
      </CardContent>
    </Card>
  );
}

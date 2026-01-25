import InfoRow from "@/modules/task/components/TaskPanel/InfoRow";
import type { Task } from "@/modules/task/types/task.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";

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
        <InfoRow label='Số lượng tài khoản tạm ngưng' value={task.numberOfSuspendedAccounts} />
      </CardContent>
    </Card>
  );
}

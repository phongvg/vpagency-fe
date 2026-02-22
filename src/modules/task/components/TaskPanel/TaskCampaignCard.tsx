import InfoRow from "@/modules/task/components/TaskPanel/InfoRow";
import type { Task } from "@/modules/task/types/task.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { formatDollarAmount } from "@/shared/utils/common.util";
import { CheckCircle, DollarSign, Megaphone, Shield } from "lucide-react";

interface TaskCampaignCardProps {
  task: Task;
}

export default function TaskCampaignCard({ task }: TaskCampaignCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin chiến dịch</CardTitle>
      </CardHeader>

      <CardContent className='space-y-2'>
        <InfoRow label='Số lượng chiến dịch lên' value={task.numberOfCampaigns || 0} icon={<Megaphone className='w-4 h-4' />} />
        <InfoRow label='Số lượng kết quả chiến dịch' value={task.numberOfResultCampaigns || 0} icon={<CheckCircle className='w-4 h-4' />} />
        <InfoRow label='Ngân sách hàng ngày' value={formatDollarAmount(task.dailyBudget || 0)} icon={<DollarSign className='w-4 h-4' />} />
        <InfoRow label='Số lượng tài khoản dự phòng' value={task.numberOfBackupCampaigns || 0} icon={<Shield className='w-4 h-4' />} />
      </CardContent>
    </Card>
  );
}

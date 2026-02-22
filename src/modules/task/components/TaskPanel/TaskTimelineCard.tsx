import InfoRow from "@/modules/task/components/TaskPanel/InfoRow";
import type { Task } from "@/modules/task/types/task.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { formatDate } from "date-fns";
import { CalendarClock, CalendarPlus } from "lucide-react";

interface TaskTimelineCardProps {
  task: Task;
}

export default function TaskTimelineCard({ task }: TaskTimelineCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thời gian</CardTitle>
      </CardHeader>

      <CardContent className='space-y-2'>
        <InfoRow label='Ngày tạo' value={formatDate(task.createdAt, "dd/MM/yyyy HH:mm")} icon={<CalendarPlus className='w-4 h-4' />} />
        <InfoRow label='Ngày cập nhật' value={formatDate(task.updatedAt, "dd/MM/yyyy HH:mm")} icon={<CalendarClock className='w-4 h-4' />} />
      </CardContent>
    </Card>
  );
}

import InfoRow from "@/modules/task/components/TaskPanel/InfoRow";
import type { Task } from "@/modules/task/types/task.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import UserAvatar from "@/shared/components/UserAvatar/UserAvatar";

interface TaskPeopleCardProps {
  task: Task;
}

export default function TaskPeopleCard({ task }: TaskPeopleCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mọi người</CardTitle>
      </CardHeader>

      <CardContent className='space-y-2'>
        <InfoRow label='Người giao việc' value={<UserAvatar data={task.creator} />} />
        <InfoRow label='Người nhận việc' value={<UserAvatar data={task.assignedUsers} />} />
      </CardContent>
    </Card>
  );
}

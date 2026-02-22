import InfoRow from "@/modules/task/components/TaskPanel/InfoRow";
import type { Task } from "@/modules/task/types/task.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import UserAvatar from "@/shared/components/UserAvatar";
import { UserCircle, Users } from "lucide-react";

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
        <InfoRow label='Người giao việc' value={<UserAvatar data={task.creator} />} icon={<UserCircle className='w-4 h-4' />} />
        <InfoRow label='Người nhận việc' value={<UserAvatar data={task.assignedUsers} />} icon={<Users className='w-4 h-4' />} />
      </CardContent>
    </Card>
  );
}

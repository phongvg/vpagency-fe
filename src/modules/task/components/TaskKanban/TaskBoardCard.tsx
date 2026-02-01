import type { Task } from "@/modules/task/types/task.type";
import { TaskTypeColorMap, TaskTypeMap } from "@/modules/task/utils/task.util";
import { Card, CardContent } from "@/shared/components/Card/Card";
import { Badge } from "@/shared/components/ui/badge";
import UserAvatar from "@/shared/components/UserAvatar/UserAvatar";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Calendar } from "lucide-react";

interface TaskBoardCardProps {
  task: Task;
  onClick?: () => void;
}

export default function TaskBoardCard({ task, onClick }: TaskBoardCardProps) {
  return (
    <Card className='hover:shadow-md transition-shadow cursor-pointer' onClick={onClick}>
      <CardContent className='space-y-3 p-4'>
        <div className='flex justify-between items-center gap-2'>
          <Badge variant='outline' className={TaskTypeColorMap[task.type]}>
            {TaskTypeMap[task.type]}
          </Badge>

          <div className='flex items-center gap-1.5 text-muted-foreground text-xs'>
            <Calendar className='w-3 h-3' />
            <span>{format(new Date(task.deadline), "dd/MM/yyyy", { locale: vi })}</span>
          </div>
        </div>

        <h4 className='font-medium text-sm line-clamp-2'>{task.name}</h4>

        {task.assignedUsers && task.assignedUsers.length > 0 && (
          <div className='flex items-center gap-2'>
            <div className='flex -space-x-2'>
              {task.assignedUsers.slice(0, 3).map((user) => (
                <UserAvatar key={user.id} data={user} />
              ))}

              {task.assignedUsers.length > 3 && (
                <div className='flex justify-center items-center border-2 border-border rounded-full w-8 h-8 text-white/50'>
                  <span className='text-xs'>+{task.assignedUsers.length - 3}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

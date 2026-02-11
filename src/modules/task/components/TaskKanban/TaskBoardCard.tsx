import type { Task } from "@/modules/task/types/task.type";
import { getDeadlineInfo } from "@/modules/task/utils/deadline.util";
import { TaskTypeColorMap, TaskTypeMap } from "@/modules/task/utils/task.util";
import { Card, CardContent } from "@/shared/components/Card/Card";
import { Badge } from "@/shared/components/ui/badge";
import UserAvatar from "@/shared/components/UserAvatar";
import { cn } from "@/shared/libs/utils";
import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";

interface TaskBoardCardProps {
  task: Task;
  onClick?: () => void;
}

export default function TaskBoardCard({ task, onClick }: TaskBoardCardProps) {
  const deadlineInfo = getDeadlineInfo(task.deadline);

  return (
    <div className='relative'>
      <div
        className={cn(
          "top-0 bottom-0 left-0 absolute rounded-l-lg w-1 transition-all duration-300",
          deadlineInfo.isOverdue && "bg-red-500",
          deadlineInfo.isUrgent && !deadlineInfo.isOverdue && "bg-orange-500",
          deadlineInfo.isWarning && "bg-yellow-500",
          !deadlineInfo.isOverdue && !deadlineInfo.isUrgent && !deadlineInfo.isWarning && "bg-green-500"
        )}
      />

      <Card
        className={cn(
          "group ml-1 transition-all duration-300 cursor-pointer",
          "hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 hover:scale-[1.02]",
          "animate-in fade-in-50 slide-in-from-bottom-2 duration-500"
        )}
        onClick={onClick}>
        <CardContent className='space-y-3 p-4'>
          <div className='flex justify-between items-center gap-2'>
            <Badge variant='outline' className={cn(TaskTypeColorMap[task.type], "transition-all duration-300 group-hover:scale-110")}>
              {TaskTypeMap[task.type]}
            </Badge>

            <div
              className={cn(
                "flex items-center gap-1.5 px-2 py-1 rounded-full text-xs transition-all duration-300",
                TaskTypeColorMap[task.type],
                deadlineInfo.shouldPulse && "animate-pulse-slow"
              )}>
              {deadlineInfo.isOverdue ? <Clock className='w-3 h-3' /> : <Calendar className='w-3 h-3' />}
              <span className='font-medium'>{deadlineInfo.label}</span>
            </div>
          </div>

          <h4 className='font-medium group-hover:text-primary text-sm line-clamp-2 transition-colors duration-300'>{task.name}</h4>

          <div className='flex justify-between items-center'>
            {task.assignedUsers && task.assignedUsers.length > 0 && (
              <div className='flex items-center gap-2'>
                <div className='flex -space-x-2'>
                  {task.assignedUsers.slice(0, 3).map((user, index) => (
                    <div
                      key={user.id}
                      className='transition-transform group-hover:translate-x-1 duration-300'
                      style={{ transitionDelay: `${index * 50}ms` }}>
                      <UserAvatar data={user} />
                    </div>
                  ))}

                  {task.assignedUsers.length > 3 && (
                    <div className='flex justify-center items-center bg-background border-2 border-border rounded-full w-8 h-8 text-white/50 transition-transform group-hover:translate-x-1 duration-300'>
                      <span className='text-xs'>+{task.assignedUsers.length - 3}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className='text-[10px] text-muted-foreground'>{format(task.deadline, "dd/MM/yyyy")}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

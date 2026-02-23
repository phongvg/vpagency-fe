import { urls } from "@/app/routes/route.constant";
import type { Task, TaskListParams } from "@/modules/task/types/task.type";
import { getDeadlineInfo } from "@/modules/task/utils/deadline.util";
import { TaskTypeBgColorMap, TaskTypeColorMap, TaskTypeMap } from "@/modules/task/utils/task.util";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import AppLoading from "@/shared/components/common/AppLoading";
import AppPagination from "@/shared/components/common/AppPagination";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { useQueryParam } from "@/shared/hooks/useQueryParam";
import { cn } from "@/shared/libs/utils";
import type { Meta } from "@/shared/types/common/apiResponse.type";
import { convertQueryParams } from "@/shared/utils/common.util";
import { Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TaskListPanelProps {
  params: TaskListParams;
  setParams: React.Dispatch<React.SetStateAction<TaskListParams>>;
  tasks: Task[];
  meta: Meta | undefined;
  loading: boolean;
}

export default function TaskListPanel({ params, setParams, tasks, meta, loading }: TaskListPanelProps) {
  const navigate = useNavigate();
  const activeTaskId = useQueryParam("id");

  const onPageChange = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
  };

  const getTaskDetail = (id: string) => {
    navigate(`${urls.root}${urls.task}${convertQueryParams({ id })}`);
  };

  if (loading) return <AppLoading loading={loading} />;

  return (
    <Card className='flex flex-col space-y-4 w-[360px] min-h-[750px]'>
      <CardHeader>
        <CardTitle>Danh sách công việc ({meta?.total || 0})</CardTitle>
      </CardHeader>

      <CardContent className='flex flex-col flex-1 py-0'>
        <ScrollArea className='p-1 border border-border w-full h-full'>
          <ul className='space-y-3'>
            {tasks.map((task, index) => {
              const deadlineInfo = getDeadlineInfo(task.deadline);

              return (
                <li key={task.id} className='relative' style={{ animationDelay: `${index * 50}ms` }}>
                  <div className={cn("top-0 bottom-0 left-0 absolute rounded-l w-1 transition-all duration-300", TaskTypeBgColorMap[task.type])} />

                  <div
                    className={cn(
                      "group space-y-2 p-3 pl-4 rounded transition-all duration-300 cursor-pointer",
                      "hover:shadow-lg hover:shadow-primary/10 hover:scale-[1.02]",
                      "animate-in fade-in-50 slide-in-from-left-2 duration-500",
                      activeTaskId === task.id ? "bg-white/10 shadow-md" : "hover:bg-white/10"
                    )}
                    onClick={() => getTaskDetail(task.id)}
                    title={task.name}>
                    <div className='flex justify-between items-start gap-2'>
                      <h3 className='flex-1 font-semibold text-primary group-hover:text-primary/80 line-clamp-2 transition-colors'>{task.name}</h3>

                      <div
                        className={cn(
                          "flex flex-shrink-0 items-center gap-1 px-2 py-0.5 rounded-full text-[10px] transition-all duration-300",
                          TaskTypeColorMap[task.type],
                          deadlineInfo.shouldPulse && "animate-pulse-slow"
                        )}>
                        {deadlineInfo.isOverdue ? <Clock className='w-3 h-3' /> : <Calendar className='w-3 h-3' />}
                        <span className='font-medium whitespace-nowrap'>{deadlineInfo.label}</span>
                      </div>
                    </div>

                    <p
                      className={cn(
                        "inline-block font-medium text-xs group-hover:scale-105 transition-all duration-300",
                        TaskTypeColorMap[task.type]
                      )}>
                      {TaskTypeMap[task.type]}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </ScrollArea>

        <div className='py-4'>
          <AppPagination page={params.page} onPageChange={onPageChange} totalPages={meta?.totalPages || 1} align='center' />
        </div>
      </CardContent>
    </Card>
  );
}

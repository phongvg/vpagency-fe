import { urls } from "@/app/routes/route.constant";
import type { Task, TaskListParams } from "@/modules/task/types/task.type";
import { TaskTypeColorMap, TaskTypeMap } from "@/modules/task/utils/task.util";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { AppLoading } from "@/shared/components/common/AppLoading";
import AppPagination from "@/shared/components/common/AppPagination/AppPagination";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { useQueryParam } from "@/shared/hooks/useQueryParam";
import { cn } from "@/shared/libs/utils";
import type { Meta } from "@/shared/types/common/apiResponse.type";
import { convertQueryParams } from "@/shared/utils/common.util";
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
    <Card className='flex flex-col space-y-4 w-[360px] h-[760px] max-h-[760px]'>
      <CardHeader>
        <CardTitle>Danh sách công việc ({meta?.total || 0})</CardTitle>
      </CardHeader>

      <CardContent className='flex flex-col flex-1 py-0'>
        <ScrollArea className='p-1 border border-border w-full h-full'>
          <ul className='space-y-4'>
            {tasks.map((task) => (
              <li
                key={task.id}
                className={cn(
                  "space-y-1 p-2 rounded transition-colors cursor-pointer",
                  activeTaskId === task.id ? "bg-white/10" : "hover:bg-white/10"
                )}
                onClick={() => getTaskDetail(task.id)}
                title={task.name}>
                <h3 className='font-semibold text-primary line-clamp-1'>{task.name}</h3>
                <p className={cn("font-medium text-sm", TaskTypeColorMap[task.type])}>{TaskTypeMap[task.type]}</p>
              </li>
            ))}
          </ul>
        </ScrollArea>

        <div className='py-4'>
          <AppPagination page={params.page} onPageChange={onPageChange} totalPages={meta?.totalPages || 1} />
        </div>
      </CardContent>
    </Card>
  );
}

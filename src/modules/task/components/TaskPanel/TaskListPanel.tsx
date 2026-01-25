import { urls } from "@/app/routes/route.constant";
import type { Task, TaskListParams } from "@/modules/task/types/task.type";
import { TaskTypeMap } from "@/modules/task/utils/task.util";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { AppLoading } from "@/shared/components/common/AppLoading";
import AppPagination from "@/shared/components/common/AppPagination/AppPagination";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import type { Meta } from "@/shared/types/common/apiResponse.type";
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

  const onPageChange = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
  };

  const getTaskDetail = (id: string) => {
    navigate(`${urls.root}${urls.task}?id=${id}`);
  };

  if (loading) return <AppLoading loading={loading} />;

  return (
    <Card className='w-[360px] space-y-4'>
      <CardHeader>
        <CardTitle>Danh sách công việc ({meta?.total || 0})</CardTitle>
      </CardHeader>

      <CardContent className='py-0'>
        <ScrollArea className='w-full h-[600px] p-1 border-border border'>
          <ul className='space-y-2'>
            {tasks.map((task) => (
              <li key={task.id} className='p-2 cursor-pointer space-y-1' onClick={() => getTaskDetail(task.id)}>
                <h3 className='font-semibold text-primary line-clamp-1' title={task.name}>
                  {task.name}
                </h3>
                <p className='text-muted-foreground'>{TaskTypeMap[task.type]}</p>
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

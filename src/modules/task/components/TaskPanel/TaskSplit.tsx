import TaskDetailPanel from "@/modules/task/components/TaskPanel/TaskDetailPanel";
import TaskListFilter from "@/modules/task/components/TaskPanel/TaskListFilter";
import TaskListPanel from "@/modules/task/components/TaskPanel/TaskListPanel";
import { useTasks } from "@/modules/task/hooks/useTasks";
import type { TaskListParams } from "@/modules/task/types/task.type";
import { AppButton } from "@/shared/components/common/AppButton";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import type { SelectOption } from "@/shared/types/common/select-option.type";
import { Icon } from "@iconify/react";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface TaskSplitProps {
  onEditTask: (taskId?: string) => void;
}

export default function TaskSplit({ onEditTask }: TaskSplitProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const [params, setParams] = useState<TaskListParams>({
    page: 1,
    limit: 10,
    search: undefined,
    type: undefined,
    status: undefined,
    assignedUserId: undefined,
    creatorId: undefined,
    fromDate: undefined,
    toDate: undefined,
    priority: undefined,
    projectId: undefined,
  });
  const [projectSelect, setProjectSelect] = useState<SelectOption | null>(null);
  const [assignedUserSelect, setAssignedUserSelect] = useState<SelectOption | null>(null);
  const [creatorSelect, setCreatorSelect] = useState<SelectOption | null>(null);

  const { data, isLoading } = useTasks({ ...params });

  const tasks = useMemo(() => data?.items || [], [data]);
  const meta = useMemo(() => data?.meta, [data]);

  const applyFilters = (newParams: Partial<TaskListParams>) => {
    setParams((prev) => ({ ...prev, ...newParams, page: 1 }));

    const searchParams = new URLSearchParams(location.search);
    searchParams.delete("id");
    navigate({ search: searchParams.toString() }, { replace: true });
  };

  return (
    <div className='flex-1 flex flex-col gap-2 h-full'>
      <div className='flex items-center gap-2'>
        <Popover>
          <PopoverTrigger asChild>
            <AppButton variant='outline' size='sm'>
              <Icon icon='tabler:filter' />
              Lọc
            </AppButton>
          </PopoverTrigger>

          <PopoverContent className='p-0'>
            <TaskListFilter
              params={params}
              setParams={applyFilters}
              projectSelect={projectSelect}
              setProjectSelect={setProjectSelect}
              assignedUserSelect={assignedUserSelect}
              setAssignedUserSelect={setAssignedUserSelect}
              creatorSelect={creatorSelect}
              setCreatorSelect={setCreatorSelect}
            />
          </PopoverContent>
        </Popover>

        <AppButton variant='outline' size='sm' onClick={() => onEditTask()}>
          <Icon icon='uil:plus-circle' />
          Tạo mới công việc
        </AppButton>
      </div>

      <div className='flex-1 flex gap-3 h-0 min-h-0'>
        <TaskListPanel params={params} setParams={setParams} tasks={tasks} meta={meta} loading={isLoading} />
        <TaskDetailPanel />
      </div>
    </div>
  );
}

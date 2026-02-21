import TaskDetailPanel from "@/modules/task/components/TaskPanel/TaskDetailPanel";
import TaskListFilter from "@/modules/task/components/TaskPanel/TaskListFilter";
import TaskListPanel from "@/modules/task/components/TaskPanel/TaskListPanel";
import { useTasks } from "@/modules/task/hooks/useTasks";
import type { Task, TaskDocumentAppealDetail, TaskListParams, TaskResearchDetail } from "@/modules/task/types/task.type";
import AppButton from "@/shared/components/common/AppButton";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import type { SelectOption } from "@/shared/types/common/select-option.type";
import { Funnel } from "lucide-react";
import { useMemo, useState } from "react";

interface TaskSplitProps {
  onEdit: (taskId?: string) => void;
  onDelete: (taskId: string) => void;
  onViewProgressDetail: (taskId: string) => void;
  onUpdateProgress: (taskId: string) => void;
  onUpdateAppealMetrics: (task: Task) => void;
  onUpdateDocumentAppealMetrics: (task: Task, documentAppealDetail?: TaskDocumentAppealDetail) => void;
  onUpdateResearchMetrics: (task: Task, researchDetail?: TaskResearchDetail) => void;
}

export default function TaskSplit({
  onEdit,
  onDelete,
  onViewProgressDetail,
  onUpdateProgress,
  onUpdateAppealMetrics,
  onUpdateDocumentAppealMetrics,
  onUpdateResearchMetrics,
}: TaskSplitProps) {
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

  return (
    <div className='flex flex-col flex-1 gap-2 h-full'>
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <AppButton type='button' variant='outline' size='sm'>
              <Funnel />
              Lọc
            </AppButton>
          </PopoverTrigger>

          <PopoverContent className='p-0'>
            <TaskListFilter
              params={params}
              setParams={setParams}
              projectSelect={projectSelect}
              setProjectSelect={setProjectSelect}
              assignedUserSelect={assignedUserSelect}
              setAssignedUserSelect={setAssignedUserSelect}
              creatorSelect={creatorSelect}
              setCreatorSelect={setCreatorSelect}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className='flex flex-1 gap-3 h-0 min-h-0'>
        <TaskListPanel params={params} setParams={setParams} tasks={tasks} meta={meta} loading={isLoading} />
        <TaskDetailPanel
          onEdit={onEdit}
          onDelete={onDelete}
          onViewProgressDetail={onViewProgressDetail}
          onUpdateProgress={onUpdateProgress}
          onUpdateAppealMetrics={onUpdateAppealMetrics}
          onUpdateDocumentAppealMetrics={onUpdateDocumentAppealMetrics}
          onUpdateResearchMetrics={onUpdateResearchMetrics}
        />
      </div>
    </div>
  );
}

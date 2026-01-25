import EmptyTaskDetailPanel from "@/modules/task/components/TaskPanel/EmptyTaskDetailPanel";
import TaskActionButton from "@/modules/task/components/TaskPanel/TaskActionButton";
import TaskAppealCard from "@/modules/task/components/TaskPanel/TaskAppealCard";
import TaskOverviewCard from "@/modules/task/components/TaskPanel/TaskOverviewCard";
import TaskProjectCard from "@/modules/task/components/TaskPanel/TaskProjectCard";
import { useTaskDetail } from "@/modules/task/hooks/useTaskDetail";
import { TaskType } from "@/modules/task/types/task.type";
import { AppLoading } from "@/shared/components/common/AppLoading";
import { useQueryParam } from "@/shared/hooks/useQueryParam";
import { useAuthStore } from "@/shared/stores/auth/useAuthStore";
import { useMemo } from "react";

export default function TaskDetailPanel() {
  const id = useQueryParam("id");
  const { user } = useAuthStore();

  const { data: task, isLoading } = useTaskDetail(id);

  if (isLoading) return <AppLoading loading={isLoading} />;

  if (!task) return <EmptyTaskDetailPanel />;

  const isCampaignTask = useMemo(() => [TaskType.LAUNCH_CAMPAIGN, TaskType.SET_CAMPAIGN, TaskType.NURTURE_ACCOUNT].includes(task.type), [task]);
  const isAppealTask = useMemo(() => task.type === TaskType.APPEAL_ACCOUNT, [task]);
  const isDocumentAppealTask = useMemo(() => task.type === TaskType.DOCUMENT_APPEAL, [task]);
  const isResearchTask = useMemo(() => task.type === TaskType.RESEARCH, [task]);

  return (
    <div className='flex-1'>
      <div className='w-full p-4 border-border border'>
        <div className='space-y-2 mb-6'>
          <h2 className='text-xl font-semibold mb-4 line-clamp-2 uppercase' title={task?.name}>
            {task?.name}
          </h2>

          <TaskActionButton
            isCampaignTask={isCampaignTask}
            isAppealTask={isAppealTask}
            isDocumentAppealTask={isDocumentAppealTask}
            isResearchTask={isResearchTask}
            userRoles={user?.roles || []}
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <TaskOverviewCard task={task} />

          {isCampaignTask && <TaskProjectCard task={task} />}

          {isAppealTask && <TaskAppealCard task={task} />}
        </div>
      </div>
    </div>
  );
}

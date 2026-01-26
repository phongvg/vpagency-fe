import EmptyTaskDetailPanel from "@/modules/task/components/TaskPanel/EmptyTaskDetailPanel";
import TaskActionButton from "@/modules/task/components/TaskPanel/TaskActionButton";
import TaskAppealCard from "@/modules/task/components/TaskPanel/TaskAppealCard";
import TaskCampaignCard from "@/modules/task/components/TaskPanel/TaskCampaignCard";
import TaskDocumentAppealCard from "@/modules/task/components/TaskPanel/TaskDocumentAppealCard";
import TaskFinalUrlTable from "@/modules/task/components/TaskPanel/TaskFinalUrlTable";
import TaskOverviewCard from "@/modules/task/components/TaskPanel/TaskOverviewCard";
import TaskPeopleCard from "@/modules/task/components/TaskPanel/TaskPeopleCard";
import TaskProjectCard from "@/modules/task/components/TaskPanel/TaskProjectCard";
import TaskTimelineCard from "@/modules/task/components/TaskPanel/TaskTimelineCard";
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

        <div className='grid grid-cols-1 md:grid-cols-2'>
          <TaskOverviewCard task={task} />
          <div>
            <TaskPeopleCard task={task} />
            <TaskTimelineCard task={task} />
          </div>

          {/* Thông tin chiến dịch */}
          {isCampaignTask && <TaskCampaignCard task={task} />}

          {/* Thông tin dự án */}
          {isCampaignTask && <TaskProjectCard task={task} />}

          {/* Thông tin URL cuối */}
          {isCampaignTask && (
            <div className='col-span-2'>
              <TaskFinalUrlTable finalUrls={task.finalUrls} />
            </div>
          )}

          {/* Thông tin kháng tài khoản */}
          {isAppealTask && <TaskAppealCard task={task} />}

          {/* Thông tin kháng giấy */}
          {isDocumentAppealTask && <TaskDocumentAppealCard task={task} />}
        </div>
      </div>
    </div>
  );
}

import EmptyTaskDetailPanel from "@/modules/task/components/TaskPanel/EmptyTaskDetailPanel";
import TaskActionButton from "@/modules/task/components/TaskPanel/TaskActionButton";
import TaskAppealCard from "@/modules/task/components/TaskPanel/TaskAppealCard";
import TaskAppealDetailTable from "@/modules/task/components/TaskPanel/TaskAppealDetailTable";
import TaskAppealProjectTable from "@/modules/task/components/TaskPanel/TaskAppealProjectTable";
import TaskCampaignCard from "@/modules/task/components/TaskPanel/TaskCampaignCard";
import TaskDocumentAppealCard from "@/modules/task/components/TaskPanel/TaskDocumentAppealCard";
import TaskFinalUrlTable from "@/modules/task/components/TaskPanel/TaskFinalUrlTable";
import TaskOverviewCard from "@/modules/task/components/TaskPanel/TaskOverviewCard";
import TaskPeopleCard from "@/modules/task/components/TaskPanel/TaskPeopleCard";
import TaskProjectCard from "@/modules/task/components/TaskPanel/TaskProjectCard";
import TaskResearchDetailTable from "@/modules/task/components/TaskPanel/TaskResearchDetailTable";
import TaskTimelineCard from "@/modules/task/components/TaskPanel/TaskTimelineCard";
import { useTaskDetail } from "@/modules/task/hooks/useTaskDetail";
import { TaskType } from "@/modules/task/types/task.type";

import { AppLoading } from "@/shared/components/common/AppLoading";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { useQueryParam } from "@/shared/hooks/useQueryParam";
import { useAuthStore } from "@/shared/stores/auth/useAuthStore";
import { Fragment, useMemo } from "react";

interface TaskDetailPanelProps {
  onEdit: (taskId?: string) => void;
}

export default function TaskDetailPanel({ onEdit }: TaskDetailPanelProps) {
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
    <div className='flex-1 flex flex-col border-border border p-1 h-full min-h-0'>
      <ScrollArea className='flex-1 h-full min-h-0'>
        <div className='p-4 flex flex-col'>
          <div className='space-y-2 mb-6'>
            <h2 className='text-xl font-semibold mb-4 line-clamp-2 uppercase' title={task.name}>
              {task.name}
            </h2>

            <TaskActionButton
              isCampaignTask={isCampaignTask}
              isAppealTask={isAppealTask}
              isDocumentAppealTask={isDocumentAppealTask}
              isResearchTask={isResearchTask}
              userRoles={user?.roles || []}
              onEdit={() => onEdit(task.id)}
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <TaskOverviewCard task={task} />

            <div>
              <TaskPeopleCard task={task} />
              <TaskTimelineCard task={task} />
            </div>

            {isCampaignTask && (
              <Fragment>
                {/* Thông tin chiến dịch */}
                <TaskCampaignCard task={task} />

                {/* Thông tin dự án */}
                <TaskProjectCard task={task} />

                {/* Thông tin URL cuối */}
                <div className='col-span-2'>
                  <TaskFinalUrlTable finalUrls={task.finalUrls} />
                </div>
              </Fragment>
            )}

            {isAppealTask && (
              <Fragment>
                {/* Thông tin kháng tài khoản */}
                <TaskAppealCard task={task} />

                {/* Chi tiết kháng */}
                <div className='col-span-2'>
                  <TaskAppealDetailTable appealDetails={task.appealDetails ?? []} />
                </div>
              </Fragment>
            )}

            {isDocumentAppealTask && (
              <Fragment>
                {/* Thông tin kháng giấy */}
                <TaskDocumentAppealCard task={task} />

                {/* Danh sách dự án kháng */}
                <div className='col-span-2'>
                  <TaskAppealProjectTable projects={task.projects ?? []} />
                </div>
              </Fragment>
            )}

            {isResearchTask && (
              <Fragment>
                {/* Chi tiết nghiên cứu */}
                <div className='col-span-2'>
                  <TaskResearchDetailTable researchDetails={task.researchDetails ?? []} />
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

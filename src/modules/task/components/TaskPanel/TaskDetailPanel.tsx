import EmptyTaskDetailPanel from "@/modules/task/components/TaskPanel/EmptyTaskDetailPanel";
import TaskActionButton from "@/modules/task/components/TaskPanel/TaskActionButton";
import TaskAppealCard from "@/modules/task/components/TaskPanel/TaskAppealCard";
import TaskAppealDetailTable from "@/modules/task/components/TaskPanel/TaskAppealDetailTable";
import TaskAppealProjectTable from "@/modules/task/components/TaskPanel/TaskAppealProjectTable";
import TaskCampaignCard from "@/modules/task/components/TaskPanel/TaskCampaignCard";
import TaskDocumentAppealCard from "@/modules/task/components/TaskPanel/TaskDocumentAppealCard";
import TaskDocumentAppealDetailTable from "@/modules/task/components/TaskPanel/TaskDocumentAppealDetailTable";
import TaskFinalUrlTable from "@/modules/task/components/TaskPanel/TaskFinalUrlTable";
import TaskOverviewCard from "@/modules/task/components/TaskPanel/TaskOverviewCard";
import TaskPeopleCard from "@/modules/task/components/TaskPanel/TaskPeopleCard";
import TaskProjectCard from "@/modules/task/components/TaskPanel/TaskProjectCard";
import TaskResearchDetailTable from "@/modules/task/components/TaskPanel/TaskResearchDetailTable";
import TaskTimelineCard from "@/modules/task/components/TaskPanel/TaskTimelineCard";
import { useDeleteDocumentAppealDetail } from "@/modules/task/hooks/useDeleteDocumentAppealDetail";
import { useDeleteResearchDetail } from "@/modules/task/hooks/useDeleteResearchDetail";
import { useTaskDetail } from "@/modules/task/hooks/useTaskDetail";
import { TaskType, type Task, type TaskDocumentAppealDetail, type TaskResearchDetail } from "@/modules/task/types/task.type";

import { AppLoading } from "@/shared/components/common/AppLoading";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { useConfirm } from "@/shared/contexts/ConfirmContext";
import { useQueryParam } from "@/shared/hooks/useQueryParam";
import { useAuthStore } from "@/shared/stores/auth/useAuthStore";
import { Fragment, useMemo } from "react";

interface TaskDetailPanelProps {
  taskId?: string | null;
  onEdit: (taskId?: string) => void;
  onDelete: (taskId: string) => void;
  onViewProgressDetail: (taskId: string) => void;
  onUpdateProgress: (taskId: string) => void;
  onUpdateAppealMetrics: (task: Task) => void;
  onUpdateDocumentAppealMetrics: (task: Task, documentAppealDetail?: TaskDocumentAppealDetail) => void;
  onUpdateResearchMetrics: (task: Task, researchDetail?: TaskResearchDetail) => void;
}

export default function TaskDetailPanel({
  onEdit,
  onDelete,
  onViewProgressDetail,
  onUpdateProgress,
  onUpdateAppealMetrics,
  onUpdateDocumentAppealMetrics,
  onUpdateResearchMetrics,
  taskId,
}: TaskDetailPanelProps) {
  const { confirm } = useConfirm();

  const queryId = useQueryParam("id");
  const { user } = useAuthStore();

  const id = taskId ?? queryId;
  const { data: task, isLoading } = useTaskDetail(id);

  const deleteResearchDetail = useDeleteResearchDetail();
  const deleteDocumentAppealDetail = useDeleteDocumentAppealDetail();

  const handleDeleteResearchDetail = async (researchDetailId: string) => {
    if (!task) return;

    const isConfirmed = await confirm({
      title: "Xác nhận xóa",
      description: "Bạn có chắc chắn muốn xóa chi tiết nghiên cứu này không?",
      confirmText: "Xóa",
    });

    if (isConfirmed) {
      await deleteResearchDetail.mutateAsync({ taskId: task.id, id: researchDetailId });
    }
  };

  const handleDeleteDocumentAppealDetail = async (documentAppealDetailId: string) => {
    if (!task) return;

    const isConfirmed = await confirm({
      title: "Xác nhận xóa",
      description: "Bạn có chắc chắn muốn xóa chi tiết kháng giấy này không?",
      confirmText: "Xóa",
    });

    if (isConfirmed) {
      await deleteDocumentAppealDetail.mutateAsync({ taskId: task.id, id: documentAppealDetailId });
    }
  };

  if (isLoading) return <AppLoading loading={isLoading} />;

  if (!task) return <EmptyTaskDetailPanel />;

  const isCampaignTask = useMemo(() => [TaskType.LAUNCH_CAMPAIGN, TaskType.SET_CAMPAIGN, TaskType.NURTURE_ACCOUNT].includes(task.type), [task]);
  const isAppealTask = useMemo(() => task.type === TaskType.APPEAL_ACCOUNT, [task]);
  const isDocumentAppealTask = useMemo(() => task.type === TaskType.DOCUMENT_APPEAL, [task]);
  const isResearchTask = useMemo(() => task.type === TaskType.RESEARCH, [task]);

  return (
    <div className='flex flex-col flex-1 p-1 border border-border h-full min-h-0'>
      <ScrollArea className='flex-1 h-full min-h-0'>
        <div className='flex flex-col p-4'>
          <div className='space-y-2 mb-6'>
            <h2 className='mb-4 font-semibold text-xl uppercase line-clamp-2' title={task.name}>
              {task.name}
            </h2>

            <TaskActionButton
              isCampaignTask={isCampaignTask}
              isAppealTask={isAppealTask}
              isDocumentAppealTask={isDocumentAppealTask}
              isResearchTask={isResearchTask}
              userRoles={user?.roles || []}
              onEdit={() => onEdit(task.id)}
              onDelete={() => onDelete(task.id)}
              onViewProgressDetail={() => onViewProgressDetail(task.id)}
              onUpdateProgress={() => onUpdateProgress(task.id)}
              onUpdateAppealMetrics={() => onUpdateAppealMetrics(task)}
              onUpdateDocumentAppealMetrics={() => onUpdateDocumentAppealMetrics(task)}
              onUpdateResearchMetrics={() => onUpdateResearchMetrics(task)}
            />
          </div>

          <div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
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

                {/* Chi tiết kháng giấy */}
                <div className='col-span-2'>
                  <TaskDocumentAppealDetailTable
                    documentAppealDetails={task.documentAppealDetails ?? []}
                    onEdit={(documentAppealDetail) => onUpdateDocumentAppealMetrics(task, documentAppealDetail)}
                    onDelete={handleDeleteDocumentAppealDetail}
                  />
                </div>
              </Fragment>
            )}

            {isResearchTask && (
              <Fragment>
                {/* Chi tiết nghiên cứu */}
                <div className='col-span-2'>
                  <TaskResearchDetailTable
                    researchDetails={task.researchDetails ?? []}
                    onEdit={(researchDetail) => onUpdateResearchMetrics(task, researchDetail)}
                    onDelete={handleDeleteResearchDetail}
                  />
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

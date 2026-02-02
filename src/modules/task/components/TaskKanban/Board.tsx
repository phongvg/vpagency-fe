import TaskBoardCard from "@/modules/task/components/TaskKanban/TaskBoardCard";
import TaskDetailModal from "@/modules/task/components/TaskKanban/TaskDetailModal";
import { useTaskDragDrop } from "@/modules/task/hooks/useTaskDragDrop";
import { useTasksByStatus } from "@/modules/task/hooks/useTasksByStatus";
import { TaskStatus, type Task, type TaskDocumentAppealDetail, type TaskResearchDetail } from "@/modules/task/types/task.type";
import { TaskStatusMap } from "@/modules/task/utils/task.util";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { AppLoading } from "@/shared/components/common/AppLoading";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { Fragment, useMemo, useState } from "react";

const STATUS_COLUMNS: readonly { status: TaskStatus; label: string }[] = [
  { status: TaskStatus.PENDING, label: TaskStatusMap[TaskStatus.PENDING] },
  { status: TaskStatus.IN_PROGRESS, label: TaskStatusMap[TaskStatus.IN_PROGRESS] },
  { status: TaskStatus.COMPLETED, label: TaskStatusMap[TaskStatus.COMPLETED] },
  { status: TaskStatus.CANCELLED, label: TaskStatusMap[TaskStatus.CANCELLED] },
] as const;

interface BoardProps {
  onEdit: (taskId?: string) => void;
  onDelete: (taskId: string) => void;
  onUpdateProgress: (taskId: string) => void;
  onUpdateAppealMetrics: (task: Task) => void;
  onUpdateDocumentAppealMetrics: (task: Task, documentAppealDetail?: TaskDocumentAppealDetail) => void;
  onUpdateResearchMetrics: (task: Task, researchDetail?: TaskResearchDetail) => void;
}

export default function Board({
  onEdit,
  onDelete,
  onUpdateProgress,
  onUpdateAppealMetrics,
  onUpdateDocumentAppealMetrics,
  onUpdateResearchMetrics,
}: BoardProps) {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const { data: tasksByStatus, isLoading } = useTasksByStatus();
  const { draggingTaskId, handleDragStart, handleDragOver, handleDrop, handleDragEnd } = useTaskDragDrop();

  const statusCounts = useMemo(() => {
    if (!tasksByStatus) return {};

    return {
      [TaskStatus.PENDING]: tasksByStatus.PENDING?.length || 0,
      [TaskStatus.IN_PROGRESS]: tasksByStatus.IN_PROGRESS?.length || 0,
      [TaskStatus.COMPLETED]: tasksByStatus.COMPLETED?.length || 0,
      [TaskStatus.CANCELLED]: tasksByStatus.CANCELLED?.length || 0,
    };
  }, [tasksByStatus]);

  const handleOpenTaskDetail = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsDetailModalOpen(true);
  };

  const handleCloseTaskDetail = () => {
    setSelectedTaskId(null);
    setIsDetailModalOpen(false);
  };

  if (isLoading) return <AppLoading loading={isLoading} />;

  return (
    <Fragment>
      <div className='gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
        {STATUS_COLUMNS.map(({ status, label }) => {
          const tasks = tasksByStatus?.[status as keyof typeof tasksByStatus] || [];
          const count = statusCounts[status] || 0;

          return (
            <Card key={status} className='flex flex-col h-[calc(100vh-12rem)]' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, status)}>
              <CardHeader className='pb-3'>
                <CardTitle className='flex justify-between items-center'>
                  <span>{label}</span>
                  <span className='font-normal text-muted-foreground text-sm'>({count})</span>
                </CardTitle>
              </CardHeader>

              <CardContent className='flex-1 p-3 min-h-0'>
                <ScrollArea className='h-full'>
                  <div className='space-y-3'>
                    {tasks.length > 0 ? (
                      tasks.map((task) => (
                        <div
                          key={task.id}
                          draggable
                          onDragStart={() => handleDragStart(task.id, status)}
                          onDragEnd={handleDragEnd}
                          className={draggingTaskId === task.id ? "opacity-50" : ""}>
                          <TaskBoardCard task={task} onClick={() => handleOpenTaskDetail(task.id)} />
                        </div>
                      ))
                    ) : (
                      <div className='py-8 text-white/50 text-center'>Không có task nào</div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <TaskDetailModal
        open={isDetailModalOpen}
        onClose={handleCloseTaskDetail}
        taskId={selectedTaskId}
        onEdit={onEdit}
        onDelete={onDelete}
        onUpdateProgress={onUpdateProgress}
        onUpdateAppealMetrics={onUpdateAppealMetrics}
        onUpdateDocumentAppealMetrics={onUpdateDocumentAppealMetrics}
        onUpdateResearchMetrics={onUpdateResearchMetrics}
      />
    </Fragment>
  );
}

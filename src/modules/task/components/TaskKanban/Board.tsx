import { urls } from "@/app/routes/route.constant";
import TaskBoardCard from "@/modules/task/components/TaskKanban/TaskBoardCard";
import TaskDetailModal from "@/modules/task/components/TaskKanban/TaskDetailModal";
import { useTaskDragDrop } from "@/modules/task/hooks/useTaskDragDrop";
import { useTasksByStatus } from "@/modules/task/hooks/useTasksByStatus";
import { TaskStatus, type Task, type TaskDocumentAppealDetail, type TaskResearchDetail } from "@/modules/task/types/task.type";
import { TaskStatusMap } from "@/modules/task/utils/task.util";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { AppLoading } from "@/shared/components/common/AppLoading";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { cn } from "@/shared/libs/utils";
import { Fragment, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

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

  const handleViewProgress = (taskId: string) => {
    handleCloseTaskDetail();
    navigate(`/${urls.taskProgress}?id=${taskId}`);
  };

  if (isLoading) return <AppLoading loading={isLoading} />;

  return (
    <Fragment>
      <div className='gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
        {STATUS_COLUMNS.map(({ status, label }, columnIndex) => {
          const tasks = tasksByStatus?.[status as keyof typeof tasksByStatus] || [];
          const count = statusCounts[status] || 0;

          return (
            <Card
              key={status}
              className={cn(
                "flex flex-col h-[calc(100vh-12rem)] transition-all duration-300",
                "animate-in fade-in-50 slide-in-from-bottom-4",
                draggingTaskId && "hover:ring-2 hover:ring-primary/50 hover:shadow-lg"
              )}
              style={{ animationDelay: `${columnIndex * 100}ms` }}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, status)}>
              <CardHeader className='pb-3'>
                <CardTitle className='flex justify-between items-center'>
                  <span>{label}</span>
                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-full font-normal text-sm transition-all duration-300",
                      "bg-primary/10 text-primary",
                      count > 0 && "animate-in zoom-in-50"
                    )}>
                    {count}
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent className='flex-1 p-3 min-h-0'>
                <ScrollArea className='h-full'>
                  <div className='space-y-3'>
                    {tasks.length > 0 ? (
                      tasks.map((task, index) => (
                        <div
                          key={task.id}
                          draggable
                          onDragStart={() => handleDragStart(task.id, status)}
                          onDragEnd={handleDragEnd}
                          className={cn("transition-all duration-300", draggingTaskId === task.id && "opacity-50 scale-95 rotate-2")}
                          style={{ animationDelay: `${index * 50}ms` }}>
                          <TaskBoardCard task={task} onClick={() => handleOpenTaskDetail(task.id)} />
                        </div>
                      ))
                    ) : (
                      <div className='py-8 text-white/50 text-sm text-center animate-in duration-700 fade-in-50'>Không có task nào</div>
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
        onViewProgressDetail={handleViewProgress}
        onUpdateProgress={onUpdateProgress}
        onUpdateAppealMetrics={onUpdateAppealMetrics}
        onUpdateDocumentAppealMetrics={onUpdateDocumentAppealMetrics}
        onUpdateResearchMetrics={onUpdateResearchMetrics}
      />
    </Fragment>
  );
}

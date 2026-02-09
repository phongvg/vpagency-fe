import { urls } from "@/app/routes/route.constant";
import EditTaskModal from "@/modules/task/components/EditTaskModal";
import Board from "@/modules/task/components/TaskKanban/Board";
import TaskSplit from "@/modules/task/components/TaskPanel/TaskSplit";
import UpdateProgressTask from "@/modules/task/components/TaskProgress/UpdateProgressTask";
import UpdateAppealMetricsModal from "@/modules/task/components/UpdateAppealMetricsModal";
import UpdateDocumentAppealMetricsModal from "@/modules/task/components/UpdateDocumentAppealMetricsModal";
import UpdateResearchMetricsModal from "@/modules/task/components/UpdateResearchMetricsModal";
import { useDeleteTask } from "@/modules/task/hooks/useDeleteTask";
import type { Task, TaskDocumentAppealDetail, TaskResearchDetail } from "@/modules/task/types/task.type";
import { AppButton } from "@/shared/components/common/AppButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { useConfirm } from "@/shared/contexts/ConfirmContext";
import { cn } from "@/shared/libs/utils";
import { ClipboardPlus } from "lucide-react";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

const TABS = [
  { value: "split", label: "Danh sách" },
  { value: "kanban", label: "Bảng Kanban" },
];

export default function TaskListPage() {
  const [tabValue, setTabValue] = useState<string>(TABS[0].value);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isUpdateProgressOpen, setUpdateProgressOpen] = useState(false);
  const [isUpdateAppealMetricsOpen, setUpdateAppealMetricsOpen] = useState(false);
  const [isUpdateDocumentAppealMetricsOpen, setUpdateDocumentAppealMetricsOpen] = useState(false);
  const [isUpdateResearchMetricsOpen, setUpdateResearchMetricsOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedResearchDetail, setSelectedResearchDetail] = useState<TaskResearchDetail | null>(null);
  const [selectedDocumentAppealDetail, setSelectedDocumentAppealDetail] = useState<TaskDocumentAppealDetail | null>(null);

  const navigate = useNavigate();

  const { confirm } = useConfirm();

  const deleteTask = useDeleteTask();

  const handleDeleteTask = async (taskId: string) => {
    const confirmed = await confirm({
      title: "Xóa công việc",
      description: "Bạn có chắc chắn muốn xóa công việc này không? Hành động này không thể hoàn tác.",
      confirmText: "Xóa",
    });

    if (confirmed) {
      await deleteTask.mutateAsync(taskId, {
        onSuccess: () => {
          navigate(urls.root + urls.task);
        },
      });
    }
  };

  const handleOpenEditModal = (taskId?: string) => {
    setSelectedTaskId(taskId ?? null);
    setEditModalOpen(true);
  };

  const handleOpenUpdateProgress = (taskId: string) => {
    setSelectedTaskId(taskId);
    setUpdateProgressOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelectedTaskId(null);
    setEditModalOpen(false);
  };

  const handleCloseUpdateProgress = () => {
    setSelectedTaskId(null);
    setUpdateProgressOpen(false);
  };

  const handleOpenAppealMetricsModal = (task: Task) => {
    setSelectedTask(task);
    setUpdateAppealMetricsOpen(true);
  };

  const handleCloseAppealMetricsModal = () => {
    setSelectedTask(null);
    setUpdateAppealMetricsOpen(false);
  };

  const handleOpenDocumentAppealMetricsModal = (task: Task, documentAppealDetail?: TaskDocumentAppealDetail) => {
    setSelectedTask(task);
    setSelectedDocumentAppealDetail(documentAppealDetail ?? null);
    setUpdateDocumentAppealMetricsOpen(true);
  };

  const handleCloseDocumentAppealMetricsModal = () => {
    setSelectedTask(null);
    setSelectedDocumentAppealDetail(null);
    setUpdateDocumentAppealMetricsOpen(false);
  };

  const handleOpenResearchMetricsModal = (task: Task, researchDetail?: TaskResearchDetail) => {
    setSelectedTask(task);
    setSelectedResearchDetail(researchDetail ?? null);
    setUpdateResearchMetricsOpen(true);
  };

  const handleCloseResearchMetricsModal = () => {
    setSelectedTask(null);
    setSelectedResearchDetail(null);
    setUpdateResearchMetricsOpen(false);
  };

  const handleViewProgress = (taskId: string) => {
    navigate(`/${urls.taskProgress}?id=${taskId}`);
  };

  return (
    <Fragment>
      <Tabs value={tabValue} onValueChange={setTabValue} className='flex flex-col h-full'>
        <div className='flex justify-between items-center'>
          <TabsList>
            {TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <AppButton variant='outline' size='sm' onClick={() => handleOpenEditModal()}>
            <ClipboardPlus />
            Tạo mới công việc
          </AppButton>
        </div>

        <TabsContent value={TABS[0].value} className={cn(tabValue === TABS[0].value && "flex flex-col flex-1 h-0")}>
          <TaskSplit
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteTask}
            onViewProgressDetail={handleViewProgress}
            onUpdateProgress={handleOpenUpdateProgress}
            onUpdateAppealMetrics={handleOpenAppealMetricsModal}
            onUpdateDocumentAppealMetrics={handleOpenDocumentAppealMetricsModal}
            onUpdateResearchMetrics={handleOpenResearchMetricsModal}
          />
        </TabsContent>

        <TabsContent value={TABS[1].value} className={cn(tabValue === TABS[1].value && "flex flex-col flex-1 h-0")}>
          <Board
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteTask}
            onUpdateProgress={handleOpenUpdateProgress}
            onUpdateAppealMetrics={handleOpenAppealMetricsModal}
            onUpdateDocumentAppealMetrics={handleOpenDocumentAppealMetricsModal}
            onUpdateResearchMetrics={handleOpenResearchMetricsModal}
          />
        </TabsContent>
      </Tabs>

      <EditTaskModal open={isEditModalOpen} onClose={handleCloseEditModal} taskId={selectedTaskId} />

      <UpdateProgressTask open={isUpdateProgressOpen} onClose={handleCloseUpdateProgress} taskId={selectedTaskId} />

      <UpdateAppealMetricsModal open={isUpdateAppealMetricsOpen} onClose={handleCloseAppealMetricsModal} task={selectedTask} />

      <UpdateDocumentAppealMetricsModal
        open={isUpdateDocumentAppealMetricsOpen}
        onClose={handleCloseDocumentAppealMetricsModal}
        task={selectedTask}
        documentAppealDetail={selectedDocumentAppealDetail}
      />

      <UpdateResearchMetricsModal
        open={isUpdateResearchMetricsOpen}
        onClose={handleCloseResearchMetricsModal}
        task={selectedTask}
        researchDetail={selectedResearchDetail}
      />
    </Fragment>
  );
}

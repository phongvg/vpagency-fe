import TaskDetailPanel from "@/modules/task/components/TaskPanel/TaskDetailPanel";
import type { Task } from "@/modules/task/types/task.type";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";

interface TaskDetailModalProps {
  open: boolean;
  onClose: () => void;
  taskId: string | null;
  onEdit: (taskId?: string) => void;
  onDelete: (taskId: string) => void;
  onUpdateProgress: (taskId: string) => void;
  onUpdateAppealMetrics: (Task: Task) => void;
  onUpdateDocumentAppealMetrics: (Task: Task) => void;
  onUpdateResearchMetrics: (Task: Task) => void;
}

export default function TaskDetailModal({
  open,
  onClose,
  taskId,
  onEdit,
  onDelete,
  onUpdateProgress,
  onUpdateAppealMetrics,
  onUpdateDocumentAppealMetrics,
  onUpdateResearchMetrics,
}: TaskDetailModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='p-0 w-full max-w-full sm:max-w-5xl lg:max-w-7xl h-[90vh]'>
        <TaskDetailPanel
          onEdit={onEdit}
          onDelete={onDelete}
          onUpdateProgress={onUpdateProgress}
          onUpdateAppealMetrics={onUpdateAppealMetrics}
          onUpdateDocumentAppealMetrics={onUpdateDocumentAppealMetrics}
          onUpdateResearchMetrics={onUpdateResearchMetrics}
          taskId={taskId}
        />
      </DialogContent>
    </Dialog>
  );
}

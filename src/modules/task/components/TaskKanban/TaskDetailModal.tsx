import TaskDetailPanel from "@/modules/task/components/TaskPanel/TaskDetailPanel";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";

interface TaskDetailModalProps {
  open: boolean;
  onClose: () => void;
  taskId: string | null;
  onEdit: (taskId?: string) => void;
  onUpdateProgress: (taskId: string) => void;
}

export default function TaskDetailModal({ open, onClose, taskId, onEdit, onUpdateProgress }: TaskDetailModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='p-0 w-full max-w-full sm:max-w-5xl lg:max-w-7xl h-[90vh]'>
        <TaskDetailPanel onEdit={onEdit} onUpdateProgress={onUpdateProgress} taskId={taskId} />
      </DialogContent>
    </Dialog>
  );
}

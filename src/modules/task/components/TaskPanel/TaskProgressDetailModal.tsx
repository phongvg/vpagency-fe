import { useTaskProgressDetail } from "@/modules/task/hooks/useTaskProgressDetail";
import { AppButton } from "@/shared/components/common/AppButton";
import { AppLoading } from "@/shared/components/common/AppLoading";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";

interface TaskProgressDetailModalProps {
  open: boolean;
  onClose: () => void;
  taskId: string | null;
}

export default function TaskProgressDetailModal({ open, onClose, taskId }: TaskProgressDetailModalProps) {
  const { data: taskProgressDetail, isLoading } = useTaskProgressDetail(taskId);

  if (isLoading) return <AppLoading loading={isLoading} />;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='w-full sm:max-w-5xl'>
        <DialogHeader>
          <DialogTitle>Chi tiết tiến độ công việc</DialogTitle>
        </DialogHeader>
      </DialogContent>

      <DialogFooter>
        <AppButton type='button' variant='outline' size='sm' onClick={onClose}>
          Đóng
        </AppButton>
      </DialogFooter>
    </Dialog>
  );
}

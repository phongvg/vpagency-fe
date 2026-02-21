import AppButton from "@/shared/components/common/AppButton";
import DatePicker from "@/shared/components/common/DatePicker";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { format } from "date-fns";

interface DateSelectModalProps {
  open: boolean;
  selectedDate: string | undefined;
  onSelectDate: (date: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export default function DateSelectModal({ open, selectedDate, onSelectDate, onSubmit, onClose }: DateSelectModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chọn ngày dữ liệu bạn muốn import (Date Pulled)</DialogTitle>
        </DialogHeader>

        <DatePicker value={selectedDate} onChange={(date) => onSelectDate(format(date!, "yyyy-MM-dd"))} />

        <DialogFooter>
          <AppButton size='sm' onClick={onClose}>
            Đóng
          </AppButton>
          <AppButton variant='outline' size='sm' disabled={!selectedDate} onClick={onSubmit}>
            Xác nhận
          </AppButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

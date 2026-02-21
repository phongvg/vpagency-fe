import { useUpdateAppealMetrics } from "@/modules/task/hooks/useUpdateAppealMetrics";
import { taskAppealMetricsFormSchema, type TaskAppealMetricsFormType } from "@/modules/task/schemas/task-appeal-metrics-form.schema";
import type { Task } from "@/modules/task/types/task.type";
import AppButton from "@/shared/components/common/AppButton";
import { FormDatePicker } from "@/shared/components/form/FormDatePicker";
import { FormInput } from "@/shared/components/form/FormInput";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Form } from "@/shared/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";

interface UpdateAppealMetricsModalProps {
  open: boolean;
  onClose: () => void;
  task: Task | null;
}

export default function UpdateAppealMetricsModal({ open, onClose, task }: UpdateAppealMetricsModalProps) {
  const updateAppealMetrics = useUpdateAppealMetrics();

  const form = useForm<TaskAppealMetricsFormType>({
    resolver: zodResolver(taskAppealMetricsFormSchema),
    defaultValues: {
      appealDate: new Date(),
      appealCount: 0,
      suspensionReason: "",
      successCount: 0,
      failureCount: 0,
    },
  });

  const onSubmit = async (data: TaskAppealMetricsFormType) => {
    await updateAppealMetrics.mutateAsync(
      {
        id: task?.id || "",
        payload: {
          appealDate: format(data.appealDate, "yyyy-MM-dd"),
          appealCount: data.appealCount,
          suspensionReason: data.suspensionReason,
          successCount: data.successCount,
          failureCount: data.failureCount,
        },
      },
      {
        onSuccess: () => {
          onClose();
          form.reset();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Cập nhật chỉ số kháng</DialogTitle>
            </DialogHeader>

            <div className='gap-4 grid grid-cols-2 mb-4'>
              <FormDatePicker name='appealDate' label='Ngày kháng tài khoản' placeholder='Chọn ngày' required />

              <FormInput type='number' name='appealCount' label='Số lượng kháng' required />

              <FormInput type='number' name='successCount' label='Số lượng kháng thành công' required />

              <FormInput type='number' name='failureCount' label='Số lượng kháng thất bại' required />

              <FormInput name='suspensionReason' label='Lý do bị khóa' className='col-span-2' required />
            </div>

            <DialogFooter>
              <AppButton type='button' size='sm' onClick={onClose}>
                Hủy
              </AppButton>

              <AppButton type='submit' variant='outline' size='sm'>
                <Save />
                Xác nhận
              </AppButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

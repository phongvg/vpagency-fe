import { projectApi } from "@/modules/project/api/project.api";
import type { Project } from "@/modules/project/types/project.type";
import { useUpdateDocumentAppealMetrics } from "@/modules/task/hooks/useUpdateDocumentAppealMetrics";
import {
  taskDocumentAppealMetricsFormSchema,
  type TaskDocumentAppealMetricsFormType,
} from "@/modules/task/schemas/task-document-appeal-metrics-form.schema";
import type { Task } from "@/modules/task/types/task.type";
import { AppButton } from "@/shared/components/common/AppButton";
import { FormAsyncSelect } from "@/shared/components/form/FormAsyncSelect";
import { FormDatePicker } from "@/shared/components/form/FormDatePicker";
import { FormInput } from "@/shared/components/form/FormInput";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Form } from "@/shared/components/ui/form";
import { createAsyncSelectFetcher } from "@/shared/utils/async-select.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDate } from "date-fns";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";

interface UpdateDocumentAppealMetricsModalProps {
  open: boolean;
  onClose: () => void;
  task: Task | null;
}

export default function UpdateDocumentAppealMetricsModal({ open, onClose, task }: UpdateDocumentAppealMetricsModalProps) {
  const updateDocumentAppealMetrics = useUpdateDocumentAppealMetrics();

  const fetchProjects = createAsyncSelectFetcher(projectApi.getProjects);

  const form = useForm<TaskDocumentAppealMetricsFormType>({
    resolver: zodResolver(taskDocumentAppealMetricsFormSchema),
    defaultValues: {
      appealDate: new Date(),
      appealCount: 0,
      successCount: 0,
      note: "",
      projectId: undefined,
    },
  });

  const onSubmit = async (data: TaskDocumentAppealMetricsFormType) => {
    await updateDocumentAppealMetrics.mutateAsync(
      {
        id: task?.id || "",
        payload: {
          appealDate: formatDate(data.appealDate, "yyyy-MM-dd"),
          appealCount: data.appealCount,
          successCount: data.successCount,
          note: data.note,
          projectId: data.projectId?.value ?? "",
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
        <DialogHeader>
          <DialogTitle>Cập nhật chỉ số kháng giấy</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='gap-4 grid grid-cols-2'>
              <FormDatePicker name='appealDate' label='Ngày kháng tài khoản' placeholder='Chọn ngày' required />

              <FormInput type='number' name='appealCount' label='Số lượng kháng' required />

              <FormInput type='number' name='successCount' label='Số lượng kháng thành công' required />

              <FormInput name='note' label='Ghi chú' />

              <FormAsyncSelect<Project>
                name='projectId'
                label='Dự án'
                className='col-span-2'
                fetcher={fetchProjects}
                mapOption={(project) => ({ value: project.id, label: project.name })}
                placeholder='Chọn dự án'
                required
              />
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

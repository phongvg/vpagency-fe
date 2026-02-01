import { projectApi } from "@/modules/project/api/project.api";
import type { Project } from "@/modules/project/types/project.type";
import { useUpdateDocumentAppealDetail } from "@/modules/task/hooks/useUpdateDocumentAppealDetail";
import { useUpdateDocumentAppealMetrics } from "@/modules/task/hooks/useUpdateDocumentAppealMetrics";
import {
  taskDocumentAppealMetricsFormSchema,
  type TaskDocumentAppealMetricsFormType,
} from "@/modules/task/schemas/task-document-appeal-metrics-form.schema";
import type { Task, TaskDocumentAppealDetail } from "@/modules/task/types/task.type";
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
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface UpdateDocumentAppealMetricsModalProps {
  open: boolean;
  onClose: () => void;
  task: Task | null;
  documentAppealDetail?: TaskDocumentAppealDetail | null;
}

export default function UpdateDocumentAppealMetricsModal({ open, onClose, task, documentAppealDetail }: UpdateDocumentAppealMetricsModalProps) {
  const isEditMode = !!documentAppealDetail;

  const updateDocumentAppealMetrics = useUpdateDocumentAppealMetrics();
  const updateDocumentAppealDetail = useUpdateDocumentAppealDetail();

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

  useEffect(() => {
    if (open) {
      form.reset({
        appealDate: documentAppealDetail?.appealDate ? new Date(documentAppealDetail.appealDate) : new Date(),
        appealCount: documentAppealDetail?.appealCount ?? 0,
        successCount: documentAppealDetail?.successCount ?? 0,
        note: documentAppealDetail?.note ?? "",
        projectId: documentAppealDetail?.projectId ? { value: documentAppealDetail.projectId, label: documentAppealDetail.projectName } : undefined,
      });
    }
  }, [open, documentAppealDetail, form]);

  const onSubmit = async (data: TaskDocumentAppealMetricsFormType) => {
    if (!task) return;

    const payload = {
      appealDate: formatDate(data.appealDate, "yyyy-MM-dd"),
      appealCount: data.appealCount,
      successCount: data.successCount,
      note: data.note,
      projectId: data.projectId?.value ?? "",
    };

    if (isEditMode && documentAppealDetail) {
      await updateDocumentAppealDetail.mutateAsync(
        {
          taskId: task.id,
          id: documentAppealDetail.id,
          payload,
        },
        {
          onSuccess: () => {
            onClose();
            form.reset();
          },
        }
      );
    } else {
      await updateDocumentAppealMetrics.mutateAsync(
        {
          id: task.id,
          payload,
        },
        {
          onSuccess: () => {
            onClose();
            form.reset();
          },
        }
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Chỉnh sửa chỉ số kháng giấy" : "Cập nhật chỉ số kháng giấy"}</DialogTitle>
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

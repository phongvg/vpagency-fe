import { useUpdateResearchDetail } from "@/modules/task/hooks/useUpdateResearchDetail";
import { useUpdateResearchMetrics } from "@/modules/task/hooks/useUpdateResearchMetrics";
import { taskResearchMetricsFormSchema, type TaskResearchMetricsFormType } from "@/modules/task/schemas/task-research-metrics-form.schema";
import type { Task, TaskResearchDetail } from "@/modules/task/types/task.type";
import AppButton from "@/shared/components/common/AppButton";
import { FormDatePicker } from "@/shared/components/form/FormDatePicker";
import { FormInput } from "@/shared/components/form/FormInput";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Form } from "@/shared/components/ui/form";
import { getModalTitle } from "@/shared/utils/common.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDate } from "date-fns";
import { Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface UpdateResearchMetricsModalProps {
  open: boolean;
  onClose: () => void;
  researchDetail?: TaskResearchDetail | null;
  task: Task | null;
}

export default function UpdateResearchMetricsModal({ open, onClose, researchDetail, task }: UpdateResearchMetricsModalProps) {
  const isEditMode = !!researchDetail;

  const updateResearchMetrics = useUpdateResearchMetrics();
  const updateResearchDetail = useUpdateResearchDetail();

  const form = useForm<TaskResearchMetricsFormType>({
    resolver: zodResolver(taskResearchMetricsFormSchema),
    defaultValues: {
      resultDate: new Date(),
      result: "",
      difficultyLevel: "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        resultDate: researchDetail?.resultDate ? new Date(researchDetail.resultDate) : new Date(),
        result: researchDetail?.result ?? "",
        difficultyLevel: researchDetail?.difficultyLevel ?? "",
      });
    }
  }, [open, researchDetail, form]);

  const onSubmit = async (data: TaskResearchMetricsFormType) => {
    if (!task) return;

    const payload = {
      resultDate: formatDate(data.resultDate, "yyyy-MM-dd"),
      result: data.result,
      difficultyLevel: data.difficultyLevel,
    };

    if (isEditMode && researchDetail) {
      await updateResearchDetail.mutateAsync(
        {
          taskId: task.id,
          id: researchDetail.id,
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
      await updateResearchMetrics.mutateAsync(
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
      <DialogContent className='sm:max-w-sm'>
        <DialogHeader>
          <DialogTitle>{getModalTitle(isEditMode, "kết quả nghiên cứu")}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='gap-4 grid grid-cols-1'>
              <FormDatePicker name='resultDate' label='Ngày nghiên cứu' placeholder='Chọn ngày' required />

              <FormInput name='result' label='Kết quả nghiên cứu' required />

              <FormInput name='difficultyLevel' label='Mức độ khó' required />
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

import AddFinalUrlModal from "@/modules/task/components/TaskProgress/AddFinalUrlModal";
import CampaignStatsModal from "@/modules/task/components/TaskProgress/CampaignStatsModal";
import FinalUrlsTable from "@/modules/task/components/TaskProgress/FinalUrlsTable";
import { useTaskProgress } from "@/modules/task/hooks/useTaskProgress";
import { useUpdateTaskProgress } from "@/modules/task/hooks/useUpdateTaskProgress";
import { taskProgressFormSchema, type TaskProgressFormSchema } from "@/modules/task/schemas/task-progress-form.schema";
import AppButton from "@/shared/components/common/AppButton";
import { FormInput } from "@/shared/components/form/FormInput";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Form } from "@/shared/components/ui/form";
import { taskQueryKeys } from "@/shared/constants/query-keys.constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { PlusCircle, Save } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface UpdateProgressTaskProps {
  open: boolean;
  taskId: string | null;
  onClose: () => void;
}

export default function UpdateProgressTask({ open, taskId, onClose }: UpdateProgressTaskProps) {
  const queryClient = useQueryClient();

  const [isCampaignStatsOpen, setCampaignStatsOpen] = useState(false);
  const [selectedFinalUrlId, setSelectedFinalUrlId] = useState<string | null>(null);
  const [isAddFinalUrlOpen, setAddFinalUrlOpen] = useState(false);

  const { data: progress } = useTaskProgress(taskId);

  const updateProgress = useUpdateTaskProgress();

  const form = useForm<TaskProgressFormSchema>({
    resolver: zodResolver(taskProgressFormSchema),
    defaultValues: {
      progress: progress?.progress || 0,
    },
  });

  useEffect(() => {
    if (progress && open) {
      form.reset({
        progress: progress?.progress || 0,
      });
    } else {
      form.reset({
        progress: 0,
      });
    }
  }, [progress, form, open]);

  const handleOpenCampaignStats = (finalUrlId: string) => {
    setSelectedFinalUrlId(finalUrlId);
    setCampaignStatsOpen(true);
  };

  const onSubmit = async (values: TaskProgressFormSchema) => {
    if (!taskId) return;

    await updateProgress.mutateAsync(
      { taskId: taskId, progress: values.progress },
      {
        onSuccess: (res) => {
          queryClient.invalidateQueries({ queryKey: taskQueryKeys.detail(taskId) });
          queryClient.invalidateQueries({ queryKey: taskQueryKeys.progress(taskId) });
          toast.success(res.message);
          onClose();
        },
      }
    );
  };

  return (
    <Fragment>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cập nhật tiến độ công việc</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormInput type='number' name='progress' label='Tiến độ (%)' max={100} />

              {progress?.finalUrls && <FinalUrlsTable finalUrls={progress.finalUrls} onOpenCampaignStats={handleOpenCampaignStats} />}

              <div className='flex justify-end gap-2'>
                <AppButton type='button' variant='outline' size='sm' onClick={onClose}>
                  Hủy
                </AppButton>

                <AppButton type='button' variant='outline' size='sm' onClick={() => setAddFinalUrlOpen(true)}>
                  <PlusCircle />
                  Thêm mới URL
                </AppButton>

                <AppButton type='submit' variant='outline' size='sm'>
                  <Save />
                  Xác nhận
                </AppButton>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <CampaignStatsModal finalUrlId={selectedFinalUrlId} taskId={taskId} open={isCampaignStatsOpen} onClose={() => setCampaignStatsOpen(false)} />

      <AddFinalUrlModal
        open={isAddFinalUrlOpen}
        onClose={() => setAddFinalUrlOpen(false)}
        taskId={taskId}
        projectId={progress?.projectId}
        finalUrlIds={progress?.finalUrls.map((url) => url.finalUrlId) ?? []}
      />
    </Fragment>
  );
}

import TaskForm from "@/modules/task/components/TaskForm";
import { useTaskDetail } from "@/modules/task/hooks/useTaskDetail";
import { useUpsertTask } from "@/modules/task/hooks/useUpsertTask";
import { transformTaskFormToPayload, transformTaskToForm } from "@/modules/task/mappers/task.mapper";
import { taskFormSchema, type TaskFormType } from "@/modules/task/schemas/task-form.schema";
import AppButton from "@/shared/components/common/AppButton";
import AppLoading from "@/shared/components/common/AppLoading";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Form } from "@/shared/components/ui/form";
import { taskQueryKeys } from "@/shared/constants/query-keys.constant";
import { getModalTitle } from "@/shared/utils/common.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Clipboard, Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface EditTaskModalProps {
  open: boolean;
  onClose: () => void;
  taskId: string | null;
}

export default function EditTaskModal({ open, onClose, taskId }: EditTaskModalProps) {
  const isEditMode = Boolean(taskId);

  const queryClient = useQueryClient();

  const { data: task, isLoading } = useTaskDetail(taskId);

  const upsertTask = useUpsertTask();

  const form = useForm<TaskFormType>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: transformTaskToForm(task),
  });

  useEffect(() => {
    if (task && open) {
      form.reset(transformTaskToForm(task));
    } else {
      form.reset(transformTaskToForm());
    }
  }, [task, form, open]);

  const onSubmit = async (values: TaskFormType) => {
    const data = transformTaskFormToPayload(values);

    await upsertTask.mutateAsync(
      { id: taskId ?? undefined, data },
      {
        onSuccess: (res) => {
          if (isEditMode && taskId) {
            queryClient.invalidateQueries({ queryKey: taskQueryKeys.detail(taskId) });
          }

          queryClient.invalidateQueries({ queryKey: taskQueryKeys.lists() });
          toast.success(res.message);
          onClose();
        },
      }
    );
  };

  if (isEditMode && isLoading) return <AppLoading loading={isLoading} />;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='w-full sm:max-w-3xl'>
        <DialogHeader>
          <DialogTitle>
            <div className='flex items-center gap-1'>
              <Clipboard size={20} />
              {getModalTitle(isEditMode, "công việc")}
            </div>
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <TaskForm />

            <div className='flex justify-end gap-2'>
              <AppButton type='button' variant='outline' size='sm' onClick={onClose} disabled={upsertTask.isPending}>
                Hủy
              </AppButton>

              <AppButton type='submit' variant='outline' size='sm' loading={upsertTask.isPending}>
                <Save />
                Xác nhận
              </AppButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

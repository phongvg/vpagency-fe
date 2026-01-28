import TaskForm from "@/modules/task/components/TaskForm/TaskForm";
import { useCreateTask } from "@/modules/task/hooks/useCreateTask";
import { useTaskDetail } from "@/modules/task/hooks/useTaskDetail";
import { transformTaskFormToPayload, transformTaskToForm } from "@/modules/task/mappers/task.mapper";
import { taskFormSchema, type TaskFormType } from "@/modules/task/schemas/task-form.schema";
import { AppButton } from "@/shared/components/common/AppButton";
import { AppLoading } from "@/shared/components/common/AppLoading";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Form } from "@/shared/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface EditTaskModalProps {
  open: boolean;
  onClose: () => void;
  taskId: string | null;
}

export default function EditTaskModal({ open, onClose, taskId }: EditTaskModalProps) {
  const isEditMode = Boolean(taskId);

  const { data: task, isLoading } = useTaskDetail(taskId);

  const createTask = useCreateTask();

  const form = useForm<TaskFormType>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: transformTaskToForm(task),
  });

  useEffect(() => {
    if (task) {
      form.reset(transformTaskToForm(task));
    } else {
      form.reset(transformTaskToForm());
    }
  }, [task, form]);

  const onSubmit = async (values: TaskFormType) => {
    await createTask.mutateAsync(transformTaskFormToPayload(values));
  };

  if (isEditMode && isLoading) return <AppLoading loading={isLoading} />;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Chỉnh sửa" : "Tạo mới"} công việc</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <TaskForm />

            <div className='flex justify-end gap-2'>
              <AppButton type='button' variant='outline' size='sm' onClick={onClose}>
                Hủy
              </AppButton>

              <AppButton type='submit' variant='outline' size='sm'>
                Xác nhận
              </AppButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

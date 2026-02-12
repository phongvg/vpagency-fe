import { useCreateFinalUrl } from "@/modules/finalUrl/hooks/useCreateFinalUrl";
import { useUpsertTask } from "@/modules/task/hooks/useUpsertTask";
import { addFinalUrlFormSchema, type AddFinalUrlFormValues } from "@/modules/task/schemas/add-final-url-form.schema";
import { AppButton } from "@/shared/components/common/AppButton";
import { FormInput } from "@/shared/components/form/FormInput";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Form } from "@/shared/components/ui/form";
import { taskQueryKeys } from "@/shared/constants/query-keys.constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface AddFinalUrlModalProps {
  open: boolean;
  onClose: () => void;
  taskId: string | null;
  projectId: string | undefined;
  finalUrlIds: string[];
}

export default function AddFinalUrlModal({ open, onClose, taskId, projectId, finalUrlIds }: AddFinalUrlModalProps) {
  const queryClient = useQueryClient();

  const createFinalUrl = useCreateFinalUrl();
  const updateTask = useUpsertTask();

  const form = useForm<AddFinalUrlFormValues>({
    resolver: zodResolver(addFinalUrlFormSchema),
    defaultValues: {
      name: "",
      finalUrl: "",
    },
  });

  const onSubmit = async (values: AddFinalUrlFormValues) => {
    if (!projectId) {
      toast.error("Dự án không hợp lệ");
      return;
    }

    await createFinalUrl.mutateAsync(
      {
        name: values.name,
        finalURL: values.finalUrl,
        projectId,
      },
      {
        onSuccess: async (res) => {
          const { id } = res.data;
          const updatedIds = [...finalUrlIds, id];

          await updateTask.mutateAsync(
            {
              id: taskId as string,
              data: {
                finalUrlIds: updatedIds,
              },
            },
            {
              onSuccess: (res) => {
                toast.success(res.message);
                queryClient.invalidateQueries({ queryKey: taskQueryKeys.progress(taskId as string) });
                onClose();
              },
            }
          );
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cập nhật tiến độ công việc</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormInput type='text' name='name' label='Tên URL' required />

            <FormInput type='text' name='finalUrl' label='URL' required />

            <div className='flex justify-end gap-2'>
              <AppButton type='button' variant='outline' size='sm' onClick={onClose}>
                Hủy
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
  );
}

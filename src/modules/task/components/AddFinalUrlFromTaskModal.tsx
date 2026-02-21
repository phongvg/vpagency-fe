import { useCreateFinalUrl } from "@/modules/finalUrl/hooks/useCreateFinalUrl";
import { addFinalUrlFormSchema, type AddFinalUrlFormValues } from "@/modules/task/schemas/add-final-url-form.schema";
import AppButton from "@/shared/components/common/AppButton";
import { FormInput } from "@/shared/components/form/FormInput";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Form } from "@/shared/components/ui/form";
import { finalUrlQueryKeys } from "@/shared/constants/query-keys.constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface AddFinalUrlFromTaskModalProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
}

export default function AddFinalUrlFromTaskModal({ open, onClose, projectId }: AddFinalUrlFromTaskModalProps) {
  const queryClient = useQueryClient();

  const createFinalUrl = useCreateFinalUrl();

  const form = useForm<AddFinalUrlFormValues>({
    resolver: zodResolver(addFinalUrlFormSchema),
    defaultValues: {
      name: "",
      finalUrl: "",
    },
  });

  const onSubmit = async (values: AddFinalUrlFormValues) => {
    await createFinalUrl.mutateAsync(
      {
        name: values.name,
        finalURL: values.finalUrl,
        projectId,
      },
      {
        onSuccess: (res) => {
          toast.success(res.message);
          queryClient.invalidateQueries({ queryKey: finalUrlQueryKeys.listByProject(projectId) });
          form.reset();
          onClose();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm mới URL</DialogTitle>
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

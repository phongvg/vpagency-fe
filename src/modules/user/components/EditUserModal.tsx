import UserForm from "@/modules/user/components/UserForm";
import { useUpdateUser } from "@/modules/user/hooks/useUpdateUser";
import { useUserDetail } from "@/modules/user/hooks/useUserDetail";
import { transformUserToForm } from "@/modules/user/mappers/user.mapper";
import { userFormSchema, type UserFormType } from "@/modules/user/schemas/user-form.schema";
import { AppButton } from "@/shared/components/common/AppButton";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Form } from "@/shared/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  userId: string | null;
}

export default function EditUserModal({ open, onClose, userId }: EditUserModalProps) {
  const { data: user } = useUserDetail(userId);

  const updateUser = useUpdateUser();

  const form = useForm<UserFormType>({
    resolver: zodResolver(userFormSchema),
    defaultValues: transformUserToForm(user),
  });

  useEffect(() => {
    if (user && open) {
      form.reset(transformUserToForm(user));
    } else {
      form.reset(transformUserToForm());
    }
  }, [user, form, open]);

  const onSubmit = async (values: UserFormType) => {
    await updateUser.mutateAsync(
      {
        id: userId as string,
        payload: values,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <Form {...form}>
          <DialogHeader>
            <DialogTitle>Cập nhật người dùng</DialogTitle>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <UserForm />

            <DialogFooter>
              <AppButton type='button' size='sm' onClick={onClose}>
                Đóng
              </AppButton>
              <AppButton type='submit' variant='outline' size='sm'>
                Xác nhận
              </AppButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

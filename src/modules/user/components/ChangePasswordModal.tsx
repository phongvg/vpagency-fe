import ChangePasswordForm from "@/modules/user/components/ChangePasswordForm";
import { useChangePassword } from "@/modules/user/hooks/useChangePassword";
import { changePasswordFormSchema, type ChangePasswordFormType } from "@/modules/user/schemas/change-password-form.schema";
import AppButton from "@/shared/components/common/AppButton";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Form } from "@/shared/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
  userId: string | null;
}

export default function ChangePasswordModal({ open, onClose, userId }: ChangePasswordModalProps) {
  const changePassword = useChangePassword();

  const form = useForm<ChangePasswordFormType>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (values: ChangePasswordFormType) => {
    await changePassword.mutateAsync(
      {
        id: userId as string,
        payload: values,
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
          <DialogHeader>
            <DialogTitle>Thay đổi mật khẩu</DialogTitle>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <ChangePasswordForm />

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

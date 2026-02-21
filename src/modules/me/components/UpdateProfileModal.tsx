import UpdateProfileForm from "@/modules/me/components/UpdateProfileForm";
import { useUpdateProfile } from "@/modules/me/hooks/useUpdateProfile";
import { transformUpdateProfileFormToFormData, transformUserToUpdateProfileForm } from "@/modules/me/mappers/me.mapper";
import { updateProfileFormSchema, type UpdateProfileFormType } from "@/modules/me/schemas/update-profile-form.schema";
import AppButton from "@/shared/components/common/AppButton";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Form } from "@/shared/components/ui/form";
import { useAuthStore } from "@/shared/stores/auth/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface UpdateProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export default function UpdateProfileModal({ open, onClose }: UpdateProfileModalProps) {
  const { user } = useAuthStore();
  const updateProfile = useUpdateProfile();

  const form = useForm<UpdateProfileFormType>({
    resolver: zodResolver(updateProfileFormSchema),
    defaultValues: transformUserToUpdateProfileForm(user),
  });

  useEffect(() => {
    if (open) {
      form.reset(transformUserToUpdateProfileForm(user));
    }
  }, [open, user, form]);

  const handleSubmit = async (values: UpdateProfileFormType) => {
    await updateProfile.mutateAsync(transformUpdateProfileFormToFormData(values), {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Cập nhật thông tin cá nhân</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
            <UpdateProfileForm />

            <DialogFooter>
              <AppButton type='button' onClick={onClose}>
                Hủy
              </AppButton>
              <AppButton type='submit' variant='outline' loading={updateProfile.isPending}>
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

import AppealAccountForm from "@/modules/appealAccount/components/AppealAccountForm";
import { useAppealAccountDetail } from "@/modules/appealAccount/hooks/useAppealAccountDetail";
import { useCreateAppealAccount } from "@/modules/appealAccount/hooks/useCreateAppealAccount";
import { useUpdateAppealAccount } from "@/modules/appealAccount/hooks/useUpdateAppealAccount";
import { transformAppealAccountToForm } from "@/modules/appealAccount/mappers/appealAccount.mapper";
import { appealAccountFormSchema, type AppealAccountFormType } from "@/modules/appealAccount/schemas/appeal-account-form.schema";
import AppButton from "@/shared/components/common/AppButton";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Form } from "@/shared/components/ui/form";
import { getModalTitle } from "@/shared/utils/common.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface EditAppealAccountModalProps {
  open: boolean;
  onClose: () => void;
  appealAccountId: string | null;
}

export default function EditAppealAccountModal({ open, onClose, appealAccountId }: EditAppealAccountModalProps) {
  const { data: appealAccount } = useAppealAccountDetail(appealAccountId);

  const createAppealAccount = useCreateAppealAccount();
  const updateAppealAccount = useUpdateAppealAccount();

  const isEditMode = !!appealAccountId;

  const form = useForm<AppealAccountFormType>({
    resolver: zodResolver(appealAccountFormSchema),
    defaultValues: transformAppealAccountToForm(appealAccount),
  });

  useEffect(() => {
    if (appealAccount && open && isEditMode) {
      form.reset(transformAppealAccountToForm(appealAccount));
    } else {
      form.reset(transformAppealAccountToForm());
    }
  }, [appealAccount, form, open, isEditMode]);

  const onSubmit = async (values: AppealAccountFormType) => {
    if (isEditMode) {
      await updateAppealAccount.mutateAsync(
        {
          id: appealAccountId as string,
          payload: values,
        },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    } else {
      await createAppealAccount.mutateAsync(values, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-w-3xl max-h-[90vh] overflow-y-auto'>
        <Form {...form}>
          <DialogHeader>
            <DialogTitle>{getModalTitle(isEditMode, "tài khoản kháng cáo")}</DialogTitle>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <AppealAccountForm />

            <DialogFooter>
              <AppButton size='sm' onClick={onClose}>
                Đóng
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

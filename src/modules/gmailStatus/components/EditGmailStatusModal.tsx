import GmailStatusForm from "@/modules/gmailStatus/components/GmailStatusForm";
import { useCreateGmailStatus } from "@/modules/gmailStatus/hooks/useCreateGmailStatus";
import { useGmailStatusDetail } from "@/modules/gmailStatus/hooks/useGmailStatusDetail";
import { useUpdateGmailStatus } from "@/modules/gmailStatus/hooks/useUpdateGmailStatus";
import { transformGmailStatusToForm } from "@/modules/gmailStatus/mappers/gmailStatus.mapper";
import { gmailStatusFormSchema, type GmailStatusFormType } from "@/modules/gmailStatus/schemas/gmail-status-form.schema";
import { AppButton } from "@/shared/components/common/AppButton";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Form } from "@/shared/components/ui/form";
import { getModalTitle } from "@/shared/utils/common.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface EditGmailStatusModalProps {
  open: boolean;
  onClose: () => void;
  gmailStatusId: string | null;
}

export default function EditGmailStatusModal({ open, onClose, gmailStatusId }: EditGmailStatusModalProps) {
  const { data: gmailStatus } = useGmailStatusDetail(gmailStatusId);

  const createGmailStatus = useCreateGmailStatus();
  const updateGmailStatus = useUpdateGmailStatus();

  const isEditMode = !!gmailStatusId;

  const form = useForm<GmailStatusFormType>({
    resolver: zodResolver(gmailStatusFormSchema),
    defaultValues: transformGmailStatusToForm(gmailStatus),
  });

  useEffect(() => {
    if (gmailStatus && open && isEditMode) {
      form.reset(transformGmailStatusToForm(gmailStatus));
    } else {
      form.reset(transformGmailStatusToForm());
    }
  }, [gmailStatus, form, open, isEditMode]);

  const onSubmit = async (values: GmailStatusFormType) => {
    if (isEditMode) {
      await updateGmailStatus.mutateAsync(
        {
          id: gmailStatusId as string,
          payload: values,
        },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    } else {
      await createGmailStatus.mutateAsync(values, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <Form {...form}>
          <DialogHeader>
            <DialogTitle>{getModalTitle(isEditMode, "trạng thái Gmail")}</DialogTitle>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <GmailStatusForm />

            <DialogFooter>
              <AppButton type='button' size='sm' onClick={onClose}>
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

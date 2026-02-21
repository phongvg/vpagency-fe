import { useCreateGmail } from "@/modules/gmail/hooks/useCreateGmail";
import { useGmailDetail } from "@/modules/gmail/hooks/useGmailDetail";
import { useUpdateGmail } from "@/modules/gmail/hooks/useUpdateGmail";
import { transformGmailToForm, transformTGmailFormToPayload } from "@/modules/gmail/mappers/gmail.mapper";
import { gmailFormSchema, type GmailFormType } from "@/modules/gmail/schemas/gmail-form.schema";
import AppButton from "@/shared/components/common/AppButton";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Form } from "@/shared/components/ui/form";
import { getModalTitle } from "@/shared/utils/common.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import GmailForm from "./GmailForm";

interface EditGmailModalProps {
  open: boolean;
  onClose: () => void;
  gmailId: string | null;
}

export default function EditGmailModal({ open, onClose, gmailId }: EditGmailModalProps) {
  const { data: gmail } = useGmailDetail(gmailId);
  const createGmail = useCreateGmail();
  const updateGmail = useUpdateGmail();

  const isEditMode = !!gmailId;

  const form = useForm<GmailFormType>({
    resolver: zodResolver(gmailFormSchema),
    defaultValues: transformGmailToForm(gmail),
  });

  useEffect(() => {
    if (gmail && open && isEditMode) {
      form.reset(transformGmailToForm(gmail));
    } else {
      form.reset(transformGmailToForm());
    }
  }, [gmail, form, open, isEditMode]);

  const handleSubmit = async (values: GmailFormType) => {
    if (isEditMode) {
      await updateGmail.mutateAsync(
        { id: gmailId as string, data: transformTGmailFormToPayload(values) },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    } else {
      await createGmail.mutateAsync(transformTGmailFormToPayload(values), {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>{getModalTitle(isEditMode, "Gmail")}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
            <GmailForm />

            <DialogFooter>
              <AppButton type='button' onClick={onClose}>
                Hủy
              </AppButton>
              <AppButton type='submit' variant='outline' loading={createGmail.isPending || updateGmail.isPending}>
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

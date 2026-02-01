import { gmailFormSchema, type GmailFormType } from "@/modules/gmail/schemas/gmail-form.schema";
import { AppButton } from "@/shared/components/common/AppButton";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Form } from "@/shared/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useGmailDetail } from "../hooks/useGmailDetail";
import { useUpdateGmail } from "../hooks/useUpdateGmail";
import { transformGmailToForm, transformTGmailFormToPayload } from "../utils/gmail.mapper";
import GmailForm from "./GmailForm";

interface EditGmailModalProps {
  open: boolean;
  onClose: () => void;
  gmailId: string | null;
}

export default function EditGmailModal({ open, onClose, gmailId }: EditGmailModalProps) {
  const { data: gmail } = useGmailDetail(gmailId);
  const { mutate: updateGmail, isPending } = useUpdateGmail();

  const form = useForm<GmailFormType>({
    resolver: zodResolver(gmailFormSchema),
    defaultValues: transformGmailToForm(gmail),
  });

  useEffect(() => {
    if (gmail) {
      form.reset(transformGmailToForm(gmail));
    }
  }, [gmail, form]);

  const handleSubmit = (values: GmailFormType) => {
    if (!gmailId) return;

    updateGmail(
      { id: gmailId, data: transformTGmailFormToPayload(values) },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa Gmail</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
            <GmailForm />

            <DialogFooter>
              <AppButton type='button' onClick={onClose}>
                Hủy
              </AppButton>
              <AppButton type='submit' variant='outline' loading={isPending}>
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

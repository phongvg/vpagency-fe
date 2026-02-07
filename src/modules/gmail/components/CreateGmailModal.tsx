import { gmailFormSchema, type GmailFormType } from "@/modules/gmail/schemas/gmail-form.schema";
import { AppButton } from "@/shared/components/common/AppButton";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Form } from "@/shared/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { useCreateGmail } from "../hooks/useCreateGmail";
import { transformTGmailFormToPayload } from "../mappers/gmail.mapper";
import GmailForm from "./GmailForm";

interface CreateGmailModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateGmailModal({ open, onClose }: CreateGmailModalProps) {
  const { mutate: createGmail, isPending } = useCreateGmail();

  const form = useForm<GmailFormType>({
    resolver: zodResolver(gmailFormSchema),
    defaultValues: {
      name: "",
      password: "",
      statusId: undefined,
      assignedUserIds: [],
      recoverMail: "",
      recoverMailPassword: "",
      code2fa: "",
      phone: "",
      proxy: "",
      price: undefined,
      appPassword: "",
      createdYear: undefined,
      profileName: "",
    },
  });

  const handleSubmit = (values: GmailFormType) => {
    createGmail(transformTGmailFormToPayload(values), {
      onSuccess: () => {
        onClose();
        form.reset();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Thêm mới Gmail</DialogTitle>
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

import AppealedProxyForm from "@/modules/appealedProxy/components/AppealedProxyForm";
import { useAppealedProxyDetail } from "@/modules/appealedProxy/hooks/useAppealedProxyDetail";
import { useCreateAppealedProxy } from "@/modules/appealedProxy/hooks/useCreateAppealedProxy";
import { useUpdateAppealedProxy } from "@/modules/appealedProxy/hooks/useUpdateAppealedProxy";
import { transformAppealedProxyToForm, transformFormToCreateAppealedProxy } from "@/modules/appealedProxy/mappers/appealedProxy.mapper";
import { appealedProxyFormSchema, type AppealedProxyFormType } from "@/modules/appealedProxy/schemas/appealed-proxy-form.schema";
import AppButton from "@/shared/components/common/AppButton";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Form } from "@/shared/components/ui/form";
import { getModalTitle } from "@/shared/utils/common.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface EditAppealedProxyModalProps {
  open: boolean;
  onClose: () => void;
  proxyId: string | null;
}

export default function EditAppealedProxyModal({ open, onClose, proxyId }: EditAppealedProxyModalProps) {
  const { data: proxy } = useAppealedProxyDetail(proxyId);

  const createProxy = useCreateAppealedProxy();
  const updateProxy = useUpdateAppealedProxy();

  const isEditMode = !!proxyId;

  const form = useForm<AppealedProxyFormType>({
    resolver: zodResolver(appealedProxyFormSchema),
    defaultValues: transformAppealedProxyToForm(proxy),
  });

  useEffect(() => {
    if (proxy && open && isEditMode) {
      form.reset(transformAppealedProxyToForm(proxy));
    } else {
      form.reset(transformAppealedProxyToForm());
    }
  }, [proxy, form, open, isEditMode]);

  const onSubmit = async (values: AppealedProxyFormType) => {
    if (isEditMode) {
      await updateProxy.mutateAsync({ id: proxyId as string, payload: transformFormToCreateAppealedProxy(values) }, { onSuccess: () => onClose() });
    } else {
      await createProxy.mutateAsync(transformFormToCreateAppealedProxy(values), { onSuccess: () => onClose() });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-w-lg max-h-[90vh] overflow-y-auto'>
        <Form {...form}>
          <DialogHeader>
            <DialogTitle>{getModalTitle(isEditMode, "proxy")}</DialogTitle>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <AppealedProxyForm />

            <DialogFooter>
              <AppButton size='sm' variant='secondary' onClick={onClose}>
                Đóng
              </AppButton>
              <AppButton type='submit' variant='default' size='sm' loading={createProxy.isPending || updateProxy.isPending}>
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

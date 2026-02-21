import { useCreateFinalUrl } from "@/modules/finalUrl/hooks/useCreateFinalUrl";
import { useFinalUrl } from "@/modules/finalUrl/hooks/useFinalUrl";
import { useUpdateFinalUrl } from "@/modules/finalUrl/hooks/useUpdateFinalUrl";
import ProjectFinalUrlForm from "@/modules/project/components/ProjectFinalUrlForm";
import { transformFormToFinalUrl, transformProjectToFinalUrlForm } from "@/modules/project/mappers/project-final-url.mapper";
import { projectFinalUrlFormSchema, type ProjectFinalUrlFormType } from "@/modules/project/schemas/project-final-url-form.schema";
import AppButton from "@/shared/components/common/AppButton";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Form } from "@/shared/components/ui/form";
import { finalUrlQueryKeys } from "@/shared/constants/query-keys.constant";
import { getModalTitle } from "@/shared/utils/common.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface EditProjectFinalUrlModalProps {
  open: boolean;
  onClose: () => void;
  finalUrlId: string | null;
  projectId: string | null;
}

export default function EditProjectFinalUrlModal({ open, onClose, finalUrlId, projectId }: EditProjectFinalUrlModalProps) {
  const isEditMode = !!finalUrlId;

  const queryClient = useQueryClient();

  const { data: finalUrl } = useFinalUrl(finalUrlId);

  const createFinalUrl = useCreateFinalUrl();
  const updateFinalUrl = useUpdateFinalUrl();

  const form = useForm<ProjectFinalUrlFormType>({
    resolver: zodResolver(projectFinalUrlFormSchema),
    defaultValues: transformProjectToFinalUrlForm(finalUrl),
  });

  useEffect(() => {
    if (finalUrl && open && isEditMode) {
      form.reset(transformProjectToFinalUrlForm(finalUrl));
    } else {
      form.reset(transformProjectToFinalUrlForm());
    }
  }, [finalUrl, form, open, isEditMode]);

  const onSubmit = async (values: ProjectFinalUrlFormType) => {
    if (!projectId) {
      toast.error("ID dự án không hợp lệ.");
      return;
    }

    if (isEditMode) {
      updateFinalUrl.mutate(
        {
          id: finalUrlId as string,
          data: transformFormToFinalUrl(values, projectId),
        },
        {
          onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: finalUrlQueryKeys.lists() });
            toast.success(res.message);
            onClose();
          },
        }
      );
    } else {
      createFinalUrl.mutate(transformFormToFinalUrl(values, projectId), {
        onSuccess: (res) => {
          queryClient.invalidateQueries({ queryKey: finalUrlQueryKeys.lists() });
          toast.success(res.message);
          onClose();
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='w-full max-w-full sm:max-w-7xl'>
        <Form {...form}>
          <DialogHeader>
            <DialogTitle>{getModalTitle(isEditMode, "URL")}</DialogTitle>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <ProjectFinalUrlForm />

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

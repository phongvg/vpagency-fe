import ProjectStatusForm from "@/modules/projectStatus/components/ProjectStatusForm";
import { useCreateProjectStatus } from "@/modules/projectStatus/hooks/useCreateProjectStatus";
import { useProjectStatusDetail } from "@/modules/projectStatus/hooks/useProjectStatusDetail";
import { useUpdateProjectStatus } from "@/modules/projectStatus/hooks/useUpdateProjectStatus";
import { transformProjectStatusToForm } from "@/modules/projectStatus/mappers/projectStatus.mapper";
import { projectStatusFormSchema, type ProjectStatusFormType } from "@/modules/projectStatus/schemas/project-status-form.schema";
import AppButton from "@/shared/components/common/AppButton";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Form } from "@/shared/components/ui/form";
import { getModalTitle } from "@/shared/utils/common.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface EditProjectStatusModalProps {
  open: boolean;
  onClose: () => void;
  projectStatusId: string | null;
}

export default function EditProjectStatusModal({ open, onClose, projectStatusId }: EditProjectStatusModalProps) {
  const { data: projectStatus } = useProjectStatusDetail(projectStatusId);

  const createProjectStatus = useCreateProjectStatus();
  const updateProjectStatus = useUpdateProjectStatus();

  const isEditMode = !!projectStatusId;

  const form = useForm<ProjectStatusFormType>({
    resolver: zodResolver(projectStatusFormSchema),
    defaultValues: transformProjectStatusToForm(projectStatus),
  });

  useEffect(() => {
    if (projectStatus && open && isEditMode) {
      form.reset(transformProjectStatusToForm(projectStatus));
    } else {
      form.reset(transformProjectStatusToForm());
    }
  }, [projectStatus, form, open, isEditMode]);

  const onSubmit = async (values: ProjectStatusFormType) => {
    if (isEditMode) {
      await updateProjectStatus.mutateAsync(
        {
          id: projectStatusId as string,
          payload: values,
        },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    } else {
      await createProjectStatus.mutateAsync(values, {
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
            <DialogTitle>{getModalTitle(isEditMode, "trạng thái dự án")}</DialogTitle>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <ProjectStatusForm />

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

import ProjectTypeForm from "@/modules/projectType/components/ProjectTypeForm";
import { useCreateProjectType } from "@/modules/projectType/hooks/useCreateProjectType";
import { useProjectTypeDetail } from "@/modules/projectType/hooks/useProjectTypeDetail";
import { useUpdateProjectType } from "@/modules/projectType/hooks/useUpdateProjectType";
import { transformProjectTypeToForm } from "@/modules/projectType/mappers/projectType.mapper";
import { projectTypeFormSchema, type ProjectTypeFormType } from "@/modules/projectType/schemas/project-type-form.schema";
import AppButton from "@/shared/components/common/AppButton";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Form } from "@/shared/components/ui/form";
import { getModalTitle } from "@/shared/utils/common.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface EditProjectTypeModalProps {
  open: boolean;
  onClose: () => void;
  projectTypeId: string | null;
}

export default function EditProjectTypeModal({ open, onClose, projectTypeId }: EditProjectTypeModalProps) {
  const { data: projectType } = useProjectTypeDetail(projectTypeId);

  const createProjectType = useCreateProjectType();
  const updateProjectType = useUpdateProjectType();

  const isEditMode = !!projectTypeId;

  const form = useForm<ProjectTypeFormType>({
    resolver: zodResolver(projectTypeFormSchema),
    defaultValues: transformProjectTypeToForm(projectType),
  });

  useEffect(() => {
    if (projectType && open && isEditMode) {
      form.reset(transformProjectTypeToForm(projectType));
    } else {
      form.reset(transformProjectTypeToForm());
    }
  }, [projectType, form, open, isEditMode]);

  const onSubmit = async (values: ProjectTypeFormType) => {
    if (isEditMode) {
      await updateProjectType.mutateAsync(
        {
          id: projectTypeId as string,
          payload: values,
        },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    } else {
      await createProjectType.mutateAsync(values, {
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
            <DialogTitle>{getModalTitle(isEditMode, "loại dự án")}</DialogTitle>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <ProjectTypeForm />

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

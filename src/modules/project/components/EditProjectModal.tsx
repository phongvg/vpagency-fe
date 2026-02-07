import ProjectForm from "@/modules/project/components/ProjectForm";
import { useProject } from "@/modules/project/hooks/useProject";
import { transformProjectToForm } from "@/modules/project/mappers/project.mapper";
import { projectFormSchema, type ProjectFormType } from "@/modules/project/schemas/project-form.schema";
import { AppButton } from "@/shared/components/common/AppButton";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Form } from "@/shared/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface EditProjectModalProps {
  open: boolean;
  onClose: () => void;
  projectId: string | null;
}

const TABS = [
  { value: "1", label: "Thông tin dự án" },
  { value: "2", label: "Thông tin URL" },
];

export default function EditProjectModal({ open, onClose, projectId }: EditProjectModalProps) {
  const isEditMode = !!projectId;

  const [tabValue, setTabValue] = useState<string>(TABS[0].value);

  const { data: project } = useProject(projectId);

  const form = useForm<ProjectFormType>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: transformProjectToForm(project),
  });

  const onSubmit = async (values: ProjectFormType) => {
    // if (isEditMode) {
    //   await updateGmailStatus.mutateAsync(
    //     {
    //       id: gmailStatusId as string,
    //       payload: values,
    //     },
    //     {
    //       onSuccess: () => {
    //         onClose();
    //       },
    //     }
    //   );
    // } else {
    //   await createGmailStatus.mutateAsync(values, {
    //     onSuccess: () => {
    //       onClose();
    //     },
    //   });
    // }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-w-4xl'>
        <Form {...form}>
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Cập nhật dự án" : "Thêm mới dự án"}</DialogTitle>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <ProjectForm />

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

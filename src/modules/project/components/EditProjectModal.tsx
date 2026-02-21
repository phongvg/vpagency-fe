import { useDeleteFinalUrl } from "@/modules/finalUrl/hooks/useDeleteFinalUrl";
import EditProjectFinalUrlModal from "@/modules/project/components/EditProjectFinalUrlModal";
import ProjectFinalUrlsTable from "@/modules/project/components/ProjectFinalUrlsTable";
import ProjectForm from "@/modules/project/components/ProjectForm";
import { useCreateProject } from "@/modules/project/hooks/useCreateProject";
import { useProject } from "@/modules/project/hooks/useProject";
import { useUpdateProject } from "@/modules/project/hooks/useUpdateProject";
import { transformFormToProject, transformProjectToForm } from "@/modules/project/mappers/project.mapper";
import { projectFormSchema, type ProjectFormType } from "@/modules/project/schemas/project-form.schema";
import AppButton from "@/shared/components/common/AppButton";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Form } from "@/shared/components/ui/form";
import { useConfirm } from "@/shared/contexts/ConfirmContext";
import { cn } from "@/shared/libs/utils";
import { getModalTitle } from "@/shared/utils/common.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus, Save } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
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
  const [projectIdState, setProjectIdState] = useState<string | null>(null);
  const [finalUrlIdSelected, setFinalUrlIdSelected] = useState<string | null>(null);
  const [isFinalUrlModalOpen, setIsFinalUrlModalOpen] = useState<boolean>(false);

  const { confirm } = useConfirm();

  const { data: project } = useProject(projectId);

  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProjectFinalUrl = useDeleteFinalUrl();

  const form = useForm<ProjectFormType>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: transformProjectToForm(project),
  });

  useEffect(() => {
    if (projectId) {
      setProjectIdState(projectId);
    } else {
      setProjectIdState(null);
    }

    setTabValue(TABS[0].value);
  }, [projectId, setTabValue]);

  useEffect(() => {
    if (project && open && isEditMode) {
      form.reset(transformProjectToForm(project));
    } else {
      form.reset(transformProjectToForm());
    }
  }, [project, form, open, isEditMode]);

  const handleEditFinalUrl = (finalUrlId: string | null) => {
    setFinalUrlIdSelected(finalUrlId ?? null);
    setIsFinalUrlModalOpen(true);
  };

  const handleDeleteFinalUrl = async (finalUrlId: string) => {
    const isConfirmed = await confirm({
      description: "Bạn có chắc chắn muốn xóa URL này không? Hành động này không thể hoàn tác.",
    });

    if (isConfirmed) {
      await deleteProjectFinalUrl.mutateAsync(finalUrlId);
    }
  };

  const onSubmit = async (values: ProjectFormType) => {
    if (isEditMode) {
      await updateProject.mutateAsync(
        {
          id: projectId as string,
          data: transformFormToProject(values),
        },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    } else {
      await createProject.mutateAsync(transformFormToProject(values), {
        onSuccess: (res) => {
          const { id } = res.data;
          setProjectIdState(id);
          setTabValue(TABS[1].value);
        },
      });
    }
  };

  return (
    <Fragment>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className='w-full max-w-full lg:max-w-9xl sm:max-w-7xl'>
          <Form {...form}>
            <DialogHeader>
              <DialogTitle>{getModalTitle(isEditMode, "dự án")}</DialogTitle>
            </DialogHeader>

            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 min-w-0'>
              <div className='flex items-center pb-2'>
                <button
                  type='button'
                  className={cn(tabValue === TABS[0].value && "!text-primary border-primary", "border-b-2 px-2 pb-1 text-white/50")}
                  onClick={() => setTabValue(TABS[0].value)}>
                  {TABS[0].label}
                </button>

                {projectIdState && (
                  <button
                    type='button'
                    className={cn(tabValue === TABS[1].value && "!text-primary border-primary", "border-b-2 px-2 pb-1 text-white/50")}
                    onClick={() => setTabValue(TABS[1].value)}>
                    {TABS[1].label}
                  </button>
                )}
              </div>

              {tabValue === TABS[0].value && <ProjectForm />}

              {tabValue === TABS[1].value && (
                <div className='space-y-2'>
                  <AppButton type='button' size='sm' variant='outline' onClick={() => handleEditFinalUrl(null)}>
                    <CirclePlus />
                    Thêm mới
                  </AppButton>

                  <ProjectFinalUrlsTable projectId={projectIdState} onEdit={handleEditFinalUrl} onDelete={handleDeleteFinalUrl} />
                </div>
              )}

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

      <EditProjectFinalUrlModal
        open={isFinalUrlModalOpen}
        onClose={() => setIsFinalUrlModalOpen(false)}
        finalUrlId={finalUrlIdSelected}
        projectId={projectIdState}
      />
    </Fragment>
  );
}

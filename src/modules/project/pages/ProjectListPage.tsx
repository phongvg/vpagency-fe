import EditProjectModal from "@/modules/project/components/EditProjectModal";
import ProjectTable from "@/modules/project/components/ProjectTable";
import type { ProjectListParams } from "@/modules/project/types/project.type";
import { AppButton } from "@/shared/components/common/AppButton";
import { Input } from "@/shared/components/ui/input";
import { useConfirm } from "@/shared/contexts/ConfirmContext";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { CirclePlus } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

export default function ProjectListPage() {
  const [params, setParams] = useState<ProjectListParams>({
    page: 1,
    limit: 10,
    search: undefined,
  });
  const [searchInput, setSearchInput] = useState<string | undefined>(undefined);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const debounceSearch = useDebounce(searchInput, 500);

  const { confirm } = useConfirm();

  useEffect(() => {
    setParams((prev) => ({ ...prev, search: debounceSearch, page: 1 }));
  }, [debounceSearch]);

  const handleOpenEdit = (projectId: string | null) => {
    setSelectedProjectId(projectId ?? null);
    setIsEditModalOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
    setSelectedProjectId(null);
  };

  const handleDelete = async (projectId: string) => {
    const confirmed = await confirm({
      title: "Xác nhận xóa",
      description: "Bạn có chắc chắn muốn xóa dự án này không?",
    });

    if (confirmed) {
      // await deleteGmail.mutateAsync(gmailId);
    }
  };

  return (
    <Fragment>
      <div className='flex justify-between items-center mb-2'>
        <Input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder='Tìm kiếm theo tên dự án' className='max-w-[300px]' />

        <AppButton size='sm' variant='outline' onClick={() => handleOpenEdit(null)}>
          <CirclePlus />
          Thêm mới
        </AppButton>
      </div>

      <ProjectTable params={params} setParams={setParams} onEdit={handleOpenEdit} onDelete={handleDelete} />

      <EditProjectModal open={isEditModalOpen} onClose={handleCloseEdit} projectId={selectedProjectId} />
    </Fragment>
  );
}

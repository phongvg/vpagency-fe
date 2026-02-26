import EditProjectTypeModal from "@/modules/projectType/components/EditProjectTypeModal";
import ProjectTypeTable from "@/modules/projectType/components/ProjectTypeTable";
import type { ProjectTypeListParams } from "@/modules/projectType/types/projectType.type";
import AppButton from "@/shared/components/common/AppButton";
import SearchInput from "@/shared/components/SearchInput";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { PlusCircle } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

export default function ProjectTypeListPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectTypeId, setSelectedProjectTypeId] = useState<string | null>(null);
  const [params, setParams] = useState<ProjectTypeListParams>({
    page: 1,
    limit: 10,
    search: undefined,
  });
  const [searchInput, setSearchInput] = useState<string | undefined>(undefined);

  const debounceSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    setParams((prev) => ({ ...prev, search: debounceSearch, page: 1 }));
  }, [debounceSearch]);

  const handleOpenCreate = () => {
    setSelectedProjectTypeId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (id: string) => {
    setSelectedProjectTypeId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProjectTypeId(null);
  };

  return (
    <Fragment>
      <div className='flex justify-between items-center gap-4 mb-2'>
        <SearchInput searchInput={searchInput} setSearchInput={setSearchInput} placeholder='Tìm kiếm theo tên loại dự án' />

        <AppButton onClick={handleOpenCreate} variant='outline' size='sm'>
          <PlusCircle />
          Thêm mới
        </AppButton>
      </div>

      <ProjectTypeTable params={params} setParams={setParams} onOpenEdit={handleOpenEdit} />

      <EditProjectTypeModal open={isModalOpen} onClose={handleCloseModal} projectTypeId={selectedProjectTypeId} />
    </Fragment>
  );
}

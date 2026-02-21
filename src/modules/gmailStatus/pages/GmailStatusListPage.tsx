import EditGmailStatusModal from "@/modules/gmailStatus/components/EditGmailStatusModal";
import GmailStatusTable from "@/modules/gmailStatus/components/GmailStatusTable";
import type { GmailStatusListParams } from "@/modules/gmailStatus/types/gmailStatus.type";
import AppButton from "@/shared/components/common/AppButton";
import { Input } from "@/shared/components/ui/input";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { PlusCircle } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

export default function GmailStatusListPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGmailStatusId, setSelectedGmailStatusId] = useState<string | null>(null);
  const [params, setParams] = useState<GmailStatusListParams>({
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
    setSelectedGmailStatusId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (id: string) => {
    setSelectedGmailStatusId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGmailStatusId(null);
  };

  return (
    <Fragment>
      <div className='flex justify-between items-center gap-4 mb-2'>
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder='Tìm kiếm theo tên trạng thái'
          className='max-w-[300px]'
        />

        <AppButton onClick={handleOpenCreate} variant='outline' size='sm'>
          <PlusCircle />
          Thêm mới
        </AppButton>
      </div>

      <GmailStatusTable params={params} setParams={setParams} onOpenEdit={handleOpenEdit} />

      <EditGmailStatusModal open={isModalOpen} onClose={handleCloseModal} gmailStatusId={selectedGmailStatusId} />
    </Fragment>
  );
}

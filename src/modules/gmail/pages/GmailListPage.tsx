import CreateGmailModal from "@/modules/gmail/components/CreateGmailModal";
import EditGmailModal from "@/modules/gmail/components/EditGmailModal";
import GmailTable from "@/modules/gmail/components/GmailTable";
import ImportGmailButton from "@/modules/gmail/components/ImportGmailButton";
import { useDeleteGmail } from "@/modules/gmail/hooks/useDeleteGmail";
import type { GmailListParams } from "@/modules/gmail/types/gmail.type";
import { AppButton } from "@/shared/components/common/AppButton";
import { Input } from "@/shared/components/ui/input";
import { useConfirm } from "@/shared/contexts/ConfirmContext";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { CirclePlus } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

export default function GmailListPage() {
  const [params, setParams] = useState<GmailListParams>({
    page: 1,
    limit: 10,
    search: undefined,
  });
  const [searchInput, setSearchInput] = useState<string | undefined>(undefined);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedGmailId, setSelectedGmailId] = useState<string | null>(null);

  const debounceSearch = useDebounce(searchInput, 500);
  const deleteGmail = useDeleteGmail();
  const { confirm } = useConfirm();

  useEffect(() => {
    setParams((prev) => ({ ...prev, search: debounceSearch, page: 1 }));
  }, [debounceSearch]);

  const handleOpenEdit = (gmailId: string) => {
    setSelectedGmailId(gmailId);
    setIsEditModalOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
    setSelectedGmailId(null);
  };

  const handleOpenCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreate = () => {
    setIsCreateModalOpen(false);
  };

  const handleDelete = async (gmailId: string) => {
    const confirmed = await confirm({
      title: "Xác nhận xóa",
      description: "Bạn có chắc chắn muốn xóa gmail này không?",
    });

    if (confirmed) {
      await deleteGmail.mutateAsync(gmailId);
    }
  };

  return (
    <Fragment>
      <div className='flex justify-between items-center mb-2'>
        <Input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder='Tìm kiếm theo gmail' className='max-w-[300px]' />

        <div className='flex items-center gap-2'>
          <ImportGmailButton />

          <AppButton size='sm' variant='outline' onClick={handleOpenCreate}>
            <CirclePlus />
            Thêm mới
          </AppButton>
        </div>
      </div>

      <GmailTable params={params} setParams={setParams} onEdit={handleOpenEdit} onDelete={handleDelete} />

      <CreateGmailModal open={isCreateModalOpen} onClose={handleCloseCreate} />

      <EditGmailModal open={isEditModalOpen} onClose={handleCloseEdit} gmailId={selectedGmailId} />
    </Fragment>
  );
}

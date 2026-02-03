import AppealAccountListFilter from "@/modules/appealAccount/components/AppealAccountListFilter";
import AppealAccountTable from "@/modules/appealAccount/components/AppealAccountTable";
import EditAppealAccountModal from "@/modules/appealAccount/components/EditAppealAccountModal";
import ImportAppealAccountButton from "@/modules/appealAccount/components/ImportAppealAccountButton";
import type { AppealAccountListParams } from "@/modules/appealAccount/types/appealAccount.type";
import { AppButton } from "@/shared/components/common/AppButton";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { Funnel, PlusCircle } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

export default function AppealAccountListPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppealAccountId, setSelectedAppealAccountId] = useState<string | null>(null);
  const [params, setParams] = useState<AppealAccountListParams>({
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
    setSelectedAppealAccountId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (id: string) => {
    setSelectedAppealAccountId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAppealAccountId(null);
  };

  return (
    <Fragment>
      <div className='flex justify-between items-center gap-4 mb-2'>
        <Popover>
          <PopoverTrigger asChild>
            <AppButton type='button' variant='outline' size='sm'>
              <Funnel />
              Lọc
            </AppButton>
          </PopoverTrigger>

          <PopoverContent className='p-0'>
            <AppealAccountListFilter params={params} setParams={setParams} />
          </PopoverContent>
        </Popover>

        <div className='flex items-center gap-2'>
          <ImportAppealAccountButton />

          <AppButton onClick={handleOpenCreate} variant='outline' size='sm'>
            <PlusCircle />
            Tạo mới
          </AppButton>
        </div>
      </div>

      <AppealAccountTable params={params} setParams={setParams} onOpenEdit={handleOpenEdit} />

      <EditAppealAccountModal open={isModalOpen} onClose={handleCloseModal} appealAccountId={selectedAppealAccountId} />
    </Fragment>
  );
}

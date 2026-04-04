import AppealedProxyListFilter from "@/modules/appealedProxy/components/AppealedProxyListFilter";
import AppealedProxyTable from "@/modules/appealedProxy/components/AppealedProxyTable";
import EditAppealedProxyModal from "@/modules/appealedProxy/components/EditAppealedProxyModal";
import ImportAppealedProxyButton from "@/modules/appealedProxy/components/ImportAppealedProxyButton";
import type { AppealedProxyListParams } from "@/modules/appealedProxy/types/appealedProxy.type";
import AppButton from "@/shared/components/common/AppButton";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { DEFAULT_PAGE_SIZE } from "@/shared/constants/pageSize.constant";
import { Funnel, PlusCircle } from "lucide-react";
import { Fragment, useState } from "react";

export default function AppealedProxyListPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProxyId, setSelectedProxyId] = useState<string | null>(null);
  const [params, setParams] = useState<AppealedProxyListParams>({
    page: 1,
    limit: DEFAULT_PAGE_SIZE,
    search: undefined,
    protocol: undefined,
    country: undefined,
    source: undefined,
    user: undefined,
  });

  const handleOpenCreate = () => {
    setSelectedProxyId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (id: string) => {
    setSelectedProxyId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProxyId(null);
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
            <AppealedProxyListFilter params={params} setParams={setParams} />
          </PopoverContent>
        </Popover>

        <div className='flex items-center gap-2'>
          <ImportAppealedProxyButton />

          <AppButton onClick={handleOpenCreate} variant='outline' size='sm'>
            <PlusCircle />
            Thêm mới
          </AppButton>
        </div>
      </div>

      <AppealedProxyTable params={params} setParams={setParams} onOpenEdit={handleOpenEdit} />

      <EditAppealedProxyModal open={isModalOpen} onClose={handleCloseModal} proxyId={selectedProxyId} />
    </Fragment>
  );
}

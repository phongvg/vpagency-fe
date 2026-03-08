import { urls } from "@/app/routes/route.constant";
import CampaignListFilter from "@/modules/campaign/components/CampaignListFilter";
import CampaignTable from "@/modules/campaign/components/CampaignTable";
import ImportCampaignsButton from "@/modules/campaign/components/ImportCampaignsButton";
import ImportGmailButton from "@/modules/campaign/components/ImportGmailButton";
import type { CampaignListParams } from "@/modules/campaign/types/campaign.type";
import AppButton from "@/shared/components/common/AppButton";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { DEFAULT_PAGE_SIZE } from "@/shared/constants/pageSize.constant";
import { Funnel, Plus } from "lucide-react";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CampaignListPage() {
  const navigate = useNavigate();

  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [params, setParams] = useState<CampaignListParams>({
    page: 1,
    limit: DEFAULT_PAGE_SIZE,
    dateFrom: undefined,
    dateTo: undefined,
    externalId: undefined,
    finalUrl: undefined,
    gmail: undefined,
    importAtFrom: undefined,
    importAtTo: undefined,
    uid: undefined,
  });
  const [importRangePickerValue, setImportRangePickerValue] = useState<string | null>(null);
  const [rangePickerValue, setRangePickerValue] = useState<string | null>(null);

  return (
    <Fragment>
      <div className='flex justify-between items-center mb-2'>
        <Popover open={isOpenFilter} onOpenChange={setIsOpenFilter}>
          <PopoverTrigger asChild>
            <AppButton type='button' variant='outline' size='sm' onClick={() => setIsOpenFilter(!isOpenFilter)}>
              <Funnel />
              Lọc
            </AppButton>
          </PopoverTrigger>

          <PopoverContent className='p-0'>
            <CampaignListFilter
              params={params}
              setParams={setParams}
              importRangePickerValue={importRangePickerValue}
              setImportRangePickerValue={setImportRangePickerValue}
              rangePickerValue={rangePickerValue}
              setRangePickerValue={setRangePickerValue}
            />
          </PopoverContent>
        </Popover>

        <div className='flex items-center gap-2'>
          <ImportCampaignsButton />

          <ImportGmailButton />

          <AppButton variant='outline' size='sm' onClick={() => navigate(`/${urls.createCampaign}`)}>
            <Plus />
            Thêm mới
          </AppButton>
        </div>
      </div>

      <CampaignTable params={params} setParams={setParams} />
    </Fragment>
  );
}

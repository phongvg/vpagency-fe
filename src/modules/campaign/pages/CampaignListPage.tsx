import CampaignListFilter from "@/modules/campaign/components/CampaignListFilter";
import CampaignTable from "@/modules/campaign/components/CampaignTable";
import ImportCampaignsButton from "@/modules/campaign/components/ImportCampaignsButton";
import ImportGmailButton from "@/modules/campaign/components/ImportGmailButton";
import type { CampaignListParams } from "@/modules/campaign/types/campaign.type";
import { AppButton } from "@/shared/components/common/AppButton";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { Funnel } from "lucide-react";
import { Fragment, useState } from "react";

export default function CampaignListPage() {
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [params, setParams] = useState<CampaignListParams>({
    page: 1,
    limit: 10,
    dateFrom: undefined,
    dateTo: undefined,
    externalId: undefined,
    finalUrl: undefined,
    gmail: undefined,
    importAtFrom: undefined,
    importAtTo: undefined,
    uid: undefined,
  });

  return (
    <Fragment>
      <div className='flex justify-between items-center'>
        <Popover open={isOpenFilter} onOpenChange={setIsOpenFilter}>
          <PopoverTrigger asChild>
            <AppButton type='button' variant='outline' size='sm' onClick={() => setIsOpenFilter(!isOpenFilter)}>
              <Funnel />
              Lọc
            </AppButton>
          </PopoverTrigger>

          <PopoverContent className='p-0'>
            <CampaignListFilter params={params} setParams={setParams} />
          </PopoverContent>
        </Popover>

        <div className='flex items-center gap-2'>
          <ImportCampaignsButton />

          <ImportGmailButton />

          {/* <AppButton variant='outline' size='sm'>
            <Plus />
            Thêm mới
          </AppButton> */}
        </div>
      </div>

      <CampaignTable params={params} setParams={setParams} />
    </Fragment>
  );
}

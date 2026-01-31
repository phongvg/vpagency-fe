import CampaignListFilter from "@/modules/campaign/components/CampaignListFilter";
import CampaignTable from "@/modules/campaign/components/CampaignTable";
import type { CampaignListParams } from "@/modules/campaign/types/campaign.type";
import { AppButton } from "@/shared/components/common/AppButton";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { Download, Funnel, Plus } from "lucide-react";
import { Fragment, useState } from "react";

export default function CampaignListPage() {
  const [params, setParams] = useState<CampaignListParams>({
    page: 1,
    limit: 10,
    campaignName: undefined,
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
        <Popover>
          <PopoverTrigger asChild>
            <AppButton type='button' variant='outline' size='sm'>
              <Funnel />
              Lọc
            </AppButton>
          </PopoverTrigger>

          <PopoverContent className='p-0'>
            <CampaignListFilter params={params} setParams={setParams} />
          </PopoverContent>
        </Popover>

        <div className='flex items-center gap-2'>
          <AppButton variant='outline' size='sm'>
            <Download />
            Nhập dữ liệu
          </AppButton>

          <AppButton variant='outline' size='sm'>
            <Download />
            Nhập Gmail
          </AppButton>

          <AppButton variant='outline' size='sm'>
            <Plus />
            Thêm mới
          </AppButton>
        </div>
      </div>

      <CampaignTable params={params} setParams={setParams} />
    </Fragment>
  );
}

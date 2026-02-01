import { campaignColumnConfig } from "@/modules/campaign/configs/campaign-column.config";
import { useCampaigns } from "@/modules/campaign/hooks/useCampaigns";
import type { CampaignListParams } from "@/modules/campaign/types/campaign.type";
import { AppLoading } from "@/shared/components/common/AppLoading";
import { AppTable } from "@/shared/components/common/AppTable";
import { formatDollarAmount } from "@/shared/utils/common.util";
import type { RowSelectionState, VisibilityState } from "@tanstack/react-table";
import { Fragment, useMemo, useState } from "react";

interface CampaignTableProps {
  params: CampaignListParams;
  setParams: React.Dispatch<React.SetStateAction<CampaignListParams>>;
}

export default function CampaignTable({ params, setParams }: CampaignTableProps) {
  const { data, isLoading } = useCampaigns(params);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const campaigns = useMemo(() => data?.items || [], [data]);
  const meta = useMemo(() => data?.meta, [data]);

  const selectedCampaignsData = useMemo(() => {
    return campaigns.filter((c) => Object.keys(rowSelection).includes(c.id));
  }, [campaigns, rowSelection]);

  const aggregatedData = useMemo(() => {
    const count = selectedCampaignsData.length;
    const totalClicks = selectedCampaignsData.reduce((sum, c) => sum + (c.clicks || 0), 0);
    const totalImpressions = selectedCampaignsData.reduce((sum, c) => sum + (c.impression || 0), 0);
    const totalCost = selectedCampaignsData.reduce((sum, c) => sum + (c.cost || 0), 0);

    return {
      count,
      totalClicks,
      totalImpressions,
      totalCost,
    };
  }, [selectedCampaignsData]);

  if (isLoading) return <AppLoading loading={isLoading} />;

  return (
    <Fragment>
      {Object.keys(rowSelection).length > 0 && (
        <div className='flex items-center gap-4 bg-gray-900 mb-2 p-4'>
          <div className='flex flex-wrap justify-between items-center gap-4'>
            <div className='flex items-center gap-6'>
              <div>
                <span className='font-medium'>Số campaign đã chọn:</span>
                <span className='ml-2 font-semibold text-red-500'>{aggregatedData.count}</span>
              </div>
              <div>
                <span className='font-medium'>Tổng Clicks:</span>
                <span className='ml-2 font-semibold text-red-500'>{aggregatedData.totalClicks.toLocaleString()}</span>
              </div>
              <div>
                <span className='font-medium'>Tổng lượt hiển thị:</span>
                <span className='ml-2 font-semibold text-red-500'>{aggregatedData.totalImpressions.toLocaleString()}</span>
              </div>
              <div>
                <span className='font-medium'>Tổng ngân sách:</span>
                <span className='ml-2 font-semibold text-red-500'>{formatDollarAmount(aggregatedData.totalCost)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <AppTable
        data={campaigns}
        columns={campaignColumnConfig()}
        page={params.page}
        pageCount={meta?.totalPages}
        pageSize={params.limit}
        onPageChange={(page, pageSize) => setParams((prev) => ({ ...prev, page, limit: pageSize }))}
        enableRowSelection
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        enableColumnVisibility
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={setColumnVisibility}
      />
    </Fragment>
  );
}

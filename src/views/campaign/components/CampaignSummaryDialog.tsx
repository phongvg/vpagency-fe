import { Button, Dialog } from '@/components/ui'
import { useCampaignStore } from '@/views/campaign/store/useCampaignStore'
import { exportCampaigns } from '@/views/campaign/utils/export'
import { DownloadSimpleIcon, FileXlsIcon } from '@phosphor-icons/react'

export default function CampaignSummaryDialog() {
  const { campaignSummary, dialogCampaignSummaryOpen, closeCampaignSummaryDialog } = useCampaignStore()

  const handleDownload = () => {
    if (campaignSummary) {
      exportCampaigns(campaignSummary.success || [], campaignSummary.failed || [])
    }
  }

  return (
    <Dialog
      isOpen={dialogCampaignSummaryOpen}
      width={550}
      onClose={closeCampaignSummaryDialog}
      onRequestClose={closeCampaignSummaryDialog}
    >
      <h5 className="mb-4">Kết quả</h5>
      <p className="font-bold text-gray-700">
        Tổng: {campaignSummary?.summary.total} chiến dịch | Thành công: {campaignSummary?.summary.succeeded} chiến dịch
        | Lỗi: {campaignSummary?.summary.failed} chiến dịch
      </p>

      <div className="flex justify-between items-center mt-4 p-[12px] border border-[#E2E3E4] rounded-[8px]">
        <div className="flex items-center gap-3">
          <div className="flex justify-center items-center bg-[#F8F8F8] p-1 border border-[#E8E8E9] rounded-lg">
            <FileXlsIcon size={28} color="#343330" />
          </div>
          <span className="font-semibold text-[#1A1A1A]">Danh sách chiến dịch</span>
        </div>
        <button type="button" title="Tải xuống" onClick={handleDownload}>
          <DownloadSimpleIcon size={24} color="#939394" />
        </button>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button type="button" onClick={closeCampaignSummaryDialog}>
          Đóng
        </Button>
      </div>
    </Dialog>
  )
}

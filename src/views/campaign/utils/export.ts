import * as XLSX from 'xlsx'
import { Campaign } from '@/views/campaign/types/campaign.type'
import { formatDate } from '@/helpers/formatDate'

export const exportCampaigns = (
  successCampaigns: Campaign[],
  failedCampaigns: Array<{ campaign: Campaign; error: string }>,
) => {
  const workbook = XLSX.utils.book_new()

  if (successCampaigns && successCampaigns.length > 0) {
    const successData = successCampaigns.map((campaign, index) => ({
      STT: index + 1,
      'Thời gian nhập': formatDate(campaign.importAt),
      Ngày: formatDate(campaign.date),
      UID: campaign.uid || '',
      MCC: campaign.mcc || '',
      'Tên chiến dịch': campaign.name || '',
      'ID chiến dịch': campaign.externalId || '',
      'URL cuối cùng': campaign.finalUrl?.finalURL || '',
      'Trạng thái': campaign.status || '',
      'CPC trung bình': campaign.avgCpc || 0,
      'Thầu chung': campaign.targetCpc || 0,
      Click: campaign.clicks || 0,
      CTR: campaign.ctr || 0,
      CPM: campaign.cpm || 0,
      'Ngân sách chi tiêu': campaign.cost || 0,
      'Quốc gia mục tiêu': campaign.targetLocations?.join(', ') || '',
      'Từ khóa': campaign.keywords?.map((k) => `${k.keyword} (${k.match})`).join(', ') || '',
      'Thuật ngữ tìm kiếm':
        campaign.topSearchTerms?.map((t) => `${t.term} - CPC: ${t.cpc}, Spent: ${t.spent}`).join('; ') || '',
      'Thống kê quốc gia':
        campaign.locationStats
          ?.map((l) => `${l.location} - Clicks: ${l.clicks}, CTR: ${l.ctr}, CPC: ${l.cpc}, Spent: ${l.spent}`)
          .join('; ') || '',
    }))

    const successWorksheet = XLSX.utils.json_to_sheet(successData)
    const maxWidth = 50
    const successColWidths = Object.keys(successData[0] || {}).map((key) => {
      const maxLength = Math.max(key.length, ...successData.map((row) => String(row[key as keyof typeof row]).length))
      return { wch: Math.min(maxLength + 2, maxWidth) }
    })
    successWorksheet['!cols'] = successColWidths
    XLSX.utils.book_append_sheet(workbook, successWorksheet, 'Thành công')
  }

  if (failedCampaigns && failedCampaigns.length > 0) {
    const failedData = failedCampaigns.map((item, index) => ({
      STT: index + 1,
      'Thời gian nhập': item.campaign.importAt || '',
      Ngày: item.campaign.date || '',
      UID: item.campaign.uid || '',
      MCC: item.campaign.mcc || '',
      'Tên chiến dịch': item.campaign.name || '',
      'ID chiến dịch': item.campaign.externalId || '',
      'URL cuối cùng': item.campaign.finalUrl || '',
      'Trạng thái': item.campaign.status || '',
      'CPC trung bình': item.campaign.avgCpc || 0,
      'Thầu chung': item.campaign.targetCpc || 0,
      Click: item.campaign.clicks || 0,
      CTR: item.campaign.ctr || 0,
      CPM: item.campaign.cpm || 0,
      'Ngân sách chi tiêu': item.campaign.cost || 0,
      'Quốc gia mục tiêu': item.campaign.targetLocations?.join(', ') || '',
      'Từ khóa': item.campaign.keywords?.map((k) => `${k.keyword} (${k.match})`).join(', ') || '',
      'Thuật ngữ tìm kiếm':
        item.campaign.topSearchTerms?.map((t) => `${t.term} - CPC: ${t.cpc}, Spent: ${t.spent}`).join('; ') || '',
      'Thống kê quốc gia':
        item.campaign.locationStats
          ?.map((l) => `${l.location} - Clicks: ${l.clicks}, CTR: ${l.ctr}, CPC: ${l.cpc}, Spent: ${l.spent}`)
          .join('; ') || '',
      Lỗi: item.error,
    }))

    const failedWorksheet = XLSX.utils.json_to_sheet(failedData)
    const maxWidth = 50
    const failedColWidths = Object.keys(failedData[0] || {}).map((key) => {
      const maxLength = Math.max(key.length, ...failedData.map((row) => String(row[key as keyof typeof row]).length))
      return { wch: Math.min(maxLength + 2, maxWidth) }
    })
    failedWorksheet['!cols'] = failedColWidths
    XLSX.utils.book_append_sheet(workbook, failedWorksheet, 'Thất bại')
  }

  const fileName = `campaign_import_result_${new Date().getTime()}.xlsx`
  XLSX.writeFile(workbook, fileName)
}

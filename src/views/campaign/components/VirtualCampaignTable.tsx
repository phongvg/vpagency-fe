import { Campaign } from '@/@types/campaign'
import { addDash } from '@/helpers/addDash'
import { Badge, Tooltip } from '@/components/ui'
import { FixedSizeList } from 'react-window'
import { useCallback, useMemo } from 'react'

interface VirtualCampaignTableProps {
  campaigns: Campaign[]
  height?: number
}

const ROW_HEIGHT = 80
const HEADER_HEIGHT = 56

export default function VirtualCampaignTable({ campaigns, height = 860 }: VirtualCampaignTableProps) {
  const tableHeight = height - HEADER_HEIGHT

  const columnWidths = useMemo(
    () => ({
      stt: 60,
      datePull: 120,
      dateData: 120,
      uid: 140,
      mcc: 140,
      campaignId: 150,
      campaignName: 200,
      finalUrl: 250,
      keyword: 300,
      match: 200,
      searchTerm: 300,
      cpcSearchTerm: 300,
      costSearchTerm: 300,
      statusCampaign: 200,
      avgCpc: 180,
      micros: 120,
      click: 100,
      ctr: 100,
      cpm: 100,
      cost: 180,
      locationTarget: 300,
      spendingCountry: 180,
      cpcCountry: 180,
      ctrCountry: 180,
      clickCountry: 180,
      costCountry: 200,
    }),
    [],
  )

  const totalWidth = useMemo(() => Object.values(columnWidths).reduce((sum, width) => sum + width, 0), [columnWidths])

  const renderBadgeList = useCallback((items: (string | number)[], maxVisible = 3) => {
    if (items.length === 0) return null

    const visibleItems = items.slice(0, maxVisible)
    const remainingCount = items.length - maxVisible

    return (
      <div className="flex flex-wrap gap-2 py-2 w-full">
        {visibleItems.map((item, i) => (
          <Badge
            key={`${item}-${i}`}
            className="flex justify-center items-center bg-transparent border text-slate-900"
            content={String(item)}
          />
        ))}
        {remainingCount > 0 && (
          <Tooltip title={items.slice(maxVisible).map(String).join(', ')}>
            <Badge
              content={`+${remainingCount} items`}
              className="flex justify-center items-center bg-transparent border text-slate-900 cursor-help"
            />
          </Tooltip>
        )}
      </div>
    )
  }, [])

  const Row = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const campaign = campaigns[index]

      return (
        <div
          style={{
            ...style,
            display: 'flex',
            borderBottom: '1px solid #e5e7eb',
            boxSizing: 'border-box',
          }}
          className="bg-white"
        >
          <div
            style={{ width: columnWidths.stt, minWidth: columnWidths.stt }}
            className="flex items-center px-4 border-r"
          >
            {index + 1}
          </div>
          <div
            style={{ width: columnWidths.datePull, minWidth: columnWidths.datePull }}
            className="flex items-center px-4 border-r whitespace-nowrap"
          >
            {campaign.datePull}
          </div>
          <div
            style={{ width: columnWidths.dateData, minWidth: columnWidths.dateData }}
            className="flex items-center px-4 border-r whitespace-nowrap"
          >
            {campaign.dateData}
          </div>
          <div
            style={{ width: columnWidths.uid, minWidth: columnWidths.uid }}
            className="flex items-center px-4 border-r whitespace-nowrap"
          >
            {addDash(campaign.uid)}
          </div>
          <div
            style={{ width: columnWidths.mcc, minWidth: columnWidths.mcc }}
            className="flex items-center px-4 border-r whitespace-nowrap"
          >
            {addDash(campaign.mcc)}
          </div>
          <div
            style={{ width: columnWidths.campaignId, minWidth: columnWidths.campaignId }}
            className="flex items-center px-4 border-r whitespace-nowrap"
          >
            {addDash(campaign.campaignId)}
          </div>
          <div
            style={{ width: columnWidths.campaignName, minWidth: columnWidths.campaignName }}
            className="flex items-center px-4 border-r"
          >
            {campaign.campaignName}
          </div>
          <div
            style={{ width: columnWidths.finalUrl, minWidth: columnWidths.finalUrl }}
            className="flex items-center px-4 border-r"
          >
            <a
              href={campaign.finalUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline truncate"
            >
              {campaign.finalUrl}
            </a>
          </div>
          <div
            style={{ width: columnWidths.keyword, minWidth: columnWidths.keyword }}
            className="flex items-center px-4 border-r"
          >
            {renderBadgeList(campaign.keyword)}
          </div>
          <div
            style={{ width: columnWidths.match, minWidth: columnWidths.match }}
            className="flex items-center px-4 border-r"
          >
            {renderBadgeList(campaign.match)}
          </div>
          <div
            style={{ width: columnWidths.searchTerm, minWidth: columnWidths.searchTerm }}
            className="flex items-center px-4 border-r"
          >
            {renderBadgeList(campaign.searchTerm)}
          </div>
          <div
            style={{ width: columnWidths.cpcSearchTerm, minWidth: columnWidths.cpcSearchTerm }}
            className="flex items-center px-4 border-r"
          >
            {renderBadgeList(campaign.cpcSearchTerm)}
          </div>
          <div
            style={{ width: columnWidths.costSearchTerm, minWidth: columnWidths.costSearchTerm }}
            className="flex items-center px-4 border-r"
          >
            {renderBadgeList(campaign.costSearchTerm)}
          </div>
          <div
            style={{ width: columnWidths.statusCampaign, minWidth: columnWidths.statusCampaign }}
            className="flex items-center px-4 border-r"
          >
            {campaign.statusCampaign}
          </div>
          <div
            style={{ width: columnWidths.avgCpc, minWidth: columnWidths.avgCpc }}
            className="flex items-center px-4 border-r"
          >
            {campaign.avgCpc}
          </div>
          <div
            style={{ width: columnWidths.micros, minWidth: columnWidths.micros }}
            className="flex items-center px-4 border-r"
          >
            {campaign.micros}
          </div>
          <div
            style={{ width: columnWidths.click, minWidth: columnWidths.click }}
            className="flex items-center px-4 border-r"
          >
            {campaign.click}
          </div>
          <div
            style={{ width: columnWidths.ctr, minWidth: columnWidths.ctr }}
            className="flex items-center px-4 border-r"
          >
            {campaign.ctr}
          </div>
          <div
            style={{ width: columnWidths.cpm, minWidth: columnWidths.cpm }}
            className="flex items-center px-4 border-r"
          >
            {campaign.cpm}
          </div>
          <div
            style={{ width: columnWidths.cost, minWidth: columnWidths.cost }}
            className="flex items-center px-4 border-r"
          >
            {campaign.cost}
          </div>
          <div
            style={{ width: columnWidths.locationTarget, minWidth: columnWidths.locationTarget }}
            className="flex items-center px-4 border-r"
          >
            {renderBadgeList(campaign.locationTarget)}
          </div>
          <div
            style={{ width: columnWidths.spendingCountry, minWidth: columnWidths.spendingCountry }}
            className="flex items-center px-4 border-r"
          >
            {campaign.spendingCountry}
          </div>
          <div
            style={{ width: columnWidths.cpcCountry, minWidth: columnWidths.cpcCountry }}
            className="flex items-center px-4 border-r"
          >
            {campaign.cpcCountry}
          </div>
          <div
            style={{ width: columnWidths.ctrCountry, minWidth: columnWidths.ctrCountry }}
            className="flex items-center px-4 border-r"
          >
            {campaign.ctrCountry}
          </div>
          <div
            style={{ width: columnWidths.clickCountry, minWidth: columnWidths.clickCountry }}
            className="flex items-center px-4 border-r"
          >
            {campaign.clickCountry}
          </div>
          <div
            style={{ width: columnWidths.costCountry, minWidth: columnWidths.costCountry }}
            className="flex items-center px-4"
          >
            {campaign.costCountry}
          </div>
        </div>
      )
    },
    [campaigns, columnWidths, renderBadgeList],
  )

  return (
    <div className="relative border border-gray-200 rounded-lg overflow-hidden">
      <div style={{ width: '100%', height: height, overflowX: 'auto', overflowY: 'hidden' }}>
        <div style={{ minWidth: totalWidth }}>
          <div style={{ height: HEADER_HEIGHT }} className="bg-white border-gray-200 border-b">
            <div style={{ display: 'flex', height: '100%' }}>
              <div
                style={{ width: columnWidths.stt, minWidth: columnWidths.stt }}
                className="flex items-center px-4 border-r font-semibold"
              >
                STT
              </div>
              <div
                style={{ width: columnWidths.datePull, minWidth: columnWidths.datePull }}
                className="flex items-center px-4 border-r font-semibold"
              >
                Ngày kéo
              </div>
              <div
                style={{ width: columnWidths.dateData, minWidth: columnWidths.dateData }}
                className="flex items-center px-4 border-r font-semibold"
              >
                Ngày dữ liệu
              </div>
              <div
                style={{ width: columnWidths.uid, minWidth: columnWidths.uid }}
                className="flex items-center px-4 border-r font-semibold"
              >
                UID
              </div>
              <div
                style={{ width: columnWidths.mcc, minWidth: columnWidths.mcc }}
                className="flex items-center px-4 border-r font-semibold"
              >
                MCC
              </div>
              <div
                style={{ width: columnWidths.campaignId, minWidth: columnWidths.campaignId }}
                className="flex items-center px-4 border-r font-semibold"
              >
                ID chiến dịch
              </div>
              <div
                style={{ width: columnWidths.campaignName, minWidth: columnWidths.campaignName }}
                className="flex items-center px-4 border-r font-semibold"
              >
                Tên chiến dịch
              </div>
              <div
                style={{ width: columnWidths.finalUrl, minWidth: columnWidths.finalUrl }}
                className="flex items-center px-4 border-r font-semibold"
              >
                URL cuối cùng
              </div>
              <div
                style={{ width: columnWidths.keyword, minWidth: columnWidths.keyword }}
                className="flex items-center px-4 border-r font-semibold"
              >
                Từ khóa
              </div>
              <div
                style={{ width: columnWidths.match, minWidth: columnWidths.match }}
                className="flex items-center px-4 border-r font-semibold"
              >
                Phù hợp
              </div>
              <div
                style={{ width: columnWidths.searchTerm, minWidth: columnWidths.searchTerm }}
                className="flex items-center px-4 border-r font-semibold"
              >
                Thuật ngữ tìm kiếm
              </div>
              <div
                style={{ width: columnWidths.cpcSearchTerm, minWidth: columnWidths.cpcSearchTerm }}
                className="flex items-center px-4 border-r font-semibold"
              >
                CPC tìm kiếm
              </div>
              <div
                style={{ width: columnWidths.costSearchTerm, minWidth: columnWidths.costSearchTerm }}
                className="flex items-center px-4 border-r font-semibold"
              >
                Chi phí của từng CPC
              </div>
              <div
                style={{ width: columnWidths.statusCampaign, minWidth: columnWidths.statusCampaign }}
                className="flex items-center px-4 border-r font-semibold"
              >
                Trạng thái chiến dịch
              </div>
              <div
                style={{ width: columnWidths.avgCpc, minWidth: columnWidths.avgCpc }}
                className="flex items-center px-4 border-r font-semibold"
              >
                CPC trung bình
              </div>
              <div
                style={{ width: columnWidths.micros, minWidth: columnWidths.micros }}
                className="flex items-center px-4 border-r font-semibold"
              >
                Thầu chung
              </div>
              <div
                style={{ width: columnWidths.click, minWidth: columnWidths.click }}
                className="flex items-center px-4 border-r font-semibold"
              >
                Click
              </div>
              <div
                style={{ width: columnWidths.ctr, minWidth: columnWidths.ctr }}
                className="flex items-center px-4 border-r font-semibold"
              >
                CTR
              </div>
              <div
                style={{ width: columnWidths.cpm, minWidth: columnWidths.cpm }}
                className="flex items-center px-4 border-r font-semibold"
              >
                CPM
              </div>
              <div
                style={{ width: columnWidths.cost, minWidth: columnWidths.cost }}
                className="flex items-center px-4 border-r font-semibold"
              >
                Ngân sách chi tiêu
              </div>
              <div
                style={{ width: columnWidths.locationTarget, minWidth: columnWidths.locationTarget }}
                className="flex items-center px-4 border-r font-semibold"
              >
                Mục tiêu quốc gia
              </div>
              <div
                style={{ width: columnWidths.spendingCountry, minWidth: columnWidths.spendingCountry }}
                className="flex items-center px-4 border-r font-semibold"
              >
                Quốc gia cắn tiền
              </div>
              <div
                style={{ width: columnWidths.cpcCountry, minWidth: columnWidths.cpcCountry }}
                className="flex items-center px-4 border-r font-semibold"
              >
                CPC quốc gia
              </div>
              <div
                style={{ width: columnWidths.ctrCountry, minWidth: columnWidths.ctrCountry }}
                className="flex items-center px-4 border-r font-semibold"
              >
                CTR quốc gia
              </div>
              <div
                style={{ width: columnWidths.clickCountry, minWidth: columnWidths.clickCountry }}
                className="flex items-center px-4 border-r font-semibold"
              >
                Click quốc gia
              </div>
              <div
                style={{ width: columnWidths.costCountry, minWidth: columnWidths.costCountry }}
                className="flex items-center px-4 font-semibold"
              >
                Tổng chi tiêu quốc gia
              </div>
            </div>
          </div>

          {/* Virtual List */}
          <FixedSizeList
            height={tableHeight}
            itemCount={campaigns.length}
            itemSize={ROW_HEIGHT}
            width={totalWidth}
            style={{ overflowX: 'hidden' }}
          >
            {Row}
          </FixedSizeList>
        </div>
      </div>
    </div>
  )
}

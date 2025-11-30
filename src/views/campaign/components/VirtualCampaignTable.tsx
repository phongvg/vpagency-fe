import { UpdateCampaignRequest } from '@/views/campaign/types/campaign.type'
import { addDash } from '@/helpers/addDash'
import { FixedSizeList } from 'react-window'
import { useCallback, useMemo } from 'react'
import { TableTooltip } from '@/components/shared/TableTooltip'

interface VirtualCampaignTableProps {
  campaigns: UpdateCampaignRequest[]
  height?: number
}

const ROW_HEIGHT = 80
const HEADER_HEIGHT = 56

export default function VirtualCampaignTable({ campaigns, height = 860 }: VirtualCampaignTableProps) {
  const tableHeight = height - HEADER_HEIGHT

  const columnWidths = useMemo(
    () => ({
      stt: 60,
      importAt: 120,
      date: 120,
      uid: 140,
      mcc: 140,
      externalId: 150,
      name: 200,
      finalUrl: 250,
      status: 200,
      avgCpc: 180,
      targetCpc: 120,
      campaignBudget: 200,
      clicks: 100,
      ctr: 100,
      cpm: 100,
      cost: 180,
      keywords: 300,
      negativeKeywords: 300,
      targetLocations: 300,
      topSearchTerms: 300,
      locationStats: 300,
      locationExcluded: 300,
    }),
    [],
  )

  const totalWidth = useMemo(() => Object.values(columnWidths).reduce((sum, width) => sum + width, 0), [columnWidths])

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
            style={{ width: columnWidths.importAt, minWidth: columnWidths.importAt }}
            className="flex items-center px-4 border-r whitespace-nowrap"
          >
            {campaign.importAt}
          </div>
          <div
            style={{ width: columnWidths.date, minWidth: columnWidths.date }}
            className="flex items-center px-4 border-r whitespace-nowrap"
          >
            {campaign.date}
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
            style={{ width: columnWidths.externalId, minWidth: columnWidths.externalId }}
            className="flex items-center px-4 border-r whitespace-nowrap"
          >
            {campaign.externalId}
          </div>
          <div
            style={{ width: columnWidths.name, minWidth: columnWidths.name }}
            className="flex items-center px-4 border-r"
          >
            {campaign.name}
          </div>
          <div
            style={{ width: columnWidths.finalUrl, minWidth: columnWidths.finalUrl }}
            className="flex items-center px-4 border-r"
          >
            <a
              href={campaign.finalUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="block max-w-xs text-blue-600 hover:underline truncate"
              title={campaign.finalUrl || ''}
            >
              {campaign.finalUrl}
            </a>
          </div>
          <div
            style={{ width: columnWidths.status, minWidth: columnWidths.status }}
            className="flex items-center px-4 border-r"
          >
            {campaign.status}
          </div>
          <div
            style={{ width: columnWidths.avgCpc, minWidth: columnWidths.avgCpc }}
            className="flex items-center px-4 border-r"
          >
            {campaign.avgCpc}
          </div>
          <div
            style={{ width: columnWidths.targetCpc, minWidth: columnWidths.targetCpc }}
            className="flex items-center px-4 border-r"
          >
            {campaign.targetCpc}
          </div>
          <div
            style={{ width: columnWidths.campaignBudget, minWidth: columnWidths.campaignBudget }}
            className="flex items-center px-4 border-r"
          >
            {campaign.campaignBudget}
          </div>
          <div
            style={{ width: columnWidths.clicks, minWidth: columnWidths.clicks }}
            className="flex items-center px-4 border-r"
          >
            {campaign.clicks}
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
            style={{ width: columnWidths.keywords, minWidth: columnWidths.keywords }}
            className="flex items-center px-4 border-r"
          >
            {campaign.keywords.length > 0 && (
              <TableTooltip
                data={campaign.keywords.sort((a, b) => (b.cost || 0) - (a.cost || 0))}
                columns={[
                  { key: 'keyword', label: 'Từ khóa' },
                  { key: 'match', label: 'Hình thức' },
                  { key: 'bid', label: 'Bid' },
                  { key: 'clicks', label: 'Click' },
                  { key: 'impression', label: 'Lượt hiển thị' },
                  { key: 'ctr', label: 'CTR' },
                  { key: 'cpc', label: 'CPC' },
                  { key: 'cpm', label: 'CPM' },
                  { key: 'cost', label: 'Chi phí' },
                ]}
              />
            )}
          </div>
          <div
            style={{ width: columnWidths.negativeKeywords, minWidth: columnWidths.negativeKeywords }}
            className="flex items-center px-4 border-r"
          >
            {campaign.negativeKeywords.length > 0 && (
              <TableTooltip
                data={campaign.negativeKeywords}
                columns={[
                  { key: 'keyword', label: 'Từ khóa' },
                  { key: 'match', label: 'Hình thức' },
                ]}
              />
            )}
          </div>
          <div
            style={{ width: columnWidths.targetLocations, minWidth: columnWidths.targetLocations }}
            className="flex items-center px-4 border-r"
          >
            {campaign.targetLocations.length > 0 && (
              <TableTooltip
                data={campaign.targetLocations.map((l) => ({ name: l }))}
                columns={[{ key: 'name', label: 'Quốc gia' }]}
              />
            )}
          </div>
          <div
            style={{ width: columnWidths.locationExcluded, minWidth: columnWidths.locationExcluded }}
            className="flex items-center px-4 border-r"
          >
            {campaign.locationExcluded.length > 0 && (
              <TableTooltip
                data={campaign.locationExcluded.map((l) => ({ name: l }))}
                columns={[{ key: 'name', label: 'Quốc gia' }]}
              />
            )}
          </div>
          <div
            style={{ width: columnWidths.topSearchTerms, minWidth: columnWidths.topSearchTerms }}
            className="flex items-center px-4 border-r"
          >
            {campaign.topSearchTerms.length > 0 && (
              <TableTooltip
                data={campaign.topSearchTerms.sort((a, b) => (b.cost || 0) - (a.cost || 0))}
                columns={[
                  { key: 'term', label: 'Thuật ngữ' },
                  { key: 'cpc', label: 'CPC' },
                  { key: 'cost', label: 'Đã tiêu' },
                ]}
              />
            )}
          </div>
          <div
            style={{ width: columnWidths.locationStats, minWidth: columnWidths.locationStats }}
            className="flex items-center px-4 border-r"
          >
            {campaign.locationStats.length > 0 && (
              <TableTooltip
                data={campaign.locationStats.sort((a, b) => (b.cost || 0) - (a.cost || 0))}
                columns={[
                  { key: 'location', label: 'Quốc gia' },
                  { key: 'clicks', label: 'Click' },
                  { key: 'ctr', label: 'CTR' },
                  { key: 'cpc', label: 'CPC' },
                  { key: 'cost', label: 'Đã tiêu' },
                ]}
              />
            )}
          </div>
        </div>
      )
    },
    [campaigns, columnWidths],
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
                style={{ width: columnWidths.importAt, minWidth: columnWidths.importAt }}
                className="flex items-center px-4 border-r font-semibold"
              >
                Ngày kéo
              </div>
              <div
                style={{ width: columnWidths.date, minWidth: columnWidths.date }}
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
                style={{ width: columnWidths.externalId, minWidth: columnWidths.externalId }}
                className="flex items-center px-4 border-r font-semibold"
              >
                ID chiến dịch
              </div>
              <div
                style={{ width: columnWidths.name, minWidth: columnWidths.name }}
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
                style={{ width: columnWidths.status, minWidth: columnWidths.status }}
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
                style={{ width: columnWidths.targetCpc, minWidth: columnWidths.targetCpc }}
                className="flex items-center px-4 border-r font-semibold"
              >
                Thầu chung
              </div>
              <div
                style={{ width: columnWidths.campaignBudget, minWidth: columnWidths.campaignBudget }}
                className="flex items-center px-4 border-r font-semibold"
              >
                Ngân sách chiến dịch
              </div>
              <div
                style={{ width: columnWidths.clicks, minWidth: columnWidths.clicks }}
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
                style={{ width: columnWidths.keywords, minWidth: columnWidths.keywords }}
                className="flex items-center px-4 border-r font-semibold"
              >
                Từ khóa tìm kiếm
              </div>
              <div
                style={{ width: columnWidths.negativeKeywords, minWidth: columnWidths.negativeKeywords }}
                className="flex items-center px-4 border-r font-semibold"
              >
                Từ khóa không tìm kiếm
              </div>
              <div
                style={{ width: columnWidths.targetLocations, minWidth: columnWidths.targetLocations }}
                className="flex items-center px-4 border-r font-semibold"
              >
                Quốc gia mục tiêu
              </div>
              <div
                style={{ width: columnWidths.locationExcluded, minWidth: columnWidths.locationExcluded }}
                className="flex items-center px-4 border-r font-semibold"
              >
                Loại trừ quốc gia
              </div>
              <div
                style={{ width: columnWidths.topSearchTerms, minWidth: columnWidths.topSearchTerms }}
                className="flex items-center px-4 border-r font-semibold"
              >
                Thuật ngữ tìm kiếm
              </div>
              <div
                style={{ width: columnWidths.locationStats, minWidth: columnWidths.locationStats }}
                className="flex items-center px-4 border-r font-semibold"
              >
                Thống kê quốc gia
              </div>
            </div>
          </div>

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

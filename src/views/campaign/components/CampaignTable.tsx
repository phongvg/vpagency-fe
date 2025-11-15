import { useCampaignStore } from '@/views/campaign/store/useCampaignStore'
import Table from '@/components/ui/Table'
import { addDash } from '@/helpers/addDash'
import { Badge } from '@/components/ui'

const { Tr, Th, Td, THead, TBody } = Table

export default function CampaignTable() {
  const { campaigns } = useCampaignStore()

  return (
    <div className="relative max-h-[860px] overflow-auto">
      <Table className="relative" overflow={false}>
        <THead className="top-0 z-10 sticky">
          <Tr className="bg-slate-500">
            <Th className="bg-inherit border-r !text-white">STT</Th>
            <Th className="bg-inherit border-r !text-white">Ngày kéo</Th>
            <Th className="bg-inherit border-r !text-white">Ngày dữ liệu</Th>
            <Th className="bg-inherit border-r !text-white">UID</Th>
            <Th className="bg-inherit border-r !text-white">MCC</Th>
            <Th className="bg-inherit border-r !text-white">ID chiến dịch</Th>
            <Th className="bg-inherit border-r !text-white">Tên chiến dịch</Th>
            <Th className="bg-inherit border-r !text-white">URL cuối cùng</Th>
            <Th className="bg-inherit border-r !text-white">Từ khóa</Th>
            <Th className="bg-inherit border-r !text-white">Phù hợp</Th>
            <Th className="bg-inherit border-r !text-white">Thuật ngữ tìm kiếm</Th>
            <Th className="bg-inherit border-r !text-white">CPC tìm kiếm</Th>
            <Th className="bg-inherit border-r !text-white">Chi phí của từng CPC</Th>
            <Th className="bg-inherit border-r !text-white">Trạng thái chiến dịch</Th>
            <Th className="bg-inherit border-r !text-white">CPC trung bình</Th>
            <Th className="bg-inherit border-r !text-white">Thầu chung</Th>
            <Th className="bg-inherit border-r !text-white">Click</Th>
            <Th className="bg-inherit border-r !text-white">CTR</Th>
            <Th className="bg-inherit border-r !text-white">CPM</Th>
            <Th className="bg-inherit border-r !text-white">Ngân sách chi tiêu</Th>
            <Th className="bg-inherit border-r !text-white">Mục tiêu quốc gia</Th>
            <Th className="bg-inherit border-r !text-white">Quốc gia cắn tiền</Th>
            <Th className="bg-inherit border-r !text-white">CPC quốc gia</Th>
            <Th className="bg-inherit border-r !text-white">CTR quốc gia</Th>
            <Th className="bg-inherit border-r !text-white">Click quốc gia</Th>
            <Th className="bg-inherit !text-white">Tổng chi tiêu quốc gia</Th>
          </Tr>
        </THead>
        <TBody>
          {campaigns.map((campaign, index) => (
            <Tr key={campaign.campaignId}>
              <Td className="border-r">{index + 1}</Td>
              <Td className="border-r whitespace-nowrap">{campaign.datePull}</Td>
              <Td className="border-r whitespace-nowrap">{campaign.dateData}</Td>
              <Td className="border-r whitespace-nowrap">{addDash(campaign.uid)}</Td>
              <Td className="border-r whitespace-nowrap">{addDash(campaign.mcc)}</Td>
              <Td className="border-r whitespace-nowrap">{addDash(campaign.campaignId)}</Td>
              <Td className="border-r">{campaign.campaignName}</Td>
              <Td className="border-r">
                <a href={campaign.finalUrl || '#'} target="_blank" rel="noopener noreferrer">
                  {campaign.finalUrl}
                </a>
              </Td>
              <Td className="border-r">{campaign.keyword.join(', ')}</Td>
              <Td className="border-r">{campaign.match.join(', ')}</Td>
              <Td className="border-r">
                <div className="flex flex-wrap gap-1 w-[300px]">
                  {campaign.searchTerm.map((item) => (
                    <Badge key={item} content={item} />
                  ))}
                </div>
              </Td>
              <Td className="border-r">
                <div className="flex flex-wrap gap-1 w-[300px]">
                  {campaign.cpcSearchTerm.map((item) => (
                    <Badge key={item} content={item} />
                  ))}
                </div>
              </Td>
              <Td className="border-r">
                <div className="flex flex-wrap gap-1 w-[300px]">
                  {campaign.costSearchTerm.map((item) => (
                    <Badge key={item} content={item} />
                  ))}
                </div>
              </Td>
              <Td className="border-r">{campaign.statusCampaign}</Td>
              <Td className="border-r">{campaign.avgCpc}</Td>
              <Td className="border-r">{campaign.micros}</Td>
              <Td className="border-r">{campaign.click}</Td>
              <Td className="border-r">{campaign.ctr}</Td>
              <Td className="border-r">{campaign.cpm}</Td>
              <Td className="border-r">{campaign.cost}</Td>
              <Td className="border-r">
                <div className="flex flex-wrap gap-1 w-[300px]">
                  {campaign.locationTarget.map((item) => (
                    <Badge key={item} content={item} />
                  ))}
                </div>
              </Td>
              <Td className="border-r">{campaign.spendingCountry}</Td>
              <Td className="border-r">{campaign.cpcCountry}</Td>
              <Td className="border-r">{campaign.ctrCountry}</Td>
              <Td className="border-r">{campaign.clickCountry}</Td>
              <Td>{campaign.costCountry}</Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </div>
  )
}

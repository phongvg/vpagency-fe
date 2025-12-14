import { Button } from '@/components/ui'
import CampaignStatsModal from '@/views/tasks/assign/components/CampaignStatsModal'
import { FinalURLGroup } from '@/views/tasks/assign/types/task.type'
import { useState } from 'react'
import { HiOutlinePlus } from 'react-icons/hi'

type Props = {
  taskId: string
  finalUrls: FinalURLGroup[]
}

export default function UpdateFinalUrlMetric({ taskId, finalUrls }: Props) {
  const [isCampaignStatsModalOpen, setIsCampaignStatsModalOpen] = useState(false)
  const [selectedFinalUrlId, setSelectedFinalUrlId] = useState<string | null>(null)

  const handleOpenCampaignStatsModal = (finalUrlId: string) => {
    setSelectedFinalUrlId(finalUrlId)
    setIsCampaignStatsModalOpen(true)
  }

  const onCloseCampaignStatsModal = () => {
    setIsCampaignStatsModalOpen(false)
    setSelectedFinalUrlId(null)
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold">Danh sách URL ({finalUrls.length})</h4>
        <div className="flex gap-2">
          <Button type="button" variant="solid" size="sm" icon={<HiOutlinePlus />}>
            Thêm URL
          </Button>
        </div>
      </div>

      <div className="relative max-h-[500px] overflow-y-auto">
        <div className="top-0 z-10 sticky gap-2 grid grid-cols-5 bg-gray-50 p-2 border-b">
          <div className="px-4 py-3 border-r font-bold text-sm text-left">STT</div>
          <div className="col-span-2 px-4 py-3 border-r font-bold text-sm text-left">URL</div>
          <div className="col-span-2 px-4 py-3 font-bold text-sm text-right">Thao tác</div>
        </div>

        {finalUrls.map((group, index) => (
          <div key={group.finalUrlId} className="items-center gap-2 grid grid-cols-5 p-2 border-b">
            <div className="px-4 py-3 border-r text-left">{index + 1}</div>
            <div className="col-span-2 px-4 py-3 border-r text-left">
              <p className="text-black text-sm">{group.finalUrlName}</p>
              <a
                href={group.finalURL}
                target="_blank"
                className="block max-w-full text-blue-600 hover:underline truncate"
                rel="noreferrer"
                title={group.finalURL}
              >
                {group.finalURL}
              </a>
            </div>
            <div className="col-span-2 px-4 py-3 text-right">
              <Button size="xs" variant="twoTone" onClick={() => handleOpenCampaignStatsModal(group.finalUrlId)}>
                Cập nhật số liệu ({group.totalCampaignDailyStats})
              </Button>
            </div>
          </div>
        ))}
      </div>

      <CampaignStatsModal
        isOpen={isCampaignStatsModalOpen}
        taskId={taskId}
        finalUrlId={selectedFinalUrlId}
        onClose={onCloseCampaignStatsModal}
      />
    </>
  )
}

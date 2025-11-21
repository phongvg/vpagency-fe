import { Button, Dialog, Input } from '@/components/ui'
import SelectCustom from '@/components/shared/SelectCustom'
import { useGetTaskProgress, useUpdateTaskProgress } from '@/views/tasks/assign/hooks/useTask'
import { useGetCampaignsQuery } from '@/views/campaign/hooks/useCampaign'
import { useEffect, useState } from 'react'
import { HiOutlineCheckCircle } from 'react-icons/hi'
import { UrlMapping } from '@/views/tasks/assign/types/task.type'

type Props = {
  isOpen: boolean
  taskId: string
  onClose: () => void
}

export default function UpdateProgressModal({ isOpen, taskId, onClose }: Props) {
  const [progress, setProgress] = useState(0)
  const [urlMappings, setUrlMappings] = useState<UrlMapping[]>([])

  const { data: currentProgress } = useGetTaskProgress(taskId, isOpen)
  const { data: campaignData } = useGetCampaignsQuery(isOpen)

  const updateProgressMutation = useUpdateTaskProgress()

  useEffect(() => {
    if (currentProgress !== undefined && isOpen) {
      setProgress(currentProgress.progress || 0)

      if (currentProgress.finalUrls) {
        setUrlMappings(
          currentProgress.finalUrls.map((url) => ({
            finalUrlId: url.id,
            campaignIds: url.campaigns?.map((c) => c.id) || [],
          })),
        )
      }
    }
  }, [currentProgress, isOpen])

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    const numValue = parseInt(value)
    setProgress(numValue)
  }

  const handleConfirm = async () => {
    const payload = {
      progress,
      urlMappings: urlMappings
        .filter((mapping) => mapping.campaignIds.length > 0)
        .map((mapping) => ({
          campaignIds: mapping.campaignIds,
          finalUrlId: mapping.finalUrlId,
        })),
    }

    await updateProgressMutation.mutateAsync({ taskId, payload })
    onClose()
  }

  const handleClose = () => {
    setProgress(0)
    setUrlMappings([])
    onClose()
  }

  const handleCampaignChange = (finalUrlId: string, campaignIds: string[]) => {
    setUrlMappings((prev) =>
      prev.map((mapping) => (mapping.finalUrlId === finalUrlId ? { ...mapping, campaignIds } : mapping)),
    )
  }

  const campaignOptions =
    campaignData?.items?.map((campaign) => ({
      value: campaign.id,
      label: `${campaign.externalId} | ${campaign.name} | ${campaign.uid}(UID)` || '',
    })) || []

  const getSelectedCampaigns = (campaignIds: string[]) => {
    return campaignIds
      .map((id) => campaignOptions.find((opt) => opt.value === id))
      .filter((opt): opt is { value: string; label: string } => opt !== undefined)
  }

  return (
    <Dialog isOpen={isOpen} width={900} onClose={handleClose} onRequestClose={handleClose}>
      <div className="p-2">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex justify-center items-center bg-blue-100 rounded-full w-12 h-12">
            <HiOutlineCheckCircle className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">Cập nhật tiến độ</h3>
            <p className="text-gray-500 text-sm line-clamp-1">{currentProgress?.name}</p>
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700 text-sm">Tiến độ hoàn thành (%)</label>
          <Input
            type="number"
            min="0"
            max="100"
            value={progress}
            placeholder="Nhập tiến độ từ 0-100"
            suffix={<span className="text-gray-500">%</span>}
            onChange={handleProgressChange}
          />

          <div className="flex gap-2 mt-3">
            {[0, 25, 50, 75, 100].map((value) => (
              <Button
                key={value}
                size="xs"
                variant={progress === value ? 'solid' : 'plain'}
                onClick={() => setProgress(value)}
              >
                {value}%
              </Button>
            ))}
          </div>
        </div>

        {currentProgress?.finalUrls && currentProgress.finalUrls.length > 0 && (
          <div className="mb-6">
            <h4 className="mb-3 font-semibold">Danh sách URL</h4>
            <div className="border rounded-lg">
              <table className="divide-y divide-gray-200 min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 font-medium text-sm text-left">URL</th>
                    <th className="px-4 py-3 w-64 font-medium text-sm text-left">Chiến dịch</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentProgress.finalUrls.map((url) => {
                    const mapping = urlMappings.find((m) => m.finalUrlId === url.id)
                    return (
                      <tr key={url.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">
                          <div className="font-medium text-gray-900">{url.name}</div>
                          <div className="max-w-md text-gray-500 text-xs truncate">{url.finalURL}</div>
                        </td>
                        <td className="px-4 py-3">
                          <SelectCustom
                            isMulti
                            size="sm"
                            placeholder="Chọn chiến dịch"
                            options={campaignOptions}
                            value={getSelectedCampaigns(mapping?.campaignIds || [])}
                            onChange={(campaignIds: any) => {
                              handleCampaignChange(url.id, Array.isArray(campaignIds) ? campaignIds : [])
                            }}
                          />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3">
          <Button variant="default" disabled={updateProgressMutation.isPending} size="sm" onClick={handleClose}>
            Hủy
          </Button>
          <Button
            variant="solid"
            disabled={updateProgressMutation.isPending}
            loading={updateProgressMutation.isPending}
            size="sm"
            onClick={handleConfirm}
          >
            Cập nhật
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

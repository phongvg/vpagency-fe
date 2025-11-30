import { Button, DatePicker, Dialog, Input } from '@/components/ui'
import SelectCustom, { OptionType, SelectParams } from '@/components/shared/SelectCustom'
import { useGetTaskProgress, useUpdateTaskProgress, useUpdateTask } from '@/views/tasks/assign/hooks/useTask'
import { useEffect, useState } from 'react'
import { HiOutlineCheckCircle, HiOutlineMinus, HiOutlinePlus } from 'react-icons/hi'
import { FinalURLGroup } from '@/views/tasks/assign/types/task.type'
import { addDash } from '@/helpers/addDash'
import { apiGetMyGmails } from '@/views/gmailAccounts/services/GmailAccountService'
import { useCreateFinalUrlMutation } from '@/views/projects/hooks/useFinalUrl'
import { apiGetCampaignsByDate, apiGetCampaignsByDateAndUid } from '@/views/campaign/services/CampaignService'
import { formatDate } from '@/helpers/formatDate'

type Props = {
  isOpen: boolean
  taskId: string
  onClose: () => void
}

export default function UpdateProgressModal({ isOpen, taskId, onClose }: Props) {
  const [progress, setProgress] = useState(0)
  const [uidOptions, setUidOptions] = useState<OptionType[]>()
  const [campaignOptionsMap, setCampaignOptionsMap] = useState<Record<string, OptionType[]>>({})
  const [finalUrlGroups, setFinalUrlGroups] = useState<FinalURLGroup[]>([])
  const [dataDate, setDataDate] = useState<Date | null>(null)
  const [isAddingUrl, setIsAddingUrl] = useState(false)
  const [newUrlName, setNewUrlName] = useState('')
  const [newUrlFinalURL, setNewUrlFinalURL] = useState('')
  const [finalUrlIds, setFinalUrlIds] = useState<string[]>([])

  const { data: currentProgress } = useGetTaskProgress(taskId, isOpen)
  const updateProgressMutation = useUpdateTaskProgress()
  const updateTaskMutation = useUpdateTask()
  const createFinalUrlMutation = useCreateFinalUrlMutation()

  useEffect(() => {
    if (currentProgress !== undefined && isOpen) {
      setProgress(currentProgress.progress || 0)
      if (currentProgress.finalUrlGroups && currentProgress.finalUrlGroups.length > 0) {
        const normalizedGroups = currentProgress.finalUrlGroups.map((group) => ({
          ...group,
          items: group.items && group.items.length > 0 ? group.items : [{ uid: '', campaignIds: [], gmailId: '' }],
        }))
        setFinalUrlGroups(normalizedGroups)
        setFinalUrlIds(currentProgress.finalUrlGroups.map((group) => group.finalUrlId))
        const firstDate = currentProgress.finalUrlGroups[0]?.date
        if (firstDate) {
          setDataDate(new Date(firstDate))
        }
      }
    }
  }, [currentProgress, isOpen])

  const handleCreateUrl = async () => {
    if (!newUrlName || !newUrlFinalURL) return

    const res = await createFinalUrlMutation.mutateAsync({
      name: newUrlName,
      finalURL: newUrlFinalURL,
      projectId: currentProgress?.projectId,
    })

    const newId = res.data.data.id
    if (newId) {
      const updatedIds = [...finalUrlIds, newId]
      setFinalUrlIds(updatedIds)
      await updateTaskMutation.mutateAsync({ taskId, data: { finalUrlIds: updatedIds } })
      setIsAddingUrl(false)
      setNewUrlName('')
      setNewUrlFinalURL('')
    }
  }

  const handleCancelAddUrl = () => {
    setIsAddingUrl(false)
    setNewUrlName('')
    setNewUrlFinalURL('')
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const numValue = parseInt(value)
    setProgress(numValue)
  }

  const handleConfirm = async () => {
    const payload = {
      progress,
      finalUrlGroups: finalUrlGroups
        .filter((group) => group.items.some((item) => item.uid && item.gmailId))
        .map((group) => ({
          finalUrlId: group.finalUrlId,
          date: formatDate(group.date, 'YYYY-MM-DD'),
          items: group.items
            .filter((item) => item.uid && item.gmailId)
            .map((item) => ({
              uid: item.uid,
              gmailId: item.gmailId,
              ...(item.campaignIds && item.campaignIds.length > 0 && { campaignIds: item.campaignIds }),
            })),
        })),
    }

    await updateProgressMutation.mutateAsync({ taskId, payload })
    onClose()
  }

  const handleClose = () => {
    setProgress(0)
    setFinalUrlGroups([])
    setDataDate(null)
    onClose()
  }

  const handleDataDateChange = async (date: Date | null) => {
    setDataDate(date)
    setUidOptions([])
    setCampaignOptionsMap({})

    if (!date) return

    setFinalUrlGroups((prev) =>
      prev.map((group) => ({
        ...group,
        date: formatDate(date, 'YYYY-MM-DD'),
        items: group.items.map(() => ({
          uid: '',
          campaignIds: [],
          gmailId: '',
        })),
      })),
    )

    const response = await apiGetCampaignsByDate(formatDate(date, 'YYYY-MM-DD'))
    const { items } = response.data.data

    setUidOptions(
      items.map((uid) => ({
        value: uid,
        label: addDash(uid),
      })),
    )
  }

  const handleUidChange = async (finalUrlId: string, itemIndex: number, uid: string) => {
    setFinalUrlGroups((prev) =>
      prev.map((group) =>
        group.finalUrlId === finalUrlId
          ? {
              ...group,
              items: group.items.map((item, idx) => (idx === itemIndex ? { ...item, uid, campaignIds: [] } : item)),
            }
          : group,
      ),
    )

    if (!uid || !dataDate) return

    const key = `${finalUrlId}-${itemIndex}`

    const response = await apiGetCampaignsByDateAndUid(formatDate(dataDate, 'YYYY-MM-DD'), uid)
    const { items } = response.data.data

    const mapped = items.map((c) => ({
      value: c.id,
      label: `${c.name}`,
    }))

    setCampaignOptionsMap((prev) => ({ ...prev, [key]: mapped }))
  }

  const fetchMyGmails = async ({ page, limit, search }: SelectParams) => {
    try {
      const response = await apiGetMyGmails({ page, limit, search: search || '' })
      const { data } = response.data
      return {
        data: data.map((gmail) => ({
          value: gmail.id,
          label: gmail.name,
        })),
        total: data.length,
        hasMore: false,
      }
    } catch {
      return { data: [], total: 0, hasMore: false }
    }
  }

  const handleCampaignChange = (finalUrlId: string, itemIndex: number, campaignIds: string[]) => {
    setFinalUrlGroups((prev) =>
      prev.map((group) =>
        group.finalUrlId === finalUrlId
          ? {
              ...group,
              items: group.items.map((item, idx) => (idx === itemIndex ? { ...item, campaignIds } : item)),
            }
          : group,
      ),
    )
  }

  const handleGmailChange = (finalUrlId: string, itemIndex: number, gmailId: string) => {
    setFinalUrlGroups((prev) =>
      prev.map((group) =>
        group.finalUrlId === finalUrlId
          ? {
              ...group,
              items: group.items.map((item, idx) => (idx === itemIndex ? { ...item, gmailId } : item)),
            }
          : group,
      ),
    )
  }

  const addNewItem = (finalUrlId: string) => {
    setFinalUrlGroups((prev) =>
      prev.map((group) =>
        group.finalUrlId === finalUrlId
          ? {
              ...group,
              items: [
                ...group.items,
                {
                  uid: '',
                  campaignIds: [],
                  gmailId: '',
                },
              ],
            }
          : group,
      ),
    )
  }

  const removeItem = (finalUrlId: string, itemIndex: number) => {
    setFinalUrlGroups((prev) =>
      prev.map((group) =>
        group.finalUrlId === finalUrlId
          ? {
              ...group,
              items: group.items.filter((_, idx) => idx !== itemIndex),
            }
          : group,
      ),
    )
  }

  return (
    <Dialog isOpen={isOpen} width={1400} className="max-w-[1400px]" onClose={handleClose} onRequestClose={handleClose}>
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
          min={0}
          max={100}
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

      {finalUrlGroups.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold">Danh sách URL</h4>
            <div className="flex gap-2">
              <DatePicker
                size="sm"
                value={dataDate}
                inputFormat="DD/MM/YYYY"
                placeholder="Chọn ngày dữ liệu"
                onChange={handleDataDateChange}
              />
              <Button
                type="button"
                variant="solid"
                size="sm"
                icon={<HiOutlinePlus />}
                onClick={() => setIsAddingUrl(true)}
              >
                Thêm URL
              </Button>
            </div>
          </div>
          {isAddingUrl && (
            <div className="bg-white mb-4 p-4 border border-gray-200 rounded-lg">
              <h6 className="mb-3 font-semibold text-gray-900">Thêm URL mới</h6>
              <div className="space-y-3">
                <div>
                  <label className="block mb-1 font-medium text-sm">Tên URL</label>
                  <Input placeholder="Nhập tên..." value={newUrlName} onChange={(e) => setNewUrlName(e.target.value)} />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-sm">URL</label>
                  <Input
                    placeholder="https://example.com"
                    value={newUrlFinalURL}
                    onChange={(e) => setNewUrlFinalURL(e.target.value)}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="plain" onClick={handleCancelAddUrl}>
                    Hủy
                  </Button>
                  <Button
                    type="button"
                    disabled={!newUrlName || !newUrlFinalURL}
                    loading={createFinalUrlMutation.isPending}
                    size="sm"
                    variant="solid"
                    onClick={handleCreateUrl}
                  >
                    Lưu
                  </Button>
                </div>
              </div>
            </div>
          )}
          <div className="gap-2 grid grid-cols-5 p-2 border-b">
            <div className="px-4 py-3 font-bold text-sm text-left">URL</div>
            <div className="px-4 py-3 font-bold text-sm text-left">UID</div>
            <div className="px-4 py-3 font-bold text-sm text-left">Chiến dịch</div>
            <div className="px-4 py-3 font-bold text-sm text-left">Gmail</div>
            <div className="px-4 py-3 font-bold text-sm text-left">Thao tác</div>
          </div>
          {finalUrlGroups.map((group) => (
            <div key={group.finalUrlId} className="border-b last:border-b-0">
              {group.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="items-center gap-2 grid grid-cols-5 p-2 border-gray-100 border-b last:border-b-0"
                >
                  {itemIndex === 0 && (
                    <div
                      className="px-4 py-3 text-sm text-left"
                      style={{ gridRowStart: 1, gridRowEnd: (group.items.length > 0 ? group.items.length : 1) + 1 }}
                    >
                      <div className="font-medium text-gray-900">{group.finalUrlName}</div>
                      <a
                        href={group.finalURL}
                        className="block max-w-sm text-blue-600 hover:underline truncate"
                        target="_blank"
                        rel="noopener noreferrer"
                        title={group.finalURL}
                      >
                        {group.finalURL}
                      </a>
                    </div>
                  )}
                  {itemIndex > 0 && <div></div>}
                  <div className="px-4 py-3 text-sm">
                    <SelectCustom
                      size="sm"
                      placeholder="Chọn UID"
                      options={uidOptions}
                      value={item.uid as any}
                      isDisabled={!dataDate}
                      onChange={(uid: any) => {
                        handleUidChange(group.finalUrlId, itemIndex, uid || '')
                      }}
                    />
                  </div>
                  <div className="px-4 py-3 text-sm">
                    <SelectCustom
                      isMulti
                      size="sm"
                      placeholder="Chọn chiến dịch"
                      options={campaignOptionsMap[`${group.finalUrlId}-${itemIndex}`] || []}
                      isDisabled={!dataDate}
                      value={item.campaignIds as any}
                      onChange={(campaignIds: any) => {
                        handleCampaignChange(group.finalUrlId, itemIndex, campaignIds || [])
                      }}
                    />
                  </div>
                  <div className="px-4 py-3 text-sm">
                    <SelectCustom
                      size="sm"
                      placeholder="Chọn Gmail"
                      fetchOptions={fetchMyGmails}
                      isDisabled={!dataDate}
                      value={item.gmailId as any}
                      onChange={(gmailId: any) => {
                        handleGmailChange(group.finalUrlId, itemIndex, gmailId || '')
                      }}
                    />
                  </div>
                  <div className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        size="xs"
                        variant="solid"
                        icon={<HiOutlinePlus />}
                        onClick={() => addNewItem(group.finalUrlId)}
                      />
                      {group.items.length > 1 && (
                        <Button
                          type="button"
                          size="xs"
                          variant="default"
                          icon={<HiOutlineMinus />}
                          onClick={() => removeItem(group.finalUrlId, itemIndex)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end gap-3">
        <Button type="button" variant="default" disabled={updateProgressMutation.isPending} onClick={handleClose}>
          Hủy
        </Button>
        <Button
          variant="solid"
          disabled={updateProgressMutation.isPending}
          loading={updateProgressMutation.isPending}
          onClick={handleConfirm}
        >
          Cập nhật
        </Button>
      </div>
    </Dialog>
  )
}

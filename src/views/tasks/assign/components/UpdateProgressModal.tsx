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
import {
  useAssignCampaignsToFinalUrlMutation,
  useRemoveCampaignsFromFinalUrlMutation,
} from '@/views/campaign/hooks/useCampaign'
import { toastWarning } from '@/utils/toast'

type Props = {
  isOpen: boolean
  taskId: string
  onClose: () => void
}

type ItemState = {
  date: Date | null
  uid: string
  campaignIds: string[]
  gmailId: string
  uidOptions: OptionType[]
  campaignOptions: OptionType[]
}

type RowState = {
  items: ItemState[]
}

export default function UpdateProgressModal({ isOpen, taskId, onClose }: Props) {
  const [progress, setProgress] = useState(0)
  const [finalUrlGroups, setFinalUrlGroups] = useState<FinalURLGroup[]>([])
  const [rowStates, setRowStates] = useState<Record<string, RowState>>({})
  const [isAddingUrl, setIsAddingUrl] = useState(false)
  const [newUrlName, setNewUrlName] = useState('')
  const [newUrlFinalURL, setNewUrlFinalURL] = useState('')
  const [finalUrlIds, setFinalUrlIds] = useState<string[]>([])

  const { data: currentProgress } = useGetTaskProgress(taskId, isOpen)
  const updateProgressMutation = useUpdateTaskProgress()
  const updateTaskMutation = useUpdateTask()
  const createFinalUrlMutation = useCreateFinalUrlMutation()
  const assignMutation = useAssignCampaignsToFinalUrlMutation()
  const removeMutation = useRemoveCampaignsFromFinalUrlMutation()

  useEffect(() => {
    if (currentProgress !== undefined && isOpen) {
      setProgress(currentProgress.progress || 0)
      if (currentProgress.finalUrls && currentProgress.finalUrls.length > 0) {
        const normalizedGroups = currentProgress.finalUrls.map((group) => ({
          ...group,
          items: group.items && group.items.length > 0 ? group.items : [{ uid: '', campaignIds: [], gmailId: '' }],
        }))
        setFinalUrlGroups(normalizedGroups)
        setFinalUrlIds(currentProgress.finalUrls.map((group) => group.finalUrlId))

        const initialRowStates: Record<string, RowState> = {}
        normalizedGroups.forEach((group) => {
          initialRowStates[group.finalUrlId] = {
            items: group.items.map((item) => ({
              date: group.date ? new Date(group.date) : null,
              uid: item.uid || '',
              campaignIds: item.campaignIds || [],
              gmailId: item.gmailId || '',
              uidOptions: [],
              campaignOptions: [],
            })),
          }
        })
        setRowStates(initialRowStates)
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

  const handleAssignItem = async (finalUrlId: string, itemIndex: number) => {
    const rowState = rowStates[finalUrlId]

    if (!rowState) {
      return
    }

    const item = rowState.items[itemIndex]
    if (!item.date) {
      toastWarning('Vui lòng chọn ngày')
      return
    }

    if (!item.uid) {
      toastWarning('Vui lòng chọn UID')
      return
    }

    if (!item.gmailId) {
      toastWarning('Vui lòng chọn Gmail')
      return
    }

    const payload = {
      finalUrlId: finalUrlId,
      gmailId: item.gmailId,
      date: formatDate(item.date, 'YYYY-MM-DD'),
      uid: item.uid,
      ...(item.campaignIds && item.campaignIds.length > 0 && { campaignIds: item.campaignIds }),
    }

    await assignMutation.mutateAsync(payload)
  }

  const handleUpdateProgress = async () => {
    await updateProgressMutation.mutateAsync({
      taskId,
      payload: { progress },
    })
    handleClose()
  }

  const handleClose = () => {
    setProgress(0)
    setFinalUrlGroups([])
    setRowStates({})
    onClose()
  }

  const handleDateChange = async (finalUrlId: string, itemIndex: number, date: Date | null) => {
    setRowStates((prev) => ({
      ...prev,
      [finalUrlId]: {
        ...prev[finalUrlId],
        items: prev[finalUrlId].items.map((item, idx) =>
          idx === itemIndex
            ? {
                ...item,
                date,
                uid: '',
                campaignIds: [],
                uidOptions: [],
                campaignOptions: [],
              }
            : item,
        ),
      },
    }))

    if (!date) return

    const response = await apiGetCampaignsByDate(formatDate(date, 'YYYY-MM-DD'))
    const { items } = response.data.data

    setRowStates((prev) => ({
      ...prev,
      [finalUrlId]: {
        ...prev[finalUrlId],
        items: prev[finalUrlId].items.map((item, idx) =>
          idx === itemIndex
            ? {
                ...item,
                uidOptions: items.map((uid) => ({
                  value: uid,
                  label: addDash(uid),
                })),
              }
            : item,
        ),
      },
    }))
  }

  const handleUidChange = async (finalUrlId: string, itemIndex: number, uid: string) => {
    const rowState = rowStates[finalUrlId]
    if (!rowState) return

    const item = rowState.items[itemIndex]

    setRowStates((prev) => ({
      ...prev,
      [finalUrlId]: {
        ...prev[finalUrlId],
        items: prev[finalUrlId].items.map((it, idx) => (idx === itemIndex ? { ...it, uid, campaignIds: [] } : it)),
      },
    }))

    if (!uid || !item?.date) return

    const response = await apiGetCampaignsByDateAndUid(formatDate(item.date, 'YYYY-MM-DD'), uid)
    const { items } = response.data.data

    const mapped = items.map((c) => ({
      value: c.id,
      label: `${c.name}`,
    }))

    setRowStates((prev) => ({
      ...prev,
      [finalUrlId]: {
        ...prev[finalUrlId],
        items: prev[finalUrlId].items.map((it, idx) => (idx === itemIndex ? { ...it, campaignOptions: mapped } : it)),
      },
    }))
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
    setRowStates((prev) => ({
      ...prev,
      [finalUrlId]: {
        ...prev[finalUrlId],
        items: prev[finalUrlId].items.map((it, idx) => (idx === itemIndex ? { ...it, campaignIds } : it)),
      },
    }))
  }

  const handleGmailChange = (finalUrlId: string, itemIndex: number, gmailId: string) => {
    setRowStates((prev) => ({
      ...prev,
      [finalUrlId]: {
        ...prev[finalUrlId],
        items: prev[finalUrlId].items.map((it, idx) => (idx === itemIndex ? { ...it, gmailId } : it)),
      },
    }))
  }

  const addNewItem = (finalUrlId: string) => {
    setRowStates((prev) => ({
      ...prev,
      [finalUrlId]: {
        ...prev[finalUrlId],
        items: [
          ...prev[finalUrlId].items,
          {
            date: null,
            uid: '',
            campaignIds: [],
            gmailId: '',
            uidOptions: [],
            campaignOptions: [],
          },
        ],
      },
    }))
  }

  const isItemAssigned = (finalUrlId: string, itemIndex: number) => {
    if (!currentProgress?.finalUrls) return false

    const progressGroup = currentProgress.finalUrls.find((g) => g.finalUrlId === finalUrlId)
    if (!progressGroup || !progressGroup.items || progressGroup.items.length === 0) return false

    const rowState = rowStates[finalUrlId]
    if (!rowState) return false

    const item = rowState.items[itemIndex]
    if (!item || !item.uid || !item.gmailId) return false

    return progressGroup.items.some(
      (progressItem) => progressItem.uid === item.uid && progressItem.gmailId === item.gmailId,
    )
  }

  const handleRemoveItem = async (finalUrlId: string, itemIndex: number) => {
    const rowState = rowStates[finalUrlId]

    if (!rowState) {
      return
    }

    const item = rowState.items[itemIndex]
    if (!item || !item.uid) {
      removeItemFromState(finalUrlId, itemIndex)
      return
    }

    const payload = {
      finalUrlId: finalUrlId,
      date: formatDate(item.date, 'YYYY-MM-DD'),
      uid: item.uid,
      ...(item.campaignIds && item.campaignIds.length > 0 && { campaignIds: item.campaignIds }),
    }

    await removeMutation.mutateAsync(payload)
  }

  const removeItemFromState = (finalUrlId: string, itemIndex: number) => {
    setRowStates((prev) => ({
      ...prev,
      [finalUrlId]: {
        ...prev[finalUrlId],
        items: prev[finalUrlId].items.filter((_, idx) => idx !== itemIndex),
      },
    }))
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
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">Danh sách URL</h4>
            <div className="flex gap-2">
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
          <div className="gap-2 grid grid-cols-6 p-2 border-b">
            <div className="px-4 py-3 font-bold text-sm text-left">URL</div>
            <div className="px-4 py-3 font-bold text-sm text-left">Ngày</div>
            <div className="px-4 py-3 font-bold text-sm text-left">UID</div>
            <div className="px-4 py-3 font-bold text-sm text-left">Chiến dịch</div>
            <div className="px-4 py-3 font-bold text-sm text-left">Gmail</div>
            <div className="px-4 py-3 font-bold text-sm text-left">Thao tác</div>
          </div>
          {finalUrlGroups.map((group) => {
            const rowState = rowStates[group.finalUrlId]
            if (!rowState) return null

            return (
              <div key={group.finalUrlId} className="border-b last:border-b-0">
                {rowState.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="items-center gap-2 grid grid-cols-6 p-2 border-gray-100 border-b last:border-b-0"
                  >
                    {itemIndex === 0 && (
                      <div
                        className="px-4 py-3 text-sm text-left"
                        style={{
                          gridRowStart: 1,
                          gridRowEnd: (rowState.items.length > 0 ? rowState.items.length : 1) + 1,
                        }}
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
                      <DatePicker
                        size="sm"
                        value={item.date}
                        inputFormat="DD/MM/YYYY"
                        placeholder="Chọn ngày"
                        onChange={(date) => handleDateChange(group.finalUrlId, itemIndex, date)}
                      />
                    </div>

                    <div className="px-4 py-3 text-sm">
                      <SelectCustom
                        size="sm"
                        placeholder="Chọn UID"
                        options={item.uidOptions}
                        value={item.uid as any}
                        isDisabled={!item.date}
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
                        options={item.campaignOptions}
                        isDisabled={!item.date}
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
                        isDisabled={!item.date}
                        value={item.gmailId as any}
                        onChange={(gmailId: any) => {
                          handleGmailChange(group.finalUrlId, itemIndex, gmailId || '')
                        }}
                      />
                    </div>
                    <div className="px-4 py-3 text-sm">
                      <div className="flex gap-2">
                        {isItemAssigned(group.finalUrlId, itemIndex) ? (
                          <>
                            <Button
                              type="button"
                              size="xs"
                              variant="twoTone"
                              icon={<HiOutlinePlus />}
                              onClick={() => addNewItem(group.finalUrlId)}
                            />
                            <Button
                              type="button"
                              size="xs"
                              variant="default"
                              loading={removeMutation.isPending}
                              icon={<HiOutlineMinus />}
                              onClick={() => handleRemoveItem(group.finalUrlId, itemIndex)}
                            />
                          </>
                        ) : (
                          <>
                            <Button
                              type="button"
                              size="xs"
                              variant="solid"
                              loading={assignMutation.isPending}
                              onClick={() => handleAssignItem(group.finalUrlId, itemIndex)}
                            >
                              Lưu
                            </Button>
                            <Button
                              type="button"
                              size="xs"
                              variant="twoTone"
                              icon={<HiOutlinePlus />}
                              onClick={() => addNewItem(group.finalUrlId)}
                            />
                            {rowState.items.length > 1 && (
                              <Button
                                type="button"
                                size="xs"
                                variant="default"
                                icon={<HiOutlineMinus />}
                                onClick={() => handleRemoveItem(group.finalUrlId, itemIndex)}
                              />
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      )}

      <div className="flex justify-end gap-3">
        <Button type="button" variant="default" onClick={handleClose}>
          Hủy
        </Button>
        <Button
          variant="solid"
          disabled={updateProgressMutation.isPending}
          loading={updateProgressMutation.isPending}
          onClick={handleUpdateProgress}
        >
          Cập nhật tiến độ
        </Button>
      </div>
    </Dialog>
  )
}

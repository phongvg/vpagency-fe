import { useEffect, useState, useMemo } from 'react'
import { Button, Dialog, Input, Spinner, Badge, Avatar } from '@/components/ui'
import { HiOutlineCheckCircle, HiOutlinePencilAlt } from 'react-icons/hi'
import { useQuery } from '@tanstack/react-query'
import { apiGetAdsGroupByTaskId } from '@/services/TaskService'
import { AdsAccount } from '@/@types/adsAccount'
import { AdsAccountStatusLabels, AdsAccountStatusColors } from '@/enums/adsAccount.enum'
import { DataTable } from '@/components/shared'
import { ColumnDef } from '@tanstack/react-table'
import { formatVietnameseMoney } from '@/helpers/formatVietnameseMoney'
import { formatDate } from '@/helpers/formatDate'
import DailyMetricForm from '@/views/adsAccounts/pages/adsAccountDetail/components/DailyMetricForm'
import { GET_ADS_GROUP_BY_TASK_ID } from '@/utils/queryKey'
import { useGetAdsGroupByTaskId } from '@/views/tasks/assign/hooks/useTaskQueries'

const ManagerColumn = ({ row }: { row: AdsAccount }) => {
  if (!row.manager) {
    return <span className="text-gray-400">Chưa có</span>
  }

  return (
    <div className="flex items-center">
      <Avatar size={32} shape="circle" src={row.manager.avatar ?? ''} />
      <span className="rtl:mr-2 ml-2 max-w-[150px] truncate">
        {row.manager.firstName} {row.manager.lastName}
      </span>
    </div>
  )
}

interface UpdateProgressModalProps {
  isOpen: boolean
  currentProgress: number
  taskName: string
  taskId: string
  onClose: () => void
  onConfirm: (progress: number) => void
  isLoading?: boolean
}

export default function UpdateProgressModal({
  isOpen,
  currentProgress,
  taskName,
  taskId,
  onClose,
  onConfirm,
  isLoading = false,
}: UpdateProgressModalProps) {
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [selectedAdsAccountId, setSelectedAdsAccountId] = useState<string | null>(null)
  const [isDailyMetricDialogOpen, setIsDailyMetricDialogOpen] = useState(false)

  const { data: adsGroupData, isLoading: isLoadingAdsGroup } = useGetAdsGroupByTaskId(taskId, isOpen)

  useEffect(() => {
    setProgress(currentProgress)
    setError('')
  }, [currentProgress, isOpen])

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setError('')

    if (value === '') {
      setProgress(0)
      return
    }

    const numValue = parseInt(value)
    if (isNaN(numValue)) {
      setError('Vui lòng nhập số hợp lệ')
      return
    }

    if (numValue < 0) {
      setError('Tiến độ không thể nhỏ hơn 0%')
      return
    }

    if (numValue > 100) {
      setError('Tiến độ không thể lớn hơn 100%')
      return
    }

    setProgress(numValue)
  }

  const handleConfirm = () => {
    if (error) return
    onConfirm(progress)
  }

  const handleClose = () => {
    setProgress(currentProgress)
    setError('')
    onClose()
  }

  const adsGroup = adsGroupData?.data?.data
  const adsAccounts = adsGroup?.adsAccounts || []

  const handleOpenDailyMetricDialog = (adsAccountId: string) => {
    setSelectedAdsAccountId(adsAccountId)
    setIsDailyMetricDialogOpen(true)
  }

  const handleCloseDailyMetricDialog = () => {
    setIsDailyMetricDialogOpen(false)
    setSelectedAdsAccountId(null)
  }

  const columns: ColumnDef<AdsAccount>[] = useMemo(
    () => [
      {
        header: 'STT',
        accessorKey: 'index',
        cell: (props) => {
          const row = props.row.index
          return <span>{row + 1}</span>
        },
      },
      {
        header: 'UUID',
        accessorKey: 'uuid',
      },
      {
        header: 'Trạng thái',
        accessorKey: 'status',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex items-center gap-2">
              <Badge className={`bg-${AdsAccountStatusColors[row.status]}`} />
              <span className={`capitalize font-semibold text-${AdsAccountStatusColors[row.status]}`}>
                {AdsAccountStatusLabels[row.status]}
              </span>
            </div>
          )
        },
      },
      {
        header: 'Người quản lý',
        accessorKey: 'manager',
        cell: (props) => {
          const row = props.row.original
          return <ManagerColumn row={row} />
        },
      },
      {
        header: 'Tổng chi tiêu',
        accessorKey: 'totalSpent',
        cell: (props) => {
          const row = props.row.original
          return <span>{formatVietnameseMoney(row.totalSpent)}</span>
        },
      },
      {
        header: 'Ngày tạo',
        accessorKey: 'createdAt',
        cell: (props) => {
          const row = props.row.original
          return <span>{formatDate(row.createdAt)}</span>
        },
      },
      {
        header: '',
        accessorKey: 'action',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex justify-center items-center gap-4">
              <button
                type="button"
                onClick={() => handleOpenDailyMetricDialog(row.id)}
                className="hover:text-indigo-600 transition-colors"
                title="Nhập chỉ số hàng ngày"
              >
                <HiOutlinePencilAlt size={20} />
              </button>
            </div>
          )
        },
      },
    ],
    [],
  )

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} onRequestClose={handleClose} width={1200}>
      <div className="p-2">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex justify-center items-center bg-blue-100 rounded-full w-12 h-12">
            <HiOutlineCheckCircle className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">Cập nhật tiến độ</h3>
            <p className="text-gray-500 text-sm line-clamp-1">{taskName}</p>
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700 text-sm">Tiến độ hoàn thành (%)</label>
          <Input
            type="number"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            placeholder="Nhập tiến độ từ 0-100"
            suffix={<span className="text-gray-500">%</span>}
          />
          {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}

          <div className="flex gap-2 mt-3">
            {[0, 25, 50, 75, 100].map((value) => (
              <Button
                key={value}
                size="xs"
                variant={progress === value ? 'solid' : 'plain'}
                onClick={() => {
                  setProgress(value)
                  setError('')
                }}
              >
                {value}%
              </Button>
            ))}
          </div>
        </div>

        {adsGroup && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold text-gray-900 text-md">Nhóm quảng cáo: {adsGroup.name}</h4>
              <span className="text-gray-500 text-sm">{adsAccounts.length} tài khoản</span>
            </div>

            {isLoadingAdsGroup ? (
              <div className="flex justify-center items-center py-8">
                <Spinner size={40} />
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                <DataTable
                  columns={columns}
                  data={adsAccounts}
                  skeletonAvatarColumns={[4]}
                  skeletonAvatarProps={{ width: 32, height: 32 }}
                  loading={false}
                  emptyTitle="Chưa có tài khoản quảng cáo"
                  emptyDescription="Nhóm quảng cáo này chưa có tài khoản nào"
                />
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end gap-3">
          <Button variant="default" onClick={handleClose} disabled={isLoading}>
            Hủy
          </Button>
          <Button variant="solid" onClick={handleConfirm} disabled={error !== '' || isLoading} loading={isLoading}>
            Cập nhật
          </Button>
        </div>
      </div>

      {selectedAdsAccountId && (
        <Dialog
          isOpen={isDailyMetricDialogOpen}
          width={600}
          onClose={handleCloseDailyMetricDialog}
          onRequestClose={handleCloseDailyMetricDialog}
        >
          <h5 className="mb-4">Thêm chỉ số hàng ngày</h5>
          <DailyMetricForm
            adsAccountId={selectedAdsAccountId}
            isOpen={isDailyMetricDialogOpen}
            onClose={handleCloseDailyMetricDialog}
          />
        </Dialog>
      )}
    </Dialog>
  )
}

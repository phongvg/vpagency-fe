import { DataTable } from '@/components/shared'
import BadgeStatus from '@/components/shared/BadgeStatus'
import { TableTooltip } from '@/components/shared/TableTooltip'
import { Avatar, Badge, Button, Progress } from '@/components/ui'
import { getPriorityColor, getStatusColor } from '@/constants/task.constant'
import { TaskFrequency, TaskPriorityLabels, TaskStatusLabels, TaskType, TaskTypeLabels } from '@/enums/task.enum'
import { formatDate } from '@/helpers/formatDate'
import { formatUSD } from '@/helpers/formatUSD'
import { useAuthStore } from '@/store/auth/useAuthStore'
import { isAdminOrManager } from '@/utils/checkRole'
import { GET_TASK_DETAIL } from '@/utils/queryKey'
import { toastError, toastSuccess } from '@/utils/toast'
import { FinalUrl } from '@/views/projects/types/finalUrl.type'
import TaskProgressDetailModal from '@/views/tasks/assign/components/TaskProgressDetailModal'
import { useBoardStore } from '@/views/tasks/assign/store/useBoardStore'
import { Task } from '@/views/tasks/assign/types/task.type'
import { useQueryClient } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { useCallback, useMemo, useState } from 'react'
import { HiOutlineCalendar, HiOutlineClock, HiOutlineDuplicate, HiOutlineStar, HiUsers } from 'react-icons/hi'
import UpdateProgressModal from './UpdateProgressModal'

interface TaskDetailViewProps {
  task: Task
  onEdit?: () => void
  onDelete?: () => void
}

export default function TaskDetailView({ task, onEdit, onDelete }: TaskDetailViewProps) {
  const queryClient = useQueryClient()
  const { closeDialog } = useBoardStore()
  const { user } = useAuthStore()

  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false)
  const [isProgressDetailModalOpen, setIsProgressDetailModalOpen] = useState(false)

  const handleCopyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toastSuccess('Đã sao chép vào clipboard')
      },
      () => {
        toastError('Sao chép thất bại')
      },
    )
  }, [])

  const columns: ColumnDef<FinalUrl>[] = useMemo(
    () => [
      {
        id: 'stt',
        header: 'STT',
        accessorKey: 'index',
        cell: (props) => {
          const row = props.row.index
          return <span>{row + 1}</span>
        },
      },
      {
        id: 'name',
        header: 'Tên URL',
        accessorKey: 'name',
        cell: (props) => <span className="font-medium">{props.row.original.name}</span>,
      },
      {
        id: 'finalURL',
        header: 'URL',
        accessorKey: 'finalURL',
        cell: (props) => {
          const row = props.row.original
          return (
            <a
              href={row.finalURL}
              target="_blank"
              rel="noopener noreferrer"
              className="block max-w-[250px] text-blue-600 hover:underline truncate"
            >
              {row.finalURL}
            </a>
          )
        },
      },
      {
        id: 'countriesTier1',
        header: 'Quốc gia hạng 1',
        accessorKey: 'countriesTier1',
        cell: (props) => {
          const row = props.row.original.countriesTier1 || []
          if (row.length === 0) return null

          return (
            <div className="flex items-center gap-2">
              <TableTooltip data={row.map((l) => ({ name: l }))} columns={[{ key: 'name', label: 'Quốc gia' }]} />
              <button type="button" title="Sao chép" onClick={() => handleCopyToClipboard(row.join('\n'))}>
                <HiOutlineDuplicate />
              </button>
            </div>
          )
        },
      },
      {
        id: 'countriesTier2',
        header: 'Quốc gia hạng 2',
        accessorKey: 'countriesTier2',
        cell: (props) => {
          const row = props.row.original.countriesTier2 || []
          if (row.length === 0) return null

          return (
            <div className="flex items-center gap-2">
              <TableTooltip data={row.map((l) => ({ name: l }))} columns={[{ key: 'name', label: 'Quốc gia' }]} />
              <button type="button" title="Sao chép" onClick={() => handleCopyToClipboard(row.join('\n'))}>
                <HiOutlineDuplicate />
              </button>
            </div>
          )
        },
      },
      {
        id: 'countriesTier3',
        header: 'Quốc gia hạng 3',
        accessorKey: 'countriesTier3',
        cell: (props) => {
          const row = props.row.original.countriesTier3 || []
          if (row.length === 0) return null

          return (
            <div className="flex items-center gap-2">
              <TableTooltip data={row.map((l) => ({ name: l }))} columns={[{ key: 'name', label: 'Quốc gia' }]} />
              <button type="button" title="Sao chép" onClick={() => handleCopyToClipboard(row.join('\n'))}>
                <HiOutlineDuplicate />
              </button>
            </div>
          )
        },
      },
      {
        id: 'excludeCountries',
        header: 'Quốc gia loại trừ',
        accessorKey: 'excludeCountries',
        cell: (props) => {
          const row = props.row.original.excludeCountries || []
          if (row.length === 0) return null

          return (
            <div className="flex items-center gap-2">
              <TableTooltip data={row.map((l) => ({ name: l }))} columns={[{ key: 'name', label: 'Quốc gia' }]} />
              <button type="button" title="Sao chép" onClick={() => handleCopyToClipboard(row.join('\n'))}>
                <HiOutlineDuplicate />
              </button>
            </div>
          )
        },
      },
      {
        header: 'Mục tiêu Ref',
        accessorKey: 'targetRef',
      },
      {
        header: 'Mục tiêu chi phí Ref',
        accessorKey: 'targetCostPerRef',
        cell: (props) => {
          return <span>{formatUSD(props.row.original.targetCostPerRef)}</span>
        },
      },
      {
        header: 'Mục tiêu FTD',
        accessorKey: 'targetFtd',
      },
      {
        header: 'Mục tiêu chi phí FTD',
        accessorKey: 'targetCostPerFtd',
        cell: (props) => {
          return <span>{formatUSD(props.row.original.targetCostPerFtd)}</span>
        },
      },
      {
        header: 'Mục tiêu CPC',
        accessorKey: 'targetCpc',
        cell: (props) => {
          return <span>{formatUSD(props.row.original.targetCpc)}</span>
        },
      },
    ],
    [handleCopyToClipboard],
  )

  return (
    <div className="task-detail-view">
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-gray-900 text-xl line-clamp-4">{task.name}</h2>
            <div className="flex gap-2">
              {isAdminOrManager(user?.roles) && (
                <>
                  <Button size="sm" variant="twoTone" onClick={onDelete}>
                    Xóa
                  </Button>
                  <Button size="sm" variant="solid" onClick={onEdit}>
                    Chỉnh sửa
                  </Button>
                </>
              )}

              <Button size="sm" variant="solid" onClick={() => setIsProgressDetailModalOpen(true)}>
                Xem tiến độ
              </Button>

              <Button size="sm" variant="solid" onClick={() => setIsProgressModalOpen(true)}>
                Cập nhật tiến độ
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={`px-2 py-1 text-xs font-medium rounded-md border ${getStatusColor(task.status)}`}>
              {TaskStatusLabels[task.status]}
            </Badge>
            <Badge className={`px-2 py-1 text-xs font-medium rounded-md border ${getPriorityColor(task.priority)}`}>
              {TaskPriorityLabels[task.priority]}
            </Badge>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="gap-4 grid grid-cols-2">
          <div className="flex items-center gap-2 text-md">
            <HiOutlineStar size={18} />
            <span className="text-gray-600">Loại công việc:</span>
            <span className="font-medium">{TaskTypeLabels[task.type]}</span>
          </div>
          <div className="flex items-center gap-2 text-md">
            <HiOutlineClock size={18} />
            <span className="text-gray-600">Tần suất:</span>
            <span className="font-medium">{task.frequency === TaskFrequency.ONCE ? 'Một lần' : 'Hàng ngày'}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-md">
          <HiOutlineCalendar size={18} />
          <span className="text-gray-600">Deadline:</span>
          <span className="font-medium">{formatDate(task.deadline, 'DD/MM/YYYY')}</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-3">
            <span className="font-medium text-gray-700 text-sm">Tiến độ</span>
            <div>
              <Progress variant="circle" percent={task.progress} gapDegree={70} gapPosition="bottom" size="sm" />
            </div>
          </div>
        </div>
      </div>

      {task.note && (
        <div className="mb-6">
          <h3 className="mb-2 font-medium text-gray-700 text-sm">Ghi chú</h3>
          <div className="bg-gray-50 p-3 border rounded-lg">
            <p className="text-gray-700 text-sm whitespace-pre-wrap">{task.note}</p>
          </div>
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <HiUsers className="w-4 h-4 text-gray-500" />
          <h3 className="font-medium text-gray-700 text-sm">Người nhận việc</h3>
        </div>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {task.assignedUsers.map((user) => {
            const displayName = user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username
            return (
              <div key={user.id} className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg">
                <Avatar size="sm" src={user.avatar || undefined} shape="circle">
                  {displayName.charAt(0).toUpperCase()}
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{displayName}</p>
                  <p className="text-gray-500 text-xs">{user.email || user.username}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {task.type === TaskType.SET_CAMPAIGN && (
        <div className="mb-6 p-4 border border-blue-100 rounded-lg">
          <h5 className="mb-3">Thông tin chi tiết</h5>
          <div className="gap-4 grid grid-cols-2 text-sm">
            {task.numberOfCampaigns && (
              <div>
                <span>Số lượng campaign lên:</span>
                <span className="ml-1 font-medium">{task.numberOfCampaigns}</span>
              </div>
            )}
            {task.numberOfResultCampaigns && (
              <div>
                <span>Số lượng kết quả campaign:</span>
                <span className="ml-1 font-medium">{task.numberOfResultCampaigns}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {task.type === TaskType.LAUNCH_CAMPAIGN && (
        <div className="mb-6 p-4 border border-blue-100 rounded-lg">
          <h5 className="mb-3">Thông tin chi tiết</h5>
          <div className="gap-4 grid grid-cols-2 text-sm">
            {task.dailyBudget && (
              <div>
                <span>Ngân sách hàng ngày:</span>
                <span className="ml-1 font-medium">{task.dailyBudget}</span>
              </div>
            )}
            {task.numberOfBackupCampaigns && (
              <div>
                <span>Số lượng tài khoản dự phòng:</span>
                <span className="ml-1 font-medium">{task.numberOfBackupCampaigns}</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mb-6">
        <div className="mb-6 p-4 border border-blue-100 rounded-lg">
          <h5 className="mb-3">Thông tin dự án</h5>
          <div className="gap-4 grid grid-cols-2 text-sm">
            <div>
              <span>Tên dự án:</span>
              <span className="ml-1 font-medium">{task.project?.name}</span>
            </div>
            <div>
              <span>Loại dự án:</span>
              <span className="ml-1 font-medium">{task.project?.type.name}</span>
            </div>
            <div>
              <span>Trạng thái:</span>
              <span className="ml-2">
                <BadgeStatus content={task.project?.status.name} />
              </span>
            </div>
            <div>
              <span>Tổng ngân sách:</span>
              <span className="ml-1 font-medium">{formatUSD(task.project?.totalBudget)}</span>
            </div>
            <div>
              <span>Ngân sách đã tiêu:</span>
              <span className="ml-1 font-medium">{formatUSD(task.project?.spentBudget)}</span>
            </div>
            <div>
              <span>CPC:</span>
              <span className="ml-1 font-medium">{formatUSD(task.project?.cpc)}</span>
            </div>
            <div>
              <span>Ngày bắt đầu dự án:</span>
              <span className="ml-1 font-medium">{formatDate(task.project?.startedAt, 'DD/MM/YYYY')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="mb-6 p-4 border border-blue-100 rounded-lg">
          <h5 className="mb-3">Thông tin URL cuối</h5>
          <DataTable columns={columns} data={task.finalUrls || []} loading={false} pagingData={undefined} />
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t">
        <Button size="sm" variant="default" onClick={closeDialog}>
          Đóng
        </Button>
      </div>

      <UpdateProgressModal
        isOpen={isProgressModalOpen}
        taskId={task.id}
        onClose={() => {
          setIsProgressModalOpen(false)
          queryClient.invalidateQueries({ queryKey: [GET_TASK_DETAIL] })
        }}
      />

      <TaskProgressDetailModal
        isOpen={isProgressDetailModalOpen}
        taskId={task.id}
        onClose={() => setIsProgressDetailModalOpen(false)}
      />
    </div>
  )
}

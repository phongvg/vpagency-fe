import { DataTable } from '@/components/shared'
import BadgeStatus from '@/components/shared/BadgeStatus'
import { TableTooltip } from '@/components/shared/TableTooltip'
import { Accordion, Badge, Button, ConfirmDialog } from '@/components/ui'
import { urlConfig } from '@/configs/urls.config'
import { getStatusColor } from '@/constants/task.constant'
import {
  TaskFrequency,
  TaskPriority,
  TaskPriorityLabels,
  TaskStatusLabels,
  TaskType,
  TaskTypeLabels,
} from '@/enums/task.enum'
import { formatDate } from '@/helpers/formatDate'
import { formatUSD } from '@/helpers/formatUSD'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import { useAuthStore } from '@/store/auth/useAuthStore'
import { isAdminOrManager } from '@/utils/checkRole'
import { GET_TASK_DETAIL } from '@/utils/queryKey'
import { toastError, toastSuccess } from '@/utils/toast'
import { FinalUrl } from '@/views/projects/types/finalUrl.type'
import TaskProgressDetailModal from '@/views/tasks/assign/components/TaskProgressDetailModal'
import UpdateProgressModal from '@/views/tasks/assign/components/UpdateProgressModal'
import UsersAvatarGroup from '@/views/tasks/assign/components/UsersAvatarGroup'
import { useDeleteTask } from '@/views/tasks/assign/hooks/useTask'
import { useBoardStore } from '@/views/tasks/assign/store/useBoardStore'
import { Task } from '@/views/tasks/assign/types/task.type'
import { useQueryClient } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  HiChevronDoubleUp,
  HiChevronDown,
  HiMenu,
  HiMenuAlt4,
  HiOutlineDuplicate,
  HiOutlineExternalLink,
  HiOutlinePencilAlt,
  HiOutlineTrash,
} from 'react-icons/hi'
import { Link } from 'react-router-dom'

type Props = {
  inSplitView?: boolean
}

export default function TaskDetailPanel({ inSplitView = false }: Props) {
  const queryClient = useQueryClient()
  const { selectedTask, openDialog, setSelectedTask: setStoreSelectedTask } = useBoardStore()
  const [displayTask, setDisplayTask] = useState<Task | null>(selectedTask)

  const deleteTask = useDeleteTask()

  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false)
  const [isProgressDetailModalOpen, setIsProgressDetailModalOpen] = useState(false)

  const { showConfirm, confirmProps } = useConfirmDialog({
    title: 'Xác nhận xóa công việc',
    type: 'danger',
    confirmText: 'Xóa',
    cancelText: 'Hủy',
  })

  useEffect(() => {
    if (selectedTask) {
      setDisplayTask(selectedTask)
    }
  }, [selectedTask])

  if (!displayTask) return null

  const handleEdit = () => {
    openDialog('EDIT', displayTask.id)
  }

  const handleDelete = async () => {
    const confirmed = await showConfirm({
      message: `Bạn có chắc chắn muốn xóa công việc "${displayTask?.name}"? Hành động này không thể hoàn tác.`,
    })

    if (confirmed) {
      await deleteTask.mutateAsync(displayTask.id)

      if (inSplitView) {
        setStoreSelectedTask(null)
        setDisplayTask(null)
      }
    }
  }

  return (
    <>
      <TaskHeaderPanel
        task={displayTask}
        onEdit={handleEdit}
        onUpdateProgress={() => setIsProgressModalOpen(true)}
        onViewProgressDetail={() => setIsProgressDetailModalOpen(true)}
        onDelete={handleDelete}
      />

      <div className="gap-x-28 grid grid-cols-1 lg:grid-cols-2 mb-8">
        <Accordion defaultActiveKey={['1', '2', '3']} accordion={false}>
          <Accordion.Item itemKey="1" title="Thông tin chung">
            <TaskDetailSection task={displayTask} />
          </Accordion.Item>

          <Accordion.Item itemKey="2" title="Ghi chú">
            <div>{displayTask.note}</div>
          </Accordion.Item>

          {[TaskType.LAUNCH_CAMPAIGN, TaskType.SET_CAMPAIGN].includes(displayTask.type) && (
            <Accordion.Item itemKey="3" title="Thông tin chiến dịch">
              <TaskCampaignSection task={displayTask} />
            </Accordion.Item>
          )}
        </Accordion>

        <Accordion defaultActiveKey={['1', '2', '3']} accordion={false}>
          <Accordion.Item itemKey="1" title="Thông tin dự án">
            <TaskProjectSection task={displayTask} />
          </Accordion.Item>

          <Accordion.Item itemKey="2" title="Mọi người">
            <TaskPeopleSection task={displayTask} />
          </Accordion.Item>

          <Accordion.Item itemKey="3" title="Thời gian">
            <TaskDatesSection task={displayTask} />
          </Accordion.Item>
        </Accordion>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 font-semibold text-lg">Thông tin URL cuối</h2>
        <TaskFinalUrlSection finalUrls={displayTask.finalUrls} />
      </div>

      <ConfirmDialog {...confirmProps} loading={deleteTask.isPending} />

      <UpdateProgressModal
        isOpen={isProgressModalOpen}
        taskId={displayTask.id}
        onClose={() => {
          setIsProgressModalOpen(false)
          queryClient.invalidateQueries({ queryKey: [GET_TASK_DETAIL] })
        }}
      />

      <TaskProgressDetailModal
        isOpen={isProgressDetailModalOpen}
        taskId={displayTask?.id}
        onClose={() => setIsProgressDetailModalOpen(false)}
      />
    </>
  )
}

interface TaskPanelProps {
  task: Task
}

interface TaskHeaderPanelProps extends TaskPanelProps {
  onEdit: () => void
  onUpdateProgress: () => void
  onViewProgressDetail: () => void
  onDelete: () => void
}

function TaskHeaderPanel({ task, onEdit, onUpdateProgress, onViewProgressDetail, onDelete }: TaskHeaderPanelProps) {
  const { user } = useAuthStore()

  return (
    <header className="mb-10">
      <h1 className="mb-2 font-semibold text-[24px]">{task.name}</h1>
      <div className="flex items-center gap-2">
        {isAdminOrManager(user?.roles) && (
          <>
            <Button variant="default" size="xs" icon={<HiOutlinePencilAlt />} onClick={onEdit}>
              Chỉnh sửa
            </Button>
            <Button variant="default" size="xs" icon={<HiOutlineTrash />} onClick={onDelete}>
              Xóa
            </Button>
          </>
        )}
        <Button variant="default" size="xs" onClick={onViewProgressDetail}>
          Xem tiến độ
        </Button>
        <Button variant="default" size="xs" onClick={onUpdateProgress}>
          Cập nhật tiến độ
        </Button>
      </div>
    </header>
  )
}

function TaskDetailSection({ task }: TaskPanelProps) {
  const priorityIcons: Record<TaskPriority, JSX.Element> = {
    [TaskPriority.LOW]: <HiChevronDown size={20} color="#ff5630" />,
    [TaskPriority.MEDIUM]: <HiMenuAlt4 size={20} color="#ff5630" />,
    [TaskPriority.HIGH]: <HiMenu size={20} color="#ff5630" />,
    [TaskPriority.URGENT]: <HiChevronDoubleUp size={20} color="#ff5630" />,
  }

  return (
    <ul className="space-y-2">
      <li className="flex justify-between items-center">
        <span>Trạng thái:</span>
        <Badge content={TaskStatusLabels[task.status]} className={getStatusColor(task.status)} />
      </li>
      <li className="flex justify-between items-center">
        <span>Loại công việc:</span>
        <span className="font-bold">{TaskTypeLabels[task.type]}</span>
      </li>
      <li className="flex justify-between items-center">
        <span>Độ ưu tiên:</span>
        <div className="flex items-center gap-2">
          {priorityIcons[task.priority]}
          {TaskPriorityLabels[task.priority]}
        </div>
      </li>
      <li className="flex justify-between items-center">
        <span>Tần suất:</span>
        <span>{task.frequency === TaskFrequency.ONCE ? 'Một lần' : 'Hàng ngày'}</span>
      </li>
      <li className="flex justify-between items-center">
        <span>Tiến độ công việc:</span>
        <span>{task.progress}%</span>
      </li>
      <li className="flex justify-between items-center">
        <span>Deadline:</span>
        <span>{formatDate(task.deadline, 'DD/MM/YYYY')}</span>
      </li>
    </ul>
  )
}

function TaskProjectSection({ task }: TaskPanelProps) {
  return (
    <ul className="space-y-2">
      <li className="flex justify-between items-center">
        <span>Dự án:</span>
        <Link
          to={urlConfig.projectDetail.replace(':id', task.project?.id || '')}
          title="Xem chi tiết dự án"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-indigo-600 cursor-pointer"
        >
          {task.project?.name || 'N/A'}
          <HiOutlineExternalLink size={18} />
        </Link>
      </li>
      <li className="flex justify-between items-center">
        <span>Loại dự án:</span>
        <span>{task.project?.typeName || 'N/A'}</span>
      </li>
      <li className="flex justify-between items-center">
        <span>Trạng thái:</span>
        <BadgeStatus content={task.project?.statusName} />
      </li>
      <li className="flex justify-between items-center">
        <span>Tổng ngân sách:</span>
        <span>{formatUSD(task.project?.totalBudget)}</span>
      </li>
      <li className="flex justify-between items-center">
        <span>Tổng ngân sách chi tiêu:</span>
        <span>{formatUSD(task.totalCost)}</span>
      </li>
      <li className="flex justify-between items-center">
        <span>CPC trung bình:</span>
        <span>{formatUSD(task.avgCpc)}</span>
      </li>
    </ul>
  )
}

function TaskPeopleSection({ task }: TaskPanelProps) {
  return (
    <ul className="space-y-2">
      {task.creator && (
        <li className="flex justify-between items-center">
          <span>Người giao việc:</span>
          <UsersAvatarGroup avatarProps={{ size: 25 }} users={[task.creator]} />
        </li>
      )}
      <li className="flex justify-between items-center">
        <span>Người nhận việc:</span>
        <UsersAvatarGroup avatarProps={{ size: 25 }} users={task.assignedUsers} />
      </li>
    </ul>
  )
}

function TaskDatesSection({ task }: TaskPanelProps) {
  return (
    <ul className="space-y-2">
      <li className="flex justify-between items-center">
        <span>Ngày tạo:</span>
        <span>{formatDate(task.createdAt)}</span>
      </li>
      <li className="flex justify-between items-center">
        <span>Ngày cập nhật:</span>
        <span>{formatDate(task.updatedAt)}</span>
      </li>
    </ul>
  )
}

function TaskCampaignSection({ task }: TaskPanelProps) {
  return (
    <ul className="space-y-2">
      {task.numberOfCampaigns && (
        <li className="flex justify-between items-center">
          <span>Số lượng campaign lên:</span>
          <span>{task.numberOfCampaigns || 'N/A'}</span>
        </li>
      )}
      {task.numberOfResultCampaigns && (
        <li className="flex justify-between items-center">
          <span>Số lượng kết quả campaign:</span>
          <span>{task.numberOfResultCampaigns || 'N/A'}</span>
        </li>
      )}
      {task.dailyBudget && (
        <li className="flex justify-between items-center">
          <span>Ngân sách hàng ngày:</span>
          <span>{formatUSD(task.dailyBudget) || 'N/A'}</span>
        </li>
      )}
      {task.numberOfBackupCampaigns && (
        <li className="flex justify-between items-center">
          <span>Số lượng tài khoản dự phòng:</span>
          <span>{task.numberOfBackupCampaigns || 'N/A'}</span>
        </li>
      )}
    </ul>
  )
}

function TaskFinalUrlSection({ finalUrls }: { finalUrls: FinalUrl[] }) {
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

  return <DataTable columns={columns} data={finalUrls} maxHeight={500} />
}

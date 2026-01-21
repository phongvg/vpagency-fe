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
import { fixedNumber } from '@/helpers/fixedNumber'
import { formatDate } from '@/helpers/formatDate'
import { formatUSD } from '@/helpers/formatUSD'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import { useAuthStore } from '@/store/auth/useAuthStore'
import { isAdminOrManager } from '@/utils/checkRole'
import { GET_TASK_DETAIL } from '@/utils/queryKey'
import { toastError, toastSuccess } from '@/utils/toast'
import { FinalUrl } from '@/views/projects/types/finalUrl.type'
import { Project } from '@/views/projects/types/project.type'
import TaskProgressDetailModal from '@/views/tasks/assign/components/TaskProgressDetailModal'
import UpdateAppealMetricsModal from '@/views/tasks/assign/components/UpdateAppealMetricsModal'
import UpdateDocumentAppealMetricsModal from '@/views/tasks/assign/components/UpdateDocumentAppealMetricsModal'
import UpdateProgressModal from '@/views/tasks/assign/components/UpdateProgressModal'
import UpdateResearchMetricsModal from '@/views/tasks/assign/components/UpdateResearchMetricsModal'
import UsersAvatarGroup from '@/views/tasks/assign/components/UsersAvatarGroup'
import {
  useDeleteDocumentAppealDetail,
  useDeleteResearchDetail,
  useDeleteTask,
  useUpdateResearchDetail,
} from '@/views/tasks/assign/hooks/useTask'
import { useBoardStore } from '@/views/tasks/assign/store/useBoardStore'
import {
  Task,
  TaskAppealDetail,
  TaskDocumentAppealDetail,
  TaskResearchDetail,
} from '@/views/tasks/assign/types/task.type'
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
  const [isAppealMetricsModalOpen, setIsAppealMetricsModalOpen] = useState(false)
  const [isDocumentAppealMetricsModalOpen, setIsDocumentAppealMetricsModalOpen] = useState(false)
  const [isResearchMetricsModalOpen, setIsResearchMetricsModalOpen] = useState(false)

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
        onUpdateAppealMetrics={() => setIsAppealMetricsModalOpen(true)}
        onUpdateDocumentAppealMetrics={() => setIsDocumentAppealMetricsModalOpen(true)}
        onUpdateResearchMetrics={() => setIsResearchMetricsModalOpen(true)}
        onDelete={handleDelete}
      />

      <div className="gap-x-28 grid grid-cols-1 lg:grid-cols-2 mb-8">
        <Accordion defaultActiveKey={['1', '2', '3', '4']} accordion={false}>
          <Accordion.Item itemKey="1" title="Thông tin chung">
            <TaskDetailSection task={displayTask} />
          </Accordion.Item>

          <Accordion.Item itemKey="2" title="Ghi chú">
            <div>{displayTask.note}</div>
          </Accordion.Item>

          {[TaskType.LAUNCH_CAMPAIGN, TaskType.SET_CAMPAIGN, TaskType.NURTURE_ACCOUNT].includes(displayTask.type) && (
            <Accordion.Item itemKey="3" title="Thông tin chiến dịch">
              <TaskCampaignSection task={displayTask} />
            </Accordion.Item>
          )}
        </Accordion>

        <Accordion defaultActiveKey={['1', '2', '3', '4', '5', '6']} accordion={false}>
          {[TaskType.LAUNCH_CAMPAIGN, TaskType.SET_CAMPAIGN, TaskType.NURTURE_ACCOUNT].includes(displayTask.type) && (
            <Accordion.Item itemKey="1" title="Thông tin dự án">
              <TaskProjectSection task={displayTask} />
            </Accordion.Item>
          )}

          {displayTask.type === TaskType.APPEAL_ACCOUNT && (
            <Accordion.Item itemKey="4" title="Thông tin kháng tài khoản">
              <TaskAppealDetailSection task={displayTask} />
            </Accordion.Item>
          )}

          {displayTask.type === TaskType.DOCUMENT_APPEAL && (
            <Accordion.Item itemKey="5" title="Thông tin kháng giấy">
              <TaskDocumentAppealDetailSection task={displayTask} />
            </Accordion.Item>
          )}

          {displayTask.type === TaskType.RESEARCH && (
            <Accordion.Item itemKey="4" title="Nội dung nghiên cứu">
              <div className="whitespace-pre-wrap">{displayTask.researchContent}</div>
            </Accordion.Item>
          )}

          <Accordion.Item itemKey="2" title="Mọi người">
            <TaskPeopleSection task={displayTask} />
          </Accordion.Item>

          <Accordion.Item itemKey="3" title="Thời gian">
            <TaskDatesSection task={displayTask} />
          </Accordion.Item>
        </Accordion>
      </div>

      {[TaskType.LAUNCH_CAMPAIGN, TaskType.SET_CAMPAIGN, TaskType.NURTURE_ACCOUNT].includes(displayTask.type) && (
        <div className="mt-8">
          <h2 className="mb-4 font-semibold text-lg">Thông tin URL cuối</h2>
          <TaskFinalUrlSection finalUrls={displayTask.finalUrls} />
        </div>
      )}

      {displayTask.type === TaskType.APPEAL_ACCOUNT && (
        <div className="mt-8">
          <h2 className="mb-4 font-semibold text-lg">Thông tin kháng tài khoản</h2>
          <TaskAppealDetailTable appealDetails={displayTask.appealDetails ?? []} />
        </div>
      )}

      {displayTask.type === TaskType.DOCUMENT_APPEAL && (
        <>
          <div className="mt-8">
            <h2 className="mb-4 font-semibold text-lg">Danh sách dự án kháng</h2>
            <TaskDocumentAppealTable projects={displayTask.projects ?? []} />
          </div>

          <div className="mt-8">
            <h2 className="mb-4 font-semibold text-lg">Chi tiết kháng giấy</h2>
            <TaskDocumentAppealDetailTable documentAppealDetails={displayTask.documentAppealDetails ?? []} />
          </div>
        </>
      )}

      {displayTask.type === TaskType.RESEARCH && (
        <div className="mt-8">
          <h2 className="mb-4 font-semibold text-lg">Chi tiết kết quả nghiên cứu</h2>
          <TaskResearchDetailTable researchDetails={displayTask.researchDetails ?? []} />
        </div>
      )}

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

      <UpdateAppealMetricsModal
        isOpen={isAppealMetricsModalOpen}
        task={displayTask}
        onClose={() => setIsAppealMetricsModalOpen(false)}
      />

      <UpdateDocumentAppealMetricsModal
        isOpen={isDocumentAppealMetricsModalOpen}
        task={displayTask}
        onClose={() => setIsDocumentAppealMetricsModalOpen(false)}
      />

      <UpdateResearchMetricsModal
        isOpen={isResearchMetricsModalOpen}
        task={displayTask}
        onClose={() => setIsResearchMetricsModalOpen(false)}
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
  onUpdateAppealMetrics: () => void
  onUpdateDocumentAppealMetrics: () => void
  onUpdateResearchMetrics: () => void
}

function TaskHeaderPanel({
  task,
  onEdit,
  onUpdateProgress,
  onViewProgressDetail,
  onDelete,
  onUpdateAppealMetrics,
  onUpdateDocumentAppealMetrics,
  onUpdateResearchMetrics,
}: TaskHeaderPanelProps) {
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

        {[TaskType.LAUNCH_CAMPAIGN, TaskType.SET_CAMPAIGN, TaskType.NURTURE_ACCOUNT].includes(task.type) && (
          <>
            <Button variant="default" size="xs" onClick={onViewProgressDetail}>
              Xem tiến độ
            </Button>
            <Button variant="default" size="xs" onClick={onUpdateProgress}>
              Cập nhật tiến độ
            </Button>
          </>
        )}

        {task.type === TaskType.APPEAL_ACCOUNT && (
          <Button variant="default" size="xs" onClick={onUpdateAppealMetrics}>
            Cập nhật tiến độ kháng
          </Button>
        )}

        {task.type === TaskType.DOCUMENT_APPEAL && (
          <Button variant="default" size="xs" onClick={onUpdateDocumentAppealMetrics}>
            Cập nhật tiến độ kháng giấy
          </Button>
        )}

        {task.type === TaskType.RESEARCH && (
          <Button variant="default" size="xs" onClick={onUpdateResearchMetrics}>
            Cập nhật kết quả nghiên cứu
          </Button>
        )}
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

function TaskAppealDetailSection({ task }: TaskPanelProps) {
  return (
    <ul className="space-y-2">
      <li className="flex justify-between items-center">
        <span>Số lượng tài khoản tạm ngưng:</span>
        <span>{task.numberOfSuspendedAccounts || 0}</span>
      </li>
      <li className="flex justify-between items-center">
        <span>Tổng số lượng kháng:</span>
        <span>{task.appealSummary?.totalAppealCount || 0}</span>
      </li>
      <li className="flex justify-between items-center">
        <span>Tổng số lượng thành công:</span>
        <span>{task.appealSummary?.totalSuccessCount || 0}</span>
      </li>
      <li className="flex justify-between items-center">
        <span>Tổng số lượng thất bại:</span>
        <span>{task.appealSummary?.totalFailureCount || 0}</span>
      </li>
      <li className="flex justify-between items-center">
        <span>Tỷ lệ thành công:</span>
        <span>{fixedNumber(task.appealSummary?.overallSuccessRate || 0)}%</span>
      </li>
    </ul>
  )
}

function TaskDocumentAppealDetailSection({ task }: TaskPanelProps) {
  return (
    <ul className="space-y-2">
      <li className="flex justify-between items-center">
        <span>Số lượng đơn kháng:</span>
        <span>{task.numberOfAppealDocuments || 0}</span>
      </li>
      <li className="flex justify-between items-center">
        <span>Tổng số lượng kháng:</span>
        <span>{task.documentAppealSummary?.totalAppealCount || 0}</span>
      </li>
      <li className="flex justify-between items-center">
        <span>Tổng số lượng thành công:</span>
        <span>{task.documentAppealSummary?.totalSuccessCount || 0}</span>
      </li>
      <li className="flex justify-between items-center">
        <span>Tổng số lượng thất bại:</span>
        <span>{task.documentAppealSummary?.totalFailureCount || 0}</span>
      </li>
      <li className="flex justify-between items-center">
        <span>Tỷ lệ thành công:</span>
        <span>{fixedNumber(task.documentAppealSummary?.overallSuccessRate || 0)}%</span>
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

export function TaskAppealDetailTable({ appealDetails }: { appealDetails: TaskAppealDetail[] }) {
  const columns: ColumnDef<TaskAppealDetail>[] = useMemo(
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
        header: 'Ngày kháng tài khoản tạm ngưng',
        accessorKey: 'appealDate',
        cell: (props) => <span className="font-medium">{formatDate(props.row.original.appealDate, 'DD/MM/YYYY')}</span>,
      },
      {
        header: 'Nguyên nhân tạm ngưng',
        accessorKey: 'suspensionReason',
        cell: (props) => {
          const row = props.row.original
          return <span className="block max-w-[250px] truncate">{row.suspensionReason}</span>
        },
      },
      {
        header: 'Số lượng kháng',
        accessorKey: 'appealCount',
      },
      {
        header: 'Số lượng thành công',
        accessorKey: 'successCount',
      },
      {
        header: 'Số lượng thất bại',
        accessorKey: 'failureCount',
      },
      {
        header: 'Tỷ lệ thành công (%)',
        accessorKey: 'successRate',
        cell: (props) => {
          return <span>{fixedNumber(props.row.original.successRate)}%</span>
        },
      },
    ],
    [],
  )

  return <DataTable columns={columns} data={appealDetails} maxHeight={500} />
}

export function TaskDocumentAppealTable({ projects }: { projects: Project[] }) {
  const columns: ColumnDef<Project>[] = useMemo(
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
        header: 'Dự án',
        accessorKey: 'name',
      },
      {
        header: 'Loại dự án',
        accessorKey: 'typeName',
      },
      {
        header: 'Trạng thái',
        accessorKey: 'statusName',
        cell: (props) => {
          return <BadgeStatus content={props.row.original.statusName} />
        },
      },
    ],
    [],
  )

  return <DataTable columns={columns} data={projects} maxHeight={500} />
}

export function TaskDocumentAppealDetailTable({
  documentAppealDetails,
}: {
  documentAppealDetails: TaskDocumentAppealDetail[]
}) {
  const deleteDocumentAppealDetail = useDeleteDocumentAppealDetail()
  const { selectedTask } = useBoardStore()
  const { showConfirm, confirmProps } = useConfirmDialog({
    title: 'Xác nhận xóa',
    type: 'danger',
    confirmText: 'Xóa',
    cancelText: 'Hủy',
  })

  const handleDelete = async (detailId: string) => {
    const confirmed = await showConfirm({
      message: 'Bạn có chắc chắn muốn xóa chi tiết kháng giấy này?',
    })

    if (confirmed && selectedTask?.id) {
      await deleteDocumentAppealDetail.mutateAsync({
        taskId: selectedTask.id,
        detailId,
      })
    }
  }

  const columns: ColumnDef<TaskDocumentAppealDetail>[] = useMemo(
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
        header: 'Ngày kháng giấy',
        accessorKey: 'appealDate',
        cell: (props) => <span className="font-medium">{formatDate(props.row.original.appealDate, 'DD/MM/YYYY')}</span>,
      },
      {
        header: 'Dự án',
        accessorKey: 'projectName',
        cell: (props) => <span className="font-medium">{props.row.original.projectName}</span>,
      },
      {
        header: 'Số lượng đơn kháng',
        accessorKey: 'appealCount',
      },
      {
        header: 'Số lượng đơn thành công',
        accessorKey: 'successCount',
      },
      {
        header: 'Số lượng thất bại',
        accessorKey: 'failureCount',
        cell: (props) => {
          const row = props.row.original
          return <span>{row.appealCount - row.successCount}</span>
        },
      },
      {
        header: 'Tỷ lệ thành công (%)',
        accessorKey: 'successRate',
        cell: (props) => {
          return <span>{fixedNumber(props.row.original.successRate)}%</span>
        },
      },
      {
        header: 'Ghi chú',
        accessorKey: 'note',
        cell: (props) => {
          const row = props.row.original
          return row.note ? <span className="block max-w-[250px] truncate">{row.note}</span> : '-'
        },
      },
      {
        header: 'Người kháng',
        accessorKey: 'creator',
        cell: (props) => {
          return <UsersAvatarGroup avatarProps={{ size: 25 }} users={[props.row.original.creator]} />
        },
      },
      {
        header: 'Hành động',
        accessorKey: 'actions',
        cell: (props) => {
          return (
            <Button
              size="xs"
              variant="default"
              icon={<HiOutlineTrash />}
              onClick={() => handleDelete(props.row.original.id)}
            />
          )
        },
      },
    ],
    [handleDelete],
  )

  return (
    <>
      <DataTable columns={columns} data={documentAppealDetails} maxHeight={500} />
      <ConfirmDialog {...confirmProps} loading={deleteDocumentAppealDetail.isPending} />
    </>
  )
}

export function TaskResearchDetailTable({ researchDetails }: { researchDetails: TaskResearchDetail[] }) {
  const deleteResearchDetail = useDeleteResearchDetail()
  const updateResearchDetail = useUpdateResearchDetail()
  const { selectedTask } = useBoardStore()
  const [editingDetail, setEditingDetail] = useState<TaskResearchDetail | null>(null)
  const { showConfirm, confirmProps } = useConfirmDialog({
    title: 'Xác nhận xóa',
    type: 'danger',
    confirmText: 'Xóa',
    cancelText: 'Hủy',
  })

  const handleDelete = async (detailId: string) => {
    const confirmed = await showConfirm({
      message: 'Bạn có chắc chắn muốn xóa chi tiết nghiên cứu này?',
    })

    if (confirmed && selectedTask?.id) {
      await deleteResearchDetail.mutateAsync({
        taskId: selectedTask.id,
        detailId,
      })
    }
  }

  const handleEdit = (detail: TaskResearchDetail) => {
    setEditingDetail(detail)
  }

  const columns: ColumnDef<TaskResearchDetail>[] = useMemo(
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
        header: 'Ngày ghi kết quả',
        accessorKey: 'resultDate',
        cell: (props) => <span className="font-medium">{formatDate(props.row.original.resultDate, 'DD/MM/YYYY')}</span>,
      },
      {
        header: 'Kết quả nghiên cứu',
        accessorKey: 'result',
        cell: (props) => {
          const row = props.row.original
          return (
            <span className="block max-w-[400px] truncate" title={row.result}>
              {row.result}
            </span>
          )
        },
      },
      {
        header: 'Mức độ khó',
        accessorKey: 'difficultyLevel',
      },
      {
        header: 'Người nghiên cứu',
        accessorKey: 'creator',
        cell: (props) => {
          return <UsersAvatarGroup avatarProps={{ size: 25 }} users={[props.row.original.creator]} />
        },
      },
      {
        header: 'Hành động',
        accessorKey: 'actions',
        cell: (props) => {
          return (
            <div className="flex items-center gap-2">
              <Button
                size="xs"
                variant="default"
                icon={<HiOutlinePencilAlt />}
                onClick={() => handleEdit(props.row.original)}
              />
              <Button
                size="xs"
                variant="default"
                icon={<HiOutlineTrash />}
                onClick={() => handleDelete(props.row.original.id)}
              />
            </div>
          )
        },
      },
    ],
    [handleDelete, handleEdit],
  )

  return (
    <>
      <DataTable columns={columns} data={researchDetails} maxHeight={500} />
      <ConfirmDialog {...confirmProps} loading={deleteResearchDetail.isPending} />
      <UpdateResearchMetricsModal
        isOpen={!!editingDetail}
        task={selectedTask}
        editingDetail={editingDetail}
        onClose={() => setEditingDetail(null)}
      />
    </>
  )
}

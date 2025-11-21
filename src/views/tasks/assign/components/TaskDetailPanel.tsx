import { Task } from '@/views/tasks/assign/types/task.type'
import { Accordion, Badge, Button, ConfirmDialog } from '@/components/ui'
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
import { formatVietnameseMoney } from '@/helpers/formatVietnameseMoney'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import { useAuthStore } from '@/store/auth/useAuthStore'
import { isAdminOrManager } from '@/utils/checkRole'
import UpdateProgressModal from '@/views/tasks/assign/components/UpdateProgressModal'
import UsersAvatarGroup from '@/views/tasks/assign/components/UsersAvatarGroup'
import { useDeleteTask } from '@/views/tasks/assign/hooks/useTask'
import { useBoardStore } from '@/views/tasks/assign/store/useBoardStore'
import { useEffect, useState } from 'react'
import {
  HiChevronDoubleUp,
  HiChevronDown,
  HiMenu,
  HiMenuAlt4,
  HiOutlinePencilAlt,
  HiOutlineTrash,
} from 'react-icons/hi'

type Props = {
  inSplitView?: boolean
}

export default function TaskDetailPanel({ inSplitView = false }: Props) {
  const { selectedTask, openDialog, setSelectedTask: setStoreSelectedTask } = useBoardStore()
  const [displayTask, setDisplayTask] = useState<Task | null>(selectedTask)

  const deleteTask = useDeleteTask()

  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false)

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
        onDelete={handleDelete}
      />

      <div className="gap-x-28 grid grid-cols-1 lg:grid-cols-2">
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

      <ConfirmDialog {...confirmProps} loading={deleteTask.isPending} />

      <UpdateProgressModal
        isOpen={isProgressModalOpen}
        taskId={displayTask.id}
        onClose={() => setIsProgressModalOpen(false)}
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
  onDelete: () => void
}

function TaskHeaderPanel({ task, onEdit, onUpdateProgress, onDelete }: TaskHeaderPanelProps) {
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
        <span>{task.project?.name || 'N/A'}</span>
      </li>
      <li className="flex justify-between items-center">
        <span>Loại dự án:</span>
        <span>{task.project?.type.name || 'N/A'}</span>
      </li>
    </ul>
  )
}

function TaskPeopleSection({ task }: TaskPanelProps) {
  return (
    <ul className="space-y-2">
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
          <span>{formatVietnameseMoney(task.dailyBudget) || 'N/A'}</span>
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

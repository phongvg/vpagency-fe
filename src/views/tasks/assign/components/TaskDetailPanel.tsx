import { Accordion, Badge, Button, ConfirmDialog } from '@/components/ui'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import { useDeleteTask, useUpdateTaskProgress } from '@/views/tasks/assign/hooks/useTaskQueries'
import { useBoardStore } from '@/views/tasks/assign/store/useBoardStore'
import { toastError, toastSuccess } from '@/utils/toast'
import { Task } from '@/@types/task'
import {
  HiChevronDoubleUp,
  HiChevronDown,
  HiMenu,
  HiMenuAlt4,
  HiOutlinePencilAlt,
  HiOutlineTrash,
} from 'react-icons/hi'
import {
  TaskFrequency,
  TaskPriority,
  TaskPriorityLabels,
  TaskStatusLabels,
  TaskType,
  TaskTypeLabels,
} from '@/enums/task.enum'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { getStatusColor } from '@/constants/task.constant'
import UsersAvatarGroup from '@/views/tasks/assign/components/UsersAvatarGroup'
import UpdateProgressModal from '@/views/tasks/assign/components/UpdateProgressModal'
import { useState } from 'react'
import { ProjectTypeLabels } from '@/enums/project.enum'

interface TaskDetailPanelProps {
  inSplitView?: boolean
}

export default function TaskDetailPanel({ inSplitView = false }: TaskDetailPanelProps) {
  const { selectedTask, openDialog, setSelectedTask } = useBoardStore()
  const deleteTask = useDeleteTask()
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false)
  const updateProgressMutation = useUpdateTaskProgress()
  const { showConfirm, confirmProps } = useConfirmDialog({
    title: 'Xác nhận xóa công việc',
    type: 'danger',
    confirmText: 'Xóa',
    cancelText: 'Hủy',
  })

  if (!selectedTask) return null

  const handleEdit = () => {
    openDialog('EDIT', selectedTask.id)
  }

  const handleDelete = async () => {
    const confirmed = await showConfirm({
      message: `Bạn có chắc chắn muốn xóa công việc "${selectedTask?.name}"? Hành động này không thể hoàn tác.`,
    })

    if (confirmed) {
      try {
        await deleteTask.mutateAsync(selectedTask.id)
        toastSuccess('Xóa công việc thành công')

        if (inSplitView) {
          setSelectedTask(null)
        }
      } catch (error) {
        toastError('Xóa công việc thất bại')
      }
    }
  }

  const handleUpdateProgress = async (progress: number) => {
    try {
      await updateProgressMutation.mutateAsync({ taskId: selectedTask.id, progress })
      toastSuccess('Cập nhật tiến độ thành công')
      setIsProgressModalOpen(false)
    } catch (error: any) {
      toastError(error?.response?.data?.message || 'Cập nhật tiến độ thất bại')
    }
  }

  return (
    <>
      <TaskHeaderPanel
        task={selectedTask}
        onEdit={handleEdit}
        onUpdateProgress={() => setIsProgressModalOpen(true)}
        onDelete={handleDelete}
      />
      <div className="gap-28 grid grid-cols-2">
        <Accordion defaultActiveKey={['1', '2', '3']} accordion={false}>
          <Accordion.Item itemKey="1" title="Thông tin chung">
            <TaskDetailSection task={selectedTask} />
          </Accordion.Item>
          <Accordion.Item itemKey="2" title="Ghi chú">
            <div>{selectedTask.note}</div>
          </Accordion.Item>
          {[TaskType.LAUNCH_CAMPAIGN, TaskType.SET_CAMPAIGN].includes(selectedTask.type) && (
            <Accordion.Item itemKey="3" title="Thông tin chiến dịch">
              <ul className="space-y-2">
                <li className="flex justify-between items-center">
                  <span>Số chiến dịch:</span>
                  <span>{selectedTask.numberOfCampaigns || 'N/A'}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Chiến dịch dự phòng:</span>
                  <span>{selectedTask.numberOfBackupCampaigns || 'N/A'}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Ngân sách hàng ngày:</span>
                  <span>{selectedTask.dailyBudget.toLocaleString('vi-VN') || 'N/A'} VNĐ</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Số tài khoản:</span>
                  <span>{selectedTask.numberOfAccounts || 'N/A'}</span>
                </li>
              </ul>
            </Accordion.Item>
          )}
        </Accordion>

        <Accordion defaultActiveKey={['1', '2', '3']} accordion={false}>
          <Accordion.Item itemKey="1" title="Thông tin dự án">
            <TaskProjectSection task={selectedTask} />
          </Accordion.Item>
          <Accordion.Item itemKey="2" title="Mọi người">
            <TaskPeopleSection task={selectedTask} />
          </Accordion.Item>
          <Accordion.Item itemKey="3" title="Thời gian">
            <TaskDatesSection task={selectedTask} />
          </Accordion.Item>
        </Accordion>
      </div>

      <ConfirmDialog {...confirmProps} loading={deleteTask.isPending} />

      <UpdateProgressModal
        isOpen={isProgressModalOpen}
        currentProgress={selectedTask.progress}
        taskName={selectedTask.name}
        onClose={() => setIsProgressModalOpen(false)}
        onConfirm={handleUpdateProgress}
        isLoading={updateProgressMutation.isPending}
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
  return (
    <header className="mb-10">
      <h1 className="mb-2 font-semibold text-[24px]">{task.name}</h1>
      <div className="flex items-center gap-2">
        <Button variant="default" size="xs" icon={<HiOutlinePencilAlt />} onClick={onEdit}>
          Chỉnh sửa
        </Button>
        <Button variant="default" size="xs" icon={<HiOutlineTrash />} onClick={onDelete}>
          Xóa
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
        <span>{format(new Date(task.deadline), 'dd/MM/yyyy', { locale: vi })}</span>
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
        <span>{ProjectTypeLabels[task.project?.type] || 'N/A'}</span>
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
        <span>{format(new Date(task.createdAt), 'dd/MM/yyyy - HH:mm', { locale: vi })}</span>
      </li>
      <li className="flex justify-between items-center">
        <span>Ngày cập nhật:</span>
        <span>{format(new Date(task.updatedAt), 'dd/MM/yyyy - HH:mm', { locale: vi })}</span>
      </li>
    </ul>
  )
}

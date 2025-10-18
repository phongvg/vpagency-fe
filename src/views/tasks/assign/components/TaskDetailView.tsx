import { Task } from '@/@types/task'
import { Avatar, Badge, Button, Progress } from '@/components/ui'
import {
  TaskFrequency,
  TaskPriority,
  TaskPriorityLabels,
  TaskStatus,
  TaskStatusLabels,
  TaskType,
  TaskTypeLabels,
} from '@/enums/task.enum'
import { useBoardStore } from '@/views/tasks/assign/store/useBoardStore'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { HiOutlineCalendar, HiOutlineClock, HiOutlineStar, HiUsers } from 'react-icons/hi'

interface TaskDetailViewProps {
  task: Task
  onEdit?: () => void
  onDelete?: () => void
}

export default function TaskDetailView({ task, onEdit, onDelete }: TaskDetailViewProps) {
  const { closeDialog } = useBoardStore()

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.HIGH:
        return 'bg-red-100 text-red-800 border-red-200'
      case TaskPriority.MEDIUM:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case TaskPriority.LOW:
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.PENDING:
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case TaskStatus.IN_PROGRESS:
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case TaskStatus.COMPLETED:
        return 'bg-green-100 text-green-800 border-green-200'
      case TaskStatus.CANCELLED:
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="task-detail-view">
      <div className="max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h2 className="mb-2 font-semibold text-gray-900 text-xl line-clamp-4">{task.name}</h2>
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

        <div className="mb-6">
          <div className="gap-4 grid grid-cols-2 text-gray-500 text-xs">
            <div>
              <span>Thời gian tạo: </span>
              <span>{format(new Date(task.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi })}</span>
            </div>
            <div>
              <span>Cập nhật lúc: </span>
              <span>{format(new Date(task.updatedAt), 'dd/MM/yyyy HH:mm', { locale: vi })}</span>
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
            <span className="font-medium">{format(new Date(task.deadline), 'dd/MM/yyyy - HH:mm', { locale: vi })}</span>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-medium text-gray-700 text-sm">Tiến độ</span>
            <div>
              <Progress variant="circle" percent={task.progress} gapDegree={70} gapPosition="bottom" size="sm" />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <HiUsers className="w-4 h-4 text-gray-500" />
            <h3 className="font-medium text-gray-700 text-sm">Người được giao việc</h3>
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

        {(task.type === TaskType.SET_CAMPAIGN || task.type === TaskType.LAUNCH_CAMPAIGN) && (
          <div className="bg-blue-50 mb-6 p-4 border border-blue-100 rounded-lg">
            <h5 className="mb-3">Thông tin chiến dịch</h5>
            <div className="gap-4 grid grid-cols-2 text-sm">
              {task.numberOfCampaigns && (
                <div>
                  <span>Số chiến dịch:</span>
                  <span className="ml-1 font-medium text-blue-700">{task.numberOfCampaigns}</span>
                </div>
              )}
              {task.numberOfBackupCampaigns && (
                <div>
                  <span>Chiến dịch dự phòng:</span>
                  <span className="ml-1 font-medium text-blue-700">{task.numberOfBackupCampaigns}</span>
                </div>
              )}
              {task.dailyBudget && (
                <div>
                  <span>Ngân sách hàng ngày:</span>
                  <span className="ml-1 font-medium text-blue-700">{task.dailyBudget.toLocaleString('vi-VN')} VNĐ</span>
                </div>
              )}
              {task.numberOfAccounts && (
                <div>
                  <span>Số tài khoản:</span>
                  <span className="ml-1 font-medium text-blue-700">{task.numberOfAccounts}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {task.note && (
          <div className="mb-6">
            <h3 className="mb-2 font-medium text-gray-700 text-sm">Ghi chú</h3>
            <div className="bg-gray-50 p-3 border rounded-lg">
              <p className="text-gray-700 text-sm whitespace-pre-wrap">{task.note}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between pt-4 border-t">
        <Button size="sm" variant="default" onClick={closeDialog}>
          Đóng
        </Button>
        <div className="flex gap-2">
          <Button size="sm" variant="twoTone" onClick={onDelete}>
            Xóa
          </Button>
          <Button size="sm" variant="solid" onClick={onEdit}>
            Chỉnh sửa
          </Button>
        </div>
      </div>
    </div>
  )
}

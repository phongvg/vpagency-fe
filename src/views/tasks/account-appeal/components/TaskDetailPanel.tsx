import { Avatar, Button } from '@/components/ui'
import { formatDate } from '@/helpers/formatDate'
import { HiCalendar, HiCheckCircle, HiClipboardList, HiPencil } from 'react-icons/hi'
import { useAccountAppealStore } from '../store/useAccountAppealStore'
import { AccountAppeal } from '../types/accountAppeal.type'

export default function TaskDetailPanel() {
  const { selectedTask, openDialog } = useAccountAppealStore()

  if (!selectedTask) return null

  const task = selectedTask as AccountAppeal

  const handleEdit = () => {
    openDialog('EDIT')
  }

  const successRate = task.appealCount > 0 ? ((task.successCount || 0) / task.appealCount) * 100 : 0

  return (
    <div>
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-xl font-semibold flex-1">{task.name}</h3>
        <Button size="sm" icon={<HiPencil />} onClick={handleEdit}>
          Chỉnh sửa
        </Button>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <HiCalendar className="text-lg" />
              <span className="text-sm font-medium">Ngày kháng</span>
            </div>
            <p className="text-gray-800 font-semibold">{formatDate(task.appealDate, 'DD/MM/YYYY')}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <HiClipboardList className="text-lg" />
              <span className="text-sm font-medium">Số lượng kháng</span>
            </div>
            <p className="text-gray-800 font-semibold">{task.appealCount}</p>
          </div>

          {task.successCount !== undefined && (
            <div className="bg-green-50 p-4 rounded-lg md:col-span-2">
              <div className="flex items-center gap-2 text-green-700 mb-2">
                <HiCheckCircle className="text-lg" />
                <span className="text-sm font-medium">Kết quả</span>
              </div>
              <p className="text-green-900 font-semibold">
                {task.successCount}/{task.appealCount} thành công ({successRate.toFixed(0)}%)
              </p>
            </div>
          )}
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Người nhận việc</h4>
          <div className="flex flex-wrap gap-2">
            {task.assignedUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200"
              >
                <Avatar size={28} shape="circle" className="bg-blue-500 text-white">
                  {user.firstName?.[0] || user.username?.[0] || '?'}
                </Avatar>
                <span className="text-sm font-medium">
                  {user.firstName || ''} {user.lastName || ''} <span className="text-gray-500">({user.username})</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {task.note && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Ghi chú</h4>
            <p className="text-gray-800 bg-amber-50 p-4 rounded-lg border border-amber-200 whitespace-pre-wrap">
              {task.note}
            </p>
          </div>
        )}

        <div className="pt-4 border-t text-sm text-gray-500 space-y-1">
          <p>
            <span className="font-medium">Tạo bởi:</span> {task.creator?.username || 'N/A'}
          </p>
          <p>
            <span className="font-medium">Ngày tạo:</span> {formatDate(task.createdAt)}
          </p>
          <p>
            <span className="font-medium">Cập nhật:</span> {formatDate(task.updatedAt)}
          </p>
        </div>
      </div>
    </div>
  )
}

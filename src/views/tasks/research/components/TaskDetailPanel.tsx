import { Avatar, Button } from '@/components/ui'
import { formatDate } from '@/helpers/formatDate'
import { HiCalendar, HiLightningBolt, HiPencil } from 'react-icons/hi'
import { useResearchStore } from '../store/useResearchStore'
import { Research, ResearchDifficulty } from '../types/research.type'

const difficultyLabels: Record<ResearchDifficulty, string> = {
  [ResearchDifficulty.EASY]: 'Dễ',
  [ResearchDifficulty.MEDIUM]: 'Trung bình',
  [ResearchDifficulty.HARD]: 'Khó',
}

const difficultyColors: Record<ResearchDifficulty, string> = {
  [ResearchDifficulty.EASY]: 'text-green-600 bg-green-100',
  [ResearchDifficulty.MEDIUM]: 'text-yellow-600 bg-yellow-100',
  [ResearchDifficulty.HARD]: 'text-red-600 bg-red-100',
}

export default function TaskDetailPanel() {
  const { selectedTask, openDialog } = useResearchStore()

  if (!selectedTask) return null

  const task = selectedTask as Research

  const handleEdit = () => {
    openDialog('EDIT')
  }

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
              <span className="text-sm font-medium">Ngày bắt đầu</span>
            </div>
            <p className="text-gray-800 font-semibold">{formatDate(task.startDate, 'DD/MM/YYYY')}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <HiLightningBolt className="text-lg" />
              <span className="text-sm font-medium">Độ khó</span>
            </div>
            <span
              className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                difficultyColors[task.difficulty]
              }`}
            >
              {difficultyLabels[task.difficulty]}
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Nội dung nghiên cứu</h4>
          <p className="text-gray-800 bg-blue-50 p-4 rounded-lg border border-blue-200 whitespace-pre-wrap leading-relaxed">
            {task.content}
          </p>
        </div>

        {task.result && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Kết quả nghiên cứu</h4>
            <p className="text-gray-800 bg-green-50 p-4 rounded-lg border-2 border-green-300 whitespace-pre-wrap leading-relaxed">
              {task.result}
            </p>
          </div>
        )}

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

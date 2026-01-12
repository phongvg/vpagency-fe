import { Loading } from '@/components/shared'
import { Pagination } from '@/components/ui'
import { useQueryParam } from '@/hooks/useQueryParam'
import { Suspense, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDocumentAppealStore } from '../store/useDocumentAppealStore'
import { DocumentAppeal } from '../types/documentAppeal.type'
import TaskDetailPanel from './TaskDetailPanel'

// Mock hook - sẽ thay bằng real API hook sau
const useMockData = () => {
  return {
    data: {
      items: [],
      meta: {
        total: 0,
        page: 1,
        limit: 10,
      },
    },
  }
}

const useMockDetail = (id: string | null) => {
  return {
    data: null,
    isFetching: false,
  }
}

export default function TaskSplitView() {
  const id = useQueryParam('id')
  const navigate = useNavigate()
  const { selectedTask, setSelectedTask, filters, setFilters } = useDocumentAppealStore()
  const { data: taskList } = useMockData()
  const { data: taskDetail, isFetching: isLoadingTask } = useMockDetail(id)
  const [isMobileDetailView, setIsMobileDetailView] = useState(false)

  const handleTaskSelect = (task: DocumentAppeal) => {
    setSelectedTask(task)
    navigate(`?id=${task.id}`)
    setIsMobileDetailView(true)
  }

  const handlePageChange = (page: number) => {
    setFilters({ page })
  }

  const handleBackToList = () => {
    setIsMobileDetailView(false)
    navigate('?')
  }

  return (
    <div className="grid md:grid-cols-3 h-full">
      <div
        className={`flex flex-col md:col-span-1 border-gray-200 md:border-r ${
          isMobileDetailView ? 'hidden md:flex' : 'col-span-full md:col-span-1'
        }`}
      >
        <TaskListPanel
          tasks={taskList?.items ?? []}
          selectedTaskId={selectedTask?.id ?? null}
          pagination={{
            total: taskList?.meta?.total ?? 0,
            currentPage: taskList?.meta?.page ?? 1,
            pageSize: taskList?.meta?.limit ?? 10,
            onPageChange: handlePageChange,
          }}
          onTaskSelect={handleTaskSelect}
        />
      </div>

      <div
        className={`flex flex-col md:col-span-2 ${
          isMobileDetailView ? 'col-span-full md:col-span-2' : 'hidden md:flex'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {isMobileDetailView && (
            <div className="md:hidden bg-white p-4 border-gray-200 border-b">
              <button
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                onClick={handleBackToList}
              >
                <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Quay lại danh sách
              </button>
            </div>
          )}

          <div className="flex-1 overflow-hidden">
            {isLoadingTask ? (
              <div className="flex justify-center items-center h-full">
                <Loading loading={true} />
              </div>
            ) : selectedTask ? (
              <Suspense fallback={<Loading />}>
                <div className="p-4 md:p-6 h-full overflow-y-auto">
                  <TaskDetailPanel />
                </div>
              </Suspense>
            ) : (
              <div className="flex justify-center items-center h-full text-gray-500">
                <div className="px-4 text-center">
                  <p className="mb-2 font-medium text-lg">Chọn một công việc</p>
                  <p className="text-sm">Chọn một công việc từ danh sách bên trái để xem chi tiết</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface TaskListPanelProps {
  tasks: DocumentAppeal[]
  selectedTaskId: string | null
  onTaskSelect: (task: DocumentAppeal) => void
  pagination: {
    total: number
    currentPage: number
    pageSize: number
    onPageChange: (page: number) => void
  }
}

function TaskListPanel({ tasks, selectedTaskId, onTaskSelect, pagination }: TaskListPanelProps) {
  const { total, currentPage, pageSize, onPageChange } = pagination

  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex justify-center items-center h-full text-gray-500">
        <p>Không có công việc nào</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-50 p-3 md:p-4 border-gray-200 border-b">
        <h5 className="text-sm md:text-base">Danh sách công việc ({total})</h5>
      </div>

      <div className="flex-1 overflow-y-auto">
        {tasks.map((task) => (
          <TaskListItem
            key={task.id}
            task={task}
            isSelected={selectedTaskId === task.id}
            onClick={() => onTaskSelect(task)}
          />
        ))}
      </div>

      {total > pageSize && (
        <div className="bg-white p-3 md:p-4 border-gray-200 border-t">
          <Pagination total={total} currentPage={currentPage} pageSize={pageSize} onChange={onPageChange} />
        </div>
      )}
    </div>
  )
}

interface TaskListItemProps {
  task: DocumentAppeal
  isSelected: boolean
  onClick: () => void
}

function TaskListItem({ task, isSelected, onClick }: TaskListItemProps) {
  const successRate = task.appealCount > 0 ? ((task.successCount || 0) / task.appealCount) * 100 : 0

  return (
    <div
      className={`p-3 md:p-4 border-b border-gray-100 cursor-pointer transition-colors ${
        isSelected ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'hover:bg-gray-50 active:bg-gray-100'
      }`}
      onClick={onClick}
    >
      <div className="space-y-2">
        <p className="font-medium text-sm md:text-base line-clamp-2">{task.name}</p>
        <div className="flex flex-col gap-1 text-xs text-gray-600">
          <span className="truncate">{task.platform}</span>
          <div className="flex items-center gap-3">
            <span>SL: {task.appealCount}</span>
            {task.successCount !== undefined && (
              <span className="text-green-600">Thành công: {successRate.toFixed(0)}%</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

import { Task } from '@/@types/task'
import { Loading } from '@/components/shared'
import { Pagination } from '@/components/ui'
import { useQueryParam } from '@/hooks/useQueryParam'
import TaskDetailPanel from '@/views/tasks/assign/components/TaskDetailPanel'
import { useGetTaskDetail, useGetTasksWithFilters } from '@/views/tasks/assign/hooks/useTask'
import { useBoardStore } from '@/views/tasks/assign/store/useBoardStore'
import { Suspense, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function TaskSplitView() {
  const id = useQueryParam('id')
  const navigate = useNavigate()
  const { selectedTask, setSelectedTask, filters, setFilters } = useBoardStore()
  const { data: taskList } = useGetTasksWithFilters(true)
  const { data: taskDetail, isFetching: isLoadingTask } = useGetTaskDetail(id)
  const [isMobileDetailView, setIsMobileDetailView] = useState(false)

  useEffect(() => {
    if (taskDetail) {
      setSelectedTask(taskDetail)
    }

    return () => {
      setSelectedTask(null)
    }
  }, [taskDetail, setSelectedTask])

  const handleTaskSelect = (task: Task) => {
    navigate(`?id=${task.id}`)
    setIsMobileDetailView(true)
  }

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page })
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
                  <TaskDetailPanel inSplitView />
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
  tasks: Task[]
  selectedTaskId: string | null
  onTaskSelect: (task: Task) => void
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
  task: Task
  isSelected: boolean
  onClick: () => void
}

function TaskListItem({ task, isSelected, onClick }: TaskListItemProps) {
  return (
    <div
      className={`p-3 md:p-4 border-b border-gray-100 cursor-pointer transition-colors ${
        isSelected ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'hover:bg-gray-50 active:bg-gray-100'
      }`}
      onClick={onClick}
    >
      <div className="space-y-2">
        <p className="font-medium text-sm md:text-base line-clamp-2 md:line-clamp-1">{task.name}</p>
      </div>
    </div>
  )
}

import { Task } from '@/@types/task'
import { useBoardStore } from '@/views/tasks/assign/store/useBoardStore'
import TaskDetailPanel from '@/views/tasks/assign/components/TaskDetailPanel'
import TaskFormContent from '@/views/tasks/assign/components/TaskFormContent'
import { useState } from 'react'
import { Loading } from '@/components/shared'
import { Suspense } from 'react'
import { useGetTasksWithFilters } from '@/views/tasks/assign/hooks/useTaskQueries'

export default function TaskSplitView() {
  const { selectedTask, dialogView, setSelectedTask } = useBoardStore()
  const { data: tasksResponse, isLoading } = useGetTasksWithFilters(true)

  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)

  const handleTaskSelect = (task: Task) => {
    setSelectedTaskId(task.id)
    setSelectedTask(task)
  }

  return (
    <div className="grid grid-cols-3 h-full">
      <div className="flex flex-col col-span-1 border-gray-200 border-r">
        <TaskListPanel tasks={tasksResponse ?? []} selectedTaskId={selectedTaskId} onTaskSelect={handleTaskSelect} />
      </div>

      <div className="flex flex-col col-span-2">
        {selectedTask ? (
          <div className="flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-hidden">
              {dialogView === 'EDIT' ? (
                <Suspense fallback={<Loading />}>
                  <div className="p-6 h-full overflow-y-auto">
                    <TaskFormContent inSplitView={true} />
                  </div>
                </Suspense>
              ) : (
                <Suspense fallback={<Loading />}>
                  <div className="p-6 h-full overflow-y-auto">
                    <TaskDetailPanel inSplitView={true} />
                  </div>
                </Suspense>
              )}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-full text-gray-500">
            <div className="text-center">
              <p className="mb-2 font-medium text-lg">Chọn một công việc</p>
              <p className="text-sm">Chọn một công việc từ danh sách bên trái để xem chi tiết</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

interface TaskListPanelProps {
  tasks: Task[]
  selectedTaskId: string | null
  onTaskSelect: (task: Task) => void
}

function TaskListPanel({ tasks, selectedTaskId, onTaskSelect }: TaskListPanelProps) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex justify-center items-center h-full text-gray-500">
        <p>Không có công việc nào</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-50 p-4 border-gray-200 border-b">
        <h5>Danh sách công việc ({tasks.length})</h5>
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
      className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
        isSelected ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      <div className="space-y-2">
        <p className="font-medium line-clamp-1">{task.name}</p>
      </div>
    </div>
  )
}

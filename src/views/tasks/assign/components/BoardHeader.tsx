import { Button } from '@/components/ui'
import { TaskViewType } from '@/enums/taskView.enum'
import { useBoardStore } from '@/views/tasks/assign/store/useBoardStore'
import TaskViewTabs from '@/views/tasks/assign/components/TaskViewTabs'
import TaskFilters from '@/views/tasks/assign/components/TaskFilters'
import { HiOutlinePlus } from 'react-icons/hi'
import { useAuthStore } from '@/store/auth/useAuthStore'
import { isAdminOrManager } from '@/utils/checkRole'

interface BoardHeaderProps {
  activeView: TaskViewType
  onViewChange: (view: TaskViewType) => void
}

export default function BoardHeader({ activeView, onViewChange }: BoardHeaderProps) {
  const { openDialog, setSelectedTask } = useBoardStore()
  const { user } = useAuthStore()

  const handleCreateTask = () => {
    setSelectedTask(null)
    openDialog('CREATE')
  }

  return (
    <div className="space-y-4 pb-4 border-gray-200 border-b">
      <div className="flex justify-between items-center">
        <TaskViewTabs activeView={activeView} onViewChange={onViewChange} />

        {isAdminOrManager(user?.roles) && (
          <Button size="sm" variant="solid" icon={<HiOutlinePlus />} onClick={handleCreateTask}>
            Thêm mới
          </Button>
        )}
      </div>

      {activeView === TaskViewType.SPLIT && <TaskFilters />}
    </div>
  )
}

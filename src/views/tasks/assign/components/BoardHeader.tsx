import { useState } from 'react'
import { Button, UserSelect } from '@/components/ui'
import { UserOption } from '@/components/ui/UserSelect/UserSelect'
import { TaskViewType } from '@/enums/taskView.enum'
import { useBoardStore } from '@/views/tasks/assign/store/useBoardStore'
import TaskViewTabs from '@/views/tasks/assign/components/TaskViewTabs'
import TaskFilters from '@/views/tasks/assign/components/TaskFilters'
import { HiOutlinePlusCircle } from 'react-icons/hi'
import { TasksFilterRequest } from '@/@types/task'

interface BoardHeaderProps {
  activeView: TaskViewType
  onViewChange: (view: TaskViewType) => void
}

export default function BoardHeader({ activeView, onViewChange }: BoardHeaderProps) {
  const [assignedUsers, setAssignedUsers] = useState<UserOption | null>(null)
  const { filters, isFiltered, openDialog, setSelectedTask, setFilters, clearFilters } = useBoardStore()

  const handleUserChange = (option: UserOption | null) => {
    setAssignedUsers(option)
  }

  const handleFiltersChange = (newFilters: TasksFilterRequest) => {
    setFilters({
      ...newFilters,
      assignedUserId: assignedUsers ? assignedUsers.value : undefined,
    })
  }

  const handleCreateTask = () => {
    setSelectedTask(null)
    openDialog('CREATE')
  }

  const resetAssignedUserFilter = () => {
    setAssignedUsers(null)
    setFilters({
      ...filters,
      assignedUserId: undefined,
    })
  }

  return (
    <div className="space-y-4 pb-4 border-gray-200 border-b">
      <div className="flex justify-between items-center">
        <TaskViewTabs activeView={activeView} onViewChange={onViewChange} />
        <Button size="sm" icon={<HiOutlinePlusCircle />} onClick={handleCreateTask}>
          <span>Thêm mới</span>
        </Button>
      </div>

      {activeView === TaskViewType.SPLIT && (
        <>
          <div className="flex items-center gap-4">
            <TaskFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={clearFilters}
              isFiltered={isFiltered}
              onResetAssignedUserFilter={resetAssignedUserFilter}
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-80">
              <UserSelect
                value={assignedUsers}
                onChange={handleUserChange}
                placeholder="Lọc theo người được giao việc"
                className="min-w-[300px]"
                size="sm"
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

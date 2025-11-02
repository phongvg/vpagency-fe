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
  const { openDialog, setSelectedTask } = useBoardStore()

  const handleCreateTask = () => {
    setSelectedTask(null)
    openDialog('CREATE')
  }

  return (
    <div className="space-y-4 pb-4 border-gray-200 border-b">
      <div className="flex justify-between items-center">
        <TaskViewTabs activeView={activeView} onViewChange={onViewChange} />
        <Button size="sm" icon={<HiOutlinePlusCircle />} onClick={handleCreateTask}>
          <span>Thêm mới</span>
        </Button>
      </div>

      {activeView === TaskViewType.SPLIT && <TaskFilters />}
    </div>
  )
}

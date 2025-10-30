import { Button, Input, Select } from '@/components/ui'
import {
  TaskPriority,
  TaskPriorityLabels,
  TaskStatus,
  TaskStatusLabels,
  TaskType,
  TaskTypeLabels,
} from '@/enums/task.enum'
import { HiOutlineSearch } from 'react-icons/hi'
import { useState, useEffect } from 'react'
import { TasksFilterRequest } from '@/@types/task'

interface TaskFiltersProps {
  filters: TasksFilterRequest
  isFiltered?: boolean
  onFiltersChange: (filters: TasksFilterRequest) => void
  onClearFilters: () => void
  onResetAssignedUserFilter: () => void
}

const statusOptions = [
  { value: '', label: 'Tất cả trạng thái' },
  ...Object.values(TaskStatus).map((status) => ({
    value: status,
    label: TaskStatusLabels[status],
  })),
]

const typeOptions = [
  { value: '', label: 'Tất cả loại' },
  ...Object.values(TaskType).map((type) => ({
    value: type,
    label: TaskTypeLabels[type],
  })),
]

const priorityOptions = [
  { value: '', label: 'Tất cả độ ưu tiên' },
  ...Object.values(TaskPriority).map((priority) => ({
    value: priority,
    label: TaskPriorityLabels[priority],
  })),
]

export default function TaskFilters({
  filters,
  isFiltered = false,
  onFiltersChange,
  onClearFilters,
  onResetAssignedUserFilter,
}: TaskFiltersProps) {
  const [localFilters, setLocalFilters] = useState<TasksFilterRequest>(filters)
  const [selectKey, setSelectKey] = useState(0)

  useEffect(() => {
    setLocalFilters(filters)
    setSelectKey((prev) => prev + 1)
  }, [filters])

  const handleFilterChange = (key: keyof TasksFilterRequest, value: any) => {
    const newFilters = {
      ...localFilters,
      [key]: value,
    }
    setLocalFilters(newFilters)
  }

  const handleSearch = () => {
    onFiltersChange(localFilters)
  }

  const handleClearFilters = () => {
    const emptyFilters: TasksFilterRequest = {
      page: 1,
      limit: 10,
      search: '',
      status: undefined,
      type: undefined,
      priority: undefined,
      assignedUserId: undefined,
    }
    setLocalFilters(emptyFilters)
    onResetAssignedUserFilter()
    onClearFilters()
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="min-w-[250px]">
            <Input
              prefix={<HiOutlineSearch className="w-4 h-4 text-gray-400" />}
              placeholder="Tìm kiếm theo tên công việc..."
              value={localFilters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              size="sm"
            />
          </div>
        </div>

        <div className="min-w-[160px]">
          <Select
            key={`status-${selectKey}`}
            value={statusOptions.find((opt) => opt.value === (localFilters.status || ''))}
            onChange={(option: any) => handleFilterChange('status', option?.value || '')}
            options={statusOptions}
            placeholder="Trạng thái"
            className="min-w-[160px]"
            size="sm"
          />
        </div>

        <div className="min-w-[160px]">
          <Select
            key={`type-${selectKey}`}
            value={typeOptions.find((opt) => opt.value === (localFilters.type || ''))}
            onChange={(option: any) => handleFilterChange('type', option?.value || '')}
            options={typeOptions}
            placeholder="Loại công việc"
            className="min-w-[160px]"
            size="sm"
          />
        </div>

        <div className="min-w-[140px]">
          <Select
            key={`priority-${selectKey}`}
            value={priorityOptions.find((opt) => opt.value === (localFilters.priority || ''))}
            onChange={(option: any) => handleFilterChange('priority', option?.value || '')}
            options={priorityOptions}
            placeholder="Độ ưu tiên"
            className="min-w-[140px]"
            size="sm"
          />
        </div>

        <div className="flex items-center gap-3">
          <Button size="sm" variant="solid" onClick={handleSearch} icon={<HiOutlineSearch />}>
            Tìm kiếm
          </Button>
          {isFiltered && (
            <Button size="sm" variant="twoTone" onClick={handleClearFilters}>
              Xóa bộ lọc
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

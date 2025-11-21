import { SelectOption } from '@/@types/common'
import { TasksFilterRequest } from '@/views/tasks/assign/types/task.type'
import { Button, DatePicker, Input, Select, UserSelect } from '@/components/ui'
import { UserOption } from '@/components/ui/UserSelect/UserSelect'
import {
  TaskPriority,
  TaskPriorityLabels,
  TaskStatus,
  TaskStatusLabels,
  TaskType,
  TaskTypeLabels,
} from '@/enums/task.enum'
import { formatDate } from '@/helpers/formatDate'
import { useDebounce } from '@/hooks/useDebounce'
import { apiGetProjectList } from '@/views/projects/services/ProjectService'
import { useBoardStore } from '@/views/tasks/assign/store/useBoardStore'
import 'dayjs/locale/vi'
import { useEffect, useMemo, useState } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import AsyncSelect from 'react-select/async'

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

export default function TaskFilters() {
  const { filters, setFilters, clearFilters } = useBoardStore()

  const [assignedUsers, setAssignedUsers] = useState<UserOption | null>(null)
  const [creators, setCreators] = useState<UserOption | null>(null)
  const [selectedProject, setSelectedProject] = useState<SelectOption | null>(null)
  const [searchValue, setSearchValue] = useState(filters.search || '')

  const debouncedSearchValue = useDebounce(searchValue, 500)

  useEffect(() => {
    setFilters({
      ...filters,
      search: debouncedSearchValue,
    })
  }, [debouncedSearchValue])

  const isFiltered = useMemo(() => {
    return (
      !!filters.search ||
      !!filters.status ||
      !!filters.type ||
      !!filters.priority ||
      !!filters.assignedUserId ||
      !!filters.creatorId ||
      !!filters.projectId ||
      !!filters.fromDate ||
      !!filters.toDate
    )
  }, [filters])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleFilterChange = (key: keyof TasksFilterRequest, value: string) => {
    setFilters({
      ...filters,
      [key]: value,
    })
  }

  const onDateChange = (key: 'fromDate' | 'toDate', date: Date | null) => {
    setFilters({
      ...filters,
      [key]: date ? formatDate(date, 'YYYY-MM-DD') : undefined,
    })
  }

  const handleAssignedUserChange = (option: UserOption | null) => {
    setAssignedUsers(option)
    setFilters({
      ...filters,
      assignedUserId: option ? option.value : undefined,
    })
  }

  const handleCreatorChange = (option: UserOption | null) => {
    setCreators(option)
    setFilters({
      ...filters,
      creatorId: option ? option.value : undefined,
    })
  }

  const handleProjectChange = (option: SelectOption | null) => {
    setSelectedProject(option)
    setFilters({
      ...filters,
      projectId: option ? option.value : undefined,
    })
  }

  const fetchProjectOptions = async (inputValue: string) => {
    try {
      const response = await apiGetProjectList({ search: inputValue, page: 1, limit: 10 })
      return response.data.data.items.map((project) => ({
        value: project.id,
        label: project.name,
      }))
    } catch {
      return []
    }
  }

  const handleClearFilters = () => {
    clearFilters()
    setAssignedUsers(null)
    setCreators(null)
    setSelectedProject(null)
    setSearchValue('')
  }

  return (
    <>
      <div className="gap-4 grid grid-cols-2 lg:grid-cols-6">
        <Input
          prefix={<HiOutlineSearch className="w-4 h-4 text-gray-400" />}
          placeholder="Tìm kiếm theo tên..."
          value={searchValue}
          size="sm"
          onChange={handleSearchChange}
        />

        <Select
          value={statusOptions.find((opt) => opt.value === (filters.status || ''))}
          options={statusOptions}
          placeholder="Trạng thái"
          size="sm"
          onChange={(option: any) => handleFilterChange('status', option?.value || '')}
        />

        <Select
          value={typeOptions.find((opt) => opt.value === (filters.type || ''))}
          options={typeOptions}
          placeholder="Loại công việc"
          size="sm"
          onChange={(option: any) => handleFilterChange('type', option?.value || '')}
        />

        <Select
          value={priorityOptions.find((opt) => opt.value === (filters.priority || ''))}
          options={priorityOptions}
          placeholder="Độ ưu tiên"
          size="sm"
          onChange={(option: any) => handleFilterChange('priority', option?.value || '')}
        />

        <UserSelect value={assignedUsers} placeholder="Người nhận việc" size="sm" onChange={handleAssignedUserChange} />

        <UserSelect value={creators} placeholder="Người tạo" size="sm" onChange={handleCreatorChange} />
      </div>

      <div className="gap-4 grid grid-cols-2 lg:grid-cols-6">
        <Select
          defaultOptions
          cacheOptions
          componentAs={AsyncSelect}
          placeholder="Dự án"
          value={selectedProject}
          loadOptions={fetchProjectOptions}
          size="sm"
          onChange={handleProjectChange}
        />

        <DatePicker
          locale="vi"
          size="sm"
          placeholder="Từ ngày"
          value={filters.fromDate ? new Date(filters.fromDate) : null}
          onChange={(date) => onDateChange('fromDate', date)}
        />

        <DatePicker
          locale="vi"
          size="sm"
          placeholder="Đến ngày"
          value={filters.toDate ? new Date(filters.toDate) : null}
          minDate={filters.fromDate ? new Date(filters.fromDate) : undefined}
          onChange={(date) => onDateChange('toDate', date)}
        />

        {isFiltered && (
          <div className="flex items-center gap-4">
            <Button size="sm" variant="twoTone" onClick={handleClearFilters}>
              Xóa bộ lọc
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

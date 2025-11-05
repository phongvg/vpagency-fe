import { Task } from '@/@types/task'
import { DataTable } from '@/components/shared'
import { Badge, Card, Tag } from '@/components/ui'
import { TaskPriority, TaskPriorityLabels, TaskStatusColors, TaskStatusLabels } from '@/enums/task.enum'
import { useAuthStore } from '@/store/auth/useAuthStore'
import { isMember } from '@/utils/checkRole'
import UsersAvatarGroup from '@/views/tasks/assign/components/UsersAvatarGroup'
import { useGetTasksWithFilters } from '@/views/tasks/assign/hooks/useTaskQueries'
import { useBoardStore } from '@/views/tasks/assign/store/useBoardStore'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

const PriorityTag = ({ priority }: { priority: TaskPriority }) => {
  switch (priority) {
    case TaskPriority.URGENT:
      return <Tag className="bg-red-100 border-0 rounded text-red-600">{TaskPriorityLabels[TaskPriority.URGENT]}</Tag>
    case TaskPriority.HIGH:
      return <Tag className="bg-red-50 border-0 rounded text-red-600">{TaskPriorityLabels[TaskPriority.HIGH]}</Tag>
    case TaskPriority.MEDIUM:
      return (
        <Tag className="bg-amber-100 border-0 rounded text-amber-600">{TaskPriorityLabels[TaskPriority.MEDIUM]}</Tag>
      )
    case TaskPriority.LOW:
      return <Tag className="bg-blue-100 border-0 rounded text-blue-600">{TaskPriorityLabels[TaskPriority.LOW]}</Tag>
    default:
      return null
  }
}

export default function MyTasks() {
  const { user } = useAuthStore()

  const { data: taskList, isLoading } = useGetTasksWithFilters(isMember(user?.roles))
  const { filters, setFilters } = useBoardStore()

  const columns: ColumnDef<Task>[] = useMemo(
    () => [
      {
        header: 'STT',
        accessorKey: 'index',
        cell: (props) => {
          const row = props.row.index
          return <span>{(filters.page - 1) * filters.limit + row + 1}</span>
        },
      },
      {
        header: 'Tên công việc',
        accessorKey: 'name',
      },
      {
        header: 'Trạng thái',
        accessorKey: 'status',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex items-center gap-2">
              <Badge className={`bg-${TaskStatusColors[row.status]}`} />
              <span className={`capitalize font-semibold text-${TaskStatusColors[row.status]}`}>
                {TaskStatusLabels[row.status]}
              </span>
            </div>
          )
        },
      },
      {
        header: 'Độ ưu tiên',
        accessorKey: 'priority',
        cell: (props) => {
          const { priority } = props.row.original
          return <PriorityTag priority={priority} />
        },
      },
      {
        header: 'Người nhận việc',
        accessorKey: 'Assignees',
        cell: (props) => {
          const row = props.row.original
          return <UsersAvatarGroup users={row.assignedUsers} />
        },
      },
    ],
    [],
  )

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page })
  }

  const onSelectChange = (value: number) => {
    const newFilter = { ...filters, limit: value, page: 1 }
    setFilters(newFilter)
  }

  return (
    <Card>
      <DataTable
        columns={columns}
        data={taskList?.items ?? []}
        skeletonAvatarColumns={[3]}
        skeletonAvatarProps={{ width: 32, height: 32 }}
        loading={isLoading}
        pagingData={{
          total: taskList?.meta.total as number,
          pageIndex: taskList?.meta.page as number,
          pageSize: taskList?.meta.limit as number,
        }}
        onPaginationChange={handlePageChange}
        onSelectChange={onSelectChange}
      />
    </Card>
  )
}

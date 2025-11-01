import { useMemo } from 'react'
import { useGetProjectsQuery, useDeleteProjectMutation } from '@/views/projects/hooks/useProjectsQueries'
import { ColumnDef } from '@tanstack/react-table'
import { Project } from '@/@types/project'
import { Avatar, Badge } from '@/components/ui'
import { DataTable } from '@/components/shared'
import { useProjectStore } from '@/views/projects/store/useProjectStore'
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'
import ProjectEditDialog from '@/views/projects/components/ProjectEditDialog'
import { ProjectStatusLabels, ProjectTypeLabels } from '@/enums/project.enum'
import { toastSuccess, toastError } from '@/utils/toast'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import { ConfirmDialog } from '@/components/ui'
import { Link } from 'react-router-dom'
import { urlConfig } from '@/configs/urls.config'

const statusColor: Record<string, string> = {
  RUNNING: 'emerald-500',
  STOPPED: 'red-500',
  WAITING: 'yellow-500',
  DONE: 'blue-500',
  ON_HOLD: 'gray-500',
}

const OwnerColumn = ({ row }: { row: Project }) => {
  const ownerName = row.owner
    ? `${row.owner.firstName || ''} ${row.owner.lastName || ''}`.trim() || row.owner.username
    : 'N/A'

  return (
    <div className="flex items-center">
      <Avatar size={38} shape="circle" src={row.owner?.avatar ?? ''} />
      <span className="rtl:mr-2 ml-2 max-w-[150px] truncate">{ownerName}</span>
    </div>
  )
}

export default function ProjectTable() {
  const { filter, setFilter, setDialogOpen, setSelectedProject } = useProjectStore()
  const { data: getProjectsResponse, isLoading } = useGetProjectsQuery()
  const deleteProjectMutation = useDeleteProjectMutation()
  const { showConfirm, confirmProps } = useConfirmDialog({
    title: 'Xác nhận xóa dự án',
    type: 'danger',
    confirmText: 'Xóa',
    cancelText: 'Hủy',
  })

  const metaTableData = useMemo(() => getProjectsResponse?.meta, [getProjectsResponse])

  const handleEdit = (project: Project) => {
    setSelectedProject(project)
    setDialogOpen(true)
  }

  const handleDelete = async (project: Project) => {
    const confirmed = await showConfirm({
      message: `Bạn có chắc chắn muốn xóa dự án "${project.name}"? Hành động này không thể hoàn tác.`,
    })

    if (confirmed) {
      try {
        await deleteProjectMutation.mutateAsync(project.id)
        toastSuccess('Xóa dự án thành công')
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message || 'Xóa dự án thất bại. Vui lòng kiểm tra lại các ràng buộc dữ liệu.'
        toastError(errorMessage)
      }
    }
  }

  const columns: ColumnDef<Project>[] = useMemo(
    () => [
      {
        header: 'STT',
        accessorKey: 'index',
        cell: (props) => {
          const row = props.row.index
          return <span>{(filter.page - 1) * filter.limit + row + 1}</span>
        },
      },
      {
        header: 'Tên dự án',
        accessorKey: 'name',
        cell: (props) => {
          const row = props.row.original
          return (
            <Link to={urlConfig.projectDetail.replace(':id', row.id)} className="hover:text-indigo-600">
              {row.name}
            </Link>
          )
        },
      },
      {
        header: 'Loại dự án',
        accessorKey: 'type',
        cell: (props) => {
          const row = props.row.original
          return <span>{ProjectTypeLabels[row.type as keyof typeof ProjectTypeLabels] || row.type}</span>
        },
      },
      {
        header: 'Phụ trách',
        accessorKey: 'owner',
        cell: (props) => {
          const row = props.row.original
          return <OwnerColumn row={row} />
        },
      },
      {
        header: 'Tổng ngân sách',
        accessorKey: 'totalBudget',
        cell: (props) => {
          const row = props.row.original
          return <span>{row.totalBudget ? row.totalBudget.toLocaleString('vi-VN') : '0'} đ</span>
        },
      },
      {
        header: 'Ngân sách còn lại',
        accessorKey: 'spentBudget',
        cell: (props) => {
          const row = props.row.original
          return <span>{row.spentBudget ? row.spentBudget.toLocaleString('vi-VN') : '0'} đ</span>
        },
      },
      {
        header: 'Trạng thái',
        accessorKey: 'status',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex items-center gap-2">
              <Badge className={`bg-${statusColor[row.status]}`} />
              <span className={`capitalize font-semibold text-${statusColor[row.status]}`}>
                {ProjectStatusLabels[row.status]}
              </span>
            </div>
          )
        },
      },
      {
        header: '',
        id: 'actions',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex items-center gap-4">
              <button type="button" onClick={() => handleEdit(row)}>
                <HiOutlinePencilAlt size={24} />
              </button>
              <button type="button" onClick={() => handleDelete(row)}>
                <HiOutlineTrash size={24} />
              </button>
            </div>
          )
        },
      },
    ],
    [filter, deleteProjectMutation],
  )

  const onPaginationChange = (page: number) => {
    const newFilter = { ...filter, page }
    setFilter(newFilter)
  }

  const onSelectChange = (value: number) => {
    const newFilter = { ...filter, limit: value, page: 1 }
    setFilter(newFilter)
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={getProjectsResponse?.items || []}
        loading={isLoading}
        pagingData={{
          total: metaTableData?.total as number,
          pageIndex: metaTableData?.page as number,
          pageSize: metaTableData?.limit as number,
        }}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
      />
      <ProjectEditDialog />
      <ConfirmDialog {...confirmProps} loading={deleteProjectMutation.isPending} />
    </>
  )
}

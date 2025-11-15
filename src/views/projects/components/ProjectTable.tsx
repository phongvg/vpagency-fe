import { useCallback, useMemo } from 'react'
import { useGetProjectsQuery, useDeleteProjectMutation } from '@/views/projects/hooks/useProjectsQueries'
import { ColumnDef } from '@tanstack/react-table'
import { Avatar, ConfirmDialog } from '@/components/ui'
import { DataTable } from '@/components/shared'
import { useProjectStore } from '@/views/projects/store/useProjectStore'
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import { Link } from 'react-router-dom'
import { urlConfig } from '@/configs/urls.config'
import { Project } from '@/views/projects/types/project.type'
import { formatVietnameseMoney } from '@/helpers/formatVietnameseMoney'

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
  const { filter, openDialog, setFilter, setSelectedProject } = useProjectStore()

  const { data: getProjectsResponse, isLoading } = useGetProjectsQuery()
  const deleteProjectMutation = useDeleteProjectMutation()

  const { showConfirm, confirmProps } = useConfirmDialog({
    title: 'Xác nhận xóa dự án',
    type: 'danger',
    confirmText: 'Xóa',
    cancelText: 'Hủy',
  })

  const metaTableData = useMemo(() => getProjectsResponse?.meta, [getProjectsResponse])

  const handleEdit = useCallback(
    (project: Project) => {
      setSelectedProject(project)
      openDialog()
    },
    [openDialog, setSelectedProject],
  )

  const handleDelete = useCallback(
    async (project: Project) => {
      const confirmed = await showConfirm({
        message: `Bạn có chắc chắn muốn xóa dự án "${project.name}"? Hành động này không thể hoàn tác.`,
      })

      if (confirmed) {
        await deleteProjectMutation.mutateAsync(project.id)
      }
    },
    [deleteProjectMutation, showConfirm],
  )

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
          return <span>{row.type.name}</span>
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
          return <span>{formatVietnameseMoney(row.totalBudget)}</span>
        },
      },
      {
        header: 'Ngân sách còn lại',
        accessorKey: 'spentBudget',
        cell: (props) => {
          const row = props.row.original
          return <span>{formatVietnameseMoney(row.spentBudget)}</span>
        },
      },
      {
        header: 'Trạng thái',
        accessorKey: 'status',
        cell: (props) => {
          const row = props.row.original
          return <span className="font-bold">{row.status.name}</span>
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
    [filter, handleDelete, handleEdit],
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
      <ConfirmDialog {...confirmProps} loading={deleteProjectMutation.isPending} />
    </>
  )
}

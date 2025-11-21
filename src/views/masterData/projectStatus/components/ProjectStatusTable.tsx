import { ProjectStatus } from '@/views/masterData/projectStatus/types/projectStatus.type'
import { DataTable } from '@/components/shared'
import { ConfirmDialog, Switcher } from '@/components/ui'
import { formatDate } from '@/helpers/formatDate'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import ProjectStatusEditDialog from '@/views/masterData/projectStatus/components/ProjectStatusEditDialog'
import {
  useDeleteProjectStatusMutation,
  useGetProjectStatusesQuery,
  useUpdateProjectStatusMutation,
} from '@/views/masterData/projectStatus/hooks/useProjectStatus'
import { useProjectStatusStore } from '@/views/masterData/projectStatus/store/useProjectStatusStore'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'

export default function ProjectStatusTable() {
  const { filter, setFilter, openDialog } = useProjectStatusStore()
  const { data: getProjectStatusesResponse, isLoading } = useGetProjectStatusesQuery()

  const updateProjectStatusMutation = useUpdateProjectStatusMutation()
  const deleteProjectStatusMutation = useDeleteProjectStatusMutation()

  const { showConfirm, confirmProps } = useConfirmDialog({
    title: 'Xác nhận xóa trạng thái dự án',
    type: 'danger',
    confirmText: 'Xóa',
    cancelText: 'Hủy',
  })

  const metaTableData = useMemo(() => getProjectStatusesResponse?.meta, [getProjectStatusesResponse])

  const handleEdit = (row: ProjectStatus) => {
    openDialog(row.id)
  }

  const handleUpdateStatusActive = async (row: ProjectStatus, active: boolean) => {
    await updateProjectStatusMutation.mutateAsync({
      id: row.id || '',
      payload: { active },
    })
  }

  const handleDelete = async (id: string) => {
    const confirmed = await showConfirm({
      message: `Bạn có chắc chắn muốn xóa trạng thái dự án này? Hành động này không thể hoàn tác.`,
    })

    if (confirmed) {
      await deleteProjectStatusMutation.mutateAsync(id)
    }
  }

  const columns: ColumnDef<ProjectStatus>[] = [
    {
      header: 'STT',
      accessorKey: 'index',
      cell: (props) => {
        const row = props.row.index
        return <span>{(filter.page - 1) * filter.limit + row + 1}</span>
      },
    },
    {
      header: 'Tên trạng thái',
      accessorKey: 'name',
    },
    {
      header: 'Hoạt động',
      accessorKey: 'active',
      cell: (props) => {
        const row = props.row.original
        return <Switcher checked={row.active} onChange={() => handleUpdateStatusActive(row, !row.active)} />
      },
    },
    {
      header: 'Ngày tạo',
      accessorKey: 'createdAt',
      cell: (props) => {
        const row = props.row.original
        return <span>{formatDate(row.createdAt)}</span>
      },
    },
    {
      header: 'Ngày cập nhật',
      accessorKey: 'updatedAt',
      cell: (props) => {
        const row = props.row.original
        return <span>{formatDate(row.updatedAt)}</span>
      },
    },
    {
      header: '',
      accessorKey: 'action',
      cell: (props) => {
        const row = props.row.original
        return (
          <div className="flex justify-end items-center gap-4">
            <button type="button" onClick={() => handleEdit(row)}>
              <HiOutlinePencilAlt size={24} />
            </button>
            <button type="button" onClick={() => handleDelete(row.id || '')}>
              <HiOutlineTrash size={24} />
            </button>
          </div>
        )
      },
    },
  ]

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
        data={getProjectStatusesResponse?.items ?? []}
        loading={isLoading}
        pagingData={{
          total: metaTableData?.total as number,
          pageIndex: metaTableData?.page as number,
          pageSize: metaTableData?.limit as number,
        }}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
      />
      <ProjectStatusEditDialog />
      <ConfirmDialog {...confirmProps} />
    </>
  )
}

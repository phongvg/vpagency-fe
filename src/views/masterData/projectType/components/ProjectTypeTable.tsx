import { ProjectType } from '@/@types/projectType'
import { DataTable } from '@/components/shared'
import { ConfirmDialog } from '@/components/ui'
import { formatDate } from '@/helpers/formatDate'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import ProjectTypeEditDialog from '@/views/masterData/projectType/components/ProjectTypeEditDialog'
import {
  useDeleteProjectTypeMutation,
  useGetProjectTypesQuery,
} from '@/views/masterData/projectType/hooks/useProjectType'
import { useProjectTypeStore } from '@/views/masterData/projectType/store/useProjectTypeStore'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'

export default function ProjectTypeTable() {
  const { filter, setFilter, setDialogOpen, setSelectedProjectType } = useProjectTypeStore()
  const { data: getProjectTypesResponse, isLoading } = useGetProjectTypesQuery()
  const deleteProjectTypeMutation = useDeleteProjectTypeMutation()
  const { showConfirm, confirmProps } = useConfirmDialog({
    title: 'Xác nhận xóa loại dự án',
    type: 'danger',
    confirmText: 'Xóa',
    cancelText: 'Hủy',
  })

  const metaTableData = useMemo(() => getProjectTypesResponse?.meta, [getProjectTypesResponse])

  const handleEdit = (row: ProjectType) => {
    setSelectedProjectType(row)
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    const confirmed = await showConfirm({
      message: `Bạn có chắc chắn muốn xóa loại dự án này? Hành động này không thể hoàn tác.`,
    })

    if (confirmed) {
      await deleteProjectTypeMutation.mutateAsync(id)
    }
  }

  const columns: ColumnDef<ProjectType>[] = [
    {
      header: 'STT',
      accessorKey: 'index',
      cell: (props) => {
        const row = props.row.index
        return <span>{(filter.page - 1) * filter.limit + row + 1}</span>
      },
    },
    {
      header: 'Tên loại dự án',
      accessorKey: 'name',
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
            <button type="button" onClick={() => handleDelete(row.id)}>
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
        data={getProjectTypesResponse?.items ?? []}
        loading={isLoading}
        pagingData={{
          total: metaTableData?.total as number,
          pageIndex: metaTableData?.page as number,
          pageSize: metaTableData?.limit as number,
        }}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
      />
      <ProjectTypeEditDialog />
      <ConfirmDialog {...confirmProps} />
    </>
  )
}

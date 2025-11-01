import { AdsGroup } from '@/@types/adsGroup'
import { DataTable } from '@/components/shared'
import { Avatar, Card } from '@/components/ui'
import { formatDate } from '@/helpers/formatDate'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

type Props = {
  data: AdsGroup[]
}

const ManagerColumn = ({ row }: { row: AdsGroup }) => {
  if (!row.manager) {
    return <span className="text-gray-400">Chưa có</span>
  }

  return (
    <div className="flex items-center">
      <Avatar size={32} shape="circle" src={row.manager.avatar ?? ''} />
      <span className="rtl:mr-2 ml-2 max-w-[150px] truncate">
        {row.manager.firstName} {row.manager.lastName}
      </span>
    </div>
  )
}

export default function AdsGroupTable({ data }: Props) {
  const columns: ColumnDef<AdsGroup>[] = useMemo(
    () => [
      {
        header: 'Tên nhóm',
        accessorKey: 'name',
        cell: (props) => {
          const row = props.row.original
          return <span>{row.name}</span>
        },
      },
      {
        header: 'Mô tả',
        accessorKey: 'description',
        cell: (props) => {
          const row = props.row.original
          return <span className="max-w-[200px] truncate">{row.description || '-'}</span>
        },
      },
      {
        header: 'Người quản lý',
        accessorKey: 'manager',
        cell: (props) => {
          const row = props.row.original
          return <ManagerColumn row={row} />
        },
      },
      {
        header: 'Ngày tạo',
        accessorKey: 'createdAt',
        cell: (props) => {
          const row = props.row.original
          return <div className="flex items-center">{formatDate(row.createdAt)}</div>
        },
      },
      {
        header: 'Ngày cập nhật',
        accessorKey: 'updatedAt',
        cell: (props) => {
          const row = props.row.original
          return <div className="flex items-center">{formatDate(row.updatedAt)}</div>
        },
      },
    ],
    [data],
  )

  return (
    <Card>
      <DataTable
        columns={columns}
        data={data ?? []}
        skeletonAvatarColumns={[3]}
        skeletonAvatarProps={{ width: 32, height: 32 }}
        loading={false}
      />
    </Card>
  )
}

import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { AdsAccount } from '@/@types/adsAccount'
import { Avatar, Badge } from '@/components/ui'
import { DataTable } from '@/components/shared'
import { formatVietnameseMoney } from '@/helpers/formatVietnameseMoney'
import { formatDate } from '@/helpers/formatDate'
import { AdsAccountStatusColors, AdsAccountStatusLabels } from '@/enums/adsAccount.enum'
import { Link } from 'react-router-dom'
import { urlConfig } from '@/configs/urls.config'

type Props = {
  data: AdsAccount[]
}

const ManagerColumn = ({ row }: { row: AdsAccount }) => {
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

export default function AdsAccountTable({ data }: Props) {
  const columns: ColumnDef<AdsAccount>[] = useMemo(
    () => [
      {
        header: 'STT',
        accessorKey: 'index',
        cell: (props) => {
          const row = props.row.index
          return <span>{row + 1}</span>
        },
      },
      {
        header: 'UUID',
        accessorKey: 'uuid',
        cell: (props) => {
          const row = props.row.original
          return (
            <Link to={urlConfig.adsAccountDetail.replace(':id', row.id)} className="hover:text-indigo-600">
              {row.uuid}
            </Link>
          )
        },
      },
      {
        header: 'Gmail',
        accessorKey: 'gmail',
      },
      {
        header: 'Trạng thái',
        accessorKey: 'status',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex items-center gap-2">
              <Badge className={`bg-${AdsAccountStatusColors[row.status]}`} />
              <span className={`capitalize font-semibold text-${AdsAccountStatusColors[row.status]}`}>
                {AdsAccountStatusLabels[row.status]}
              </span>
            </div>
          )
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
        header: 'Tổng chi tiêu',
        accessorKey: 'totalSpent',
        cell: (props) => {
          const row = props.row.original
          return <span>{formatVietnameseMoney(row.totalSpent)}</span>
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
    ],
    [],
  )

  return (
    <div className="mt-8">
      <h4 className="mb-4 font-semibold text-lg">Danh sách tài khoản Ads</h4>
      <DataTable
        columns={columns}
        data={data ?? []}
        skeletonAvatarColumns={[4]}
        skeletonAvatarProps={{ width: 32, height: 32 }}
        loading={false}
      />
    </div>
  )
}

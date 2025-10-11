import { useMemo } from 'react'
import {
  useGetUsersQuery,
  useUpdateStatusUser,
} from '@/views/system/userManagement/hooks/useUsersQueries'
import { ColumnDef } from '@tanstack/react-table'
import { User } from '@/@types/user'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { Avatar, Badge, Button, Switcher } from '@/components/ui'
import { Link } from 'react-router-dom'
import { DataTable } from '@/components/shared'
import { cloneDeep } from 'lodash'
import { useUserStore } from '@/views/system/userManagement/store/useUserStore'
import { StatusEnum } from '@/enums/status.enum'
import dayjs from 'dayjs'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import UserManagementEditDialog from '@/views/system/userManagement/components/UserManagementEditDialog'

const statusColor: Record<StatusEnum, string> = {
  [StatusEnum.OnBoarding]: 'bg-blue-500',
  [StatusEnum.Active]: 'bg-emerald-500',
  [StatusEnum.Inactive]: 'bg-red-500',
}

const statusLabel: Record<StatusEnum, string> = {
  [StatusEnum.OnBoarding]: 'Đã gia nhập',
  [StatusEnum.Active]: 'Đã kích hoạt',
  [StatusEnum.Inactive]: 'Chưa kích hoạt',
}

const NameColumn = ({ row }: { row: User }) => {
  const { textTheme } = useThemeClass()

  return (
    <div className="flex items-center">
      <Avatar size={38} shape="circle" src={row.avatar ?? ''} />
      <Link
        className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold max-w-[150px] truncate`}
        to={`/app/crm/customer-details?id=${row.id}`}
      >
        {row.firstName} {row.lastName}
      </Link>
    </div>
  )
}

export default function UserManagementTable() {
  const { filter, setFilter, setDrawerOpen, setSelectedUser } = useUserStore()
  const { data, isLoading } = useGetUsersQuery()
  const metaTableData = useMemo(() => data?.data.data.meta, [data])

  const userMutation = useUpdateStatusUser()

  const columns: ColumnDef<User>[] = useMemo(
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
        header: 'Họ và tên',
        accessorKey: 'fullName',
        cell: (props) => {
          const row = props.row.original
          return <NameColumn row={row} />
        },
      },
      {
        header: 'Tên đăng nhập',
        accessorKey: 'username',
      },
      {
        header: 'Email',
        accessorKey: 'email',
      },
      {
        header: 'Trạng thái',
        accessorKey: 'status',
        cell: (props) => {
          const row = props.row.original
          return (
            <Badge
              className={statusColor[row.status]}
              content={statusLabel[row.status]}
            />
          )
        },
      },
      {
        header: 'Ngày tạo',
        accessorKey: 'lastOnline',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex items-center">
              {dayjs(row.createdAt).format('MM/DD/YYYY HH:mm')}
            </div>
          )
        },
      },
      {
        header: '',
        accessorKey: 'action',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex items-center space-x-4">
              <Switcher
                checked={row.status === StatusEnum.Active}
                onChange={() => userMutation.mutate(row.id)}
              />
              <button
                type="button"
                onClick={() => {
                  setSelectedUser(row)
                  setDrawerOpen(true)
                }}
              >
                <HiOutlinePencilAlt size={24} />
              </button>
            </div>
          )
        },
      },
    ],
    [],
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
        data={data?.data.data.data ?? []}
        skeletonAvatarColumns={[0]}
        skeletonAvatarProps={{ width: 28, height: 28 }}
        loading={isLoading}
        pagingData={{
          total: metaTableData?.total as number,
          pageIndex: metaTableData?.page as number,
          pageSize: metaTableData?.limit as number,
        }}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
      />

      <UserManagementEditDialog />
    </>
  )
}

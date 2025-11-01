import { useMemo } from 'react'
import { useGetUsersQuery, useUpdateStatusUserMutation } from '@/views/systems/users/hooks/useUsersQueries'
import { ColumnDef } from '@tanstack/react-table'
import { User } from '@/@types/user'
import { Avatar, Badge, Switcher } from '@/components/ui'
import { DataTable } from '@/components/shared'
import { useUserStore } from '@/views/systems/users/store/useUserStore'
import { StatusEnum } from '@/enums/status.enum'
import dayjs from 'dayjs'
import { HiOutlineKey, HiOutlinePencilAlt } from 'react-icons/hi'
import UserEditDialog from '@/views/systems/users/components/UserEditDialog'
import RoleTabs from '@/views/systems/users/components/RoleTabs'
import UserResetPasswordDialog from '@/views/systems/users/components/UserResetPasswordDialog'

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
  return (
    <div className="flex items-center">
      <Avatar size={38} shape="circle" src={row.avatar ?? ''} />
      <span className="rtl:mr-2 ml-2 max-w-[150px] font-semibold truncate">
        {row.firstName} {row.lastName}
      </span>
    </div>
  )
}

export default function UserTable() {
  const { filter, setFilter, setDrawerOpen, setResetPasswordDrawerOpen, setSelectedUser } = useUserStore()
  const { data: getUsersResponse, isLoading } = useGetUsersQuery()
  const userMutation = useUpdateStatusUserMutation()

  const metaTableData = useMemo(() => getUsersResponse?.meta, [getUsersResponse])

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
          return <Badge className={statusColor[row.status]} content={statusLabel[row.status]} />
        },
      },
      {
        header: 'Ngày tạo',
        accessorKey: 'createdAt',
        cell: (props) => {
          const row = props.row.original
          return <div className="flex items-center">{dayjs(row.createdAt).format('DD/MM/YYYY HH:mm')}</div>
        },
      },
      {
        header: 'Ngày cập nhật',
        accessorKey: 'updatedAt',
        cell: (props) => {
          const row = props.row.original
          return <div className="flex items-center">{dayjs(row.updatedAt).format('DD/MM/YYYY HH:mm')}</div>
        },
      },
      {
        header: '',
        accessorKey: 'action',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex items-center gap-4">
              <Switcher checked={row.status === StatusEnum.Active} onChange={() => userMutation.mutate(row.id)} />
              <button
                type="button"
                onClick={() => {
                  setSelectedUser(row)
                  setDrawerOpen(true)
                }}
              >
                <HiOutlinePencilAlt size={24} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedUser(row)
                  setResetPasswordDrawerOpen(true)
                }}
              >
                <HiOutlineKey size={24} />
              </button>
            </div>
          )
        },
      },
    ],
    [filter, setDrawerOpen, setResetPasswordDrawerOpen, setSelectedUser, userMutation],
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
      <RoleTabs />

      <DataTable
        columns={columns}
        data={getUsersResponse?.items ?? []}
        skeletonAvatarColumns={[1]}
        skeletonAvatarProps={{ width: 38, height: 38 }}
        loading={isLoading}
        pagingData={{
          total: metaTableData?.total as number,
          pageIndex: metaTableData?.page as number,
          pageSize: metaTableData?.limit as number,
        }}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
      />

      <UserEditDialog />
      <UserResetPasswordDialog />
    </>
  )
}

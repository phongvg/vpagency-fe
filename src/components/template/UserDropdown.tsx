import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import useAuth from '@/utils/hooks/useAuth'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { HiOutlineUser, HiOutlineLogout } from 'react-icons/hi'
import type { CommonProps } from '@/@types/common'
import { useAuthStore } from '@/store/auth/useAuthStore'
import { useMemo } from 'react'
import { urlConfig } from '@/configs/urls.config'

type DropdownList = {
  label: string
  path: string
  icon: JSX.Element
}

const dropdownItemList: DropdownList[] = [
  {
    label: 'Thông tin cá nhân',
    path: urlConfig.userProfile,
    icon: <HiOutlineUser />,
  },
]

const _UserDropdown = ({ className }: CommonProps) => {
  const { user } = useAuthStore()

  const { signOut } = useAuth()

  const displayName = useMemo(() => {
    return user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.username
  }, [user])

  const UserAvatar = (
    <div className={classNames(className, 'flex items-center gap-2')}>
      <Avatar size={32} shape="circle" src={user?.avatar ?? ''} />
      <div className="hidden md:block">
        <div className="max-w-[150px] font-bold truncate">{displayName}</div>
      </div>
    </div>
  )

  return (
    <div>
      <Dropdown
        menuStyle={{ minWidth: 240 }}
        renderTitle={UserAvatar}
        placement="bottom-end"
      >
        <Dropdown.Item variant="header">
          <div className="flex items-center gap-2 px-3 py-2">
            <Avatar shape="circle" src={user?.avatar ?? ''} />
            <div>
              <div className="max-w-[150px] font-bold text-gray-900 truncate">
                {displayName}
              </div>
              <div className="text-xs">{user?.username}</div>
            </div>
          </div>
        </Dropdown.Item>
        <Dropdown.Item variant="divider" />
        {dropdownItemList.map((item) => (
          <Dropdown.Item
            key={item.label}
            eventKey={item.label}
            className="mb-1 px-0"
          >
            <Link className="flex px-2 w-full h-full" to={item.path}>
              <span className="flex items-center gap-2 w-full">
                <span className="opacity-50 text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </span>
            </Link>
          </Dropdown.Item>
        ))}
        <Dropdown.Item variant="divider" />
        <Dropdown.Item eventKey="Sign Out" className="gap-2" onClick={signOut}>
          <span className="opacity-50 text-xl">
            <HiOutlineLogout />
          </span>
          <span>Đăng xuất</span>
        </Dropdown.Item>
      </Dropdown>
    </div>
  )
}

const UserDropdown = withHeaderItem(_UserDropdown)

export default UserDropdown

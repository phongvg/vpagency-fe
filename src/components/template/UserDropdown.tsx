import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import useAuth from '@/utils/hooks/useAuth'
import { useAppSelector } from '@/store'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { HiOutlineUser, HiOutlineCog, HiOutlineLogout } from 'react-icons/hi'
import type { CommonProps } from '@/@types/common'

type DropdownList = {
  label: string
  path: string
  icon: JSX.Element
}

const dropdownItemList: DropdownList[] = [
  {
    label: 'Thông tin cá nhân',
    path: '/app/account/settings/profile',
    icon: <HiOutlineUser />,
  },
  {
    label: 'Cài đặt tài khoản',
    path: '/app/account/settings/profile',
    icon: <HiOutlineCog />,
  },
]

const _UserDropdown = ({ className }: CommonProps) => {
  const { avatar, userName, authority, email } = useAppSelector(
    (state) => state.auth.user,
  )

  const { signOut } = useAuth()

  const UserAvatar = (
    <div className={classNames(className, 'flex items-center gap-2')}>
      <Avatar size={32} shape="circle" src={avatar} />
      <div className="hidden md:block">
        <div className="text-xs capitalize">{authority?.[0] || 'guest'}</div>
        <div className="font-bold">{userName}</div>
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
            <Avatar shape="circle" src={avatar} />
            <div>
              <div className="font-bold text-gray-900 dark:text-gray-100">
                {userName}
              </div>
              <div className="text-xs">{email}</div>
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

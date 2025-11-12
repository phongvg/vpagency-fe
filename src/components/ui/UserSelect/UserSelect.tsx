import { User } from '@/@types/user'
import { Avatar, Select } from '@/components/ui'
import { apiGetUserList } from '@/services/UserService'
import acronym from '@/utils/acronym'
import AsyncSelect from 'react-select/async'

export interface UserOption {
  value: string
  label: string
  user: User
}

interface UserSelectProps {
  value?: UserOption | UserOption[] | null
  isMulti?: boolean
  placeholder?: string
  isClearable?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
  onChange?: (option: any) => void
}

export default function UserSelect({
  value,
  isMulti = false,
  placeholder = 'Tìm kiếm tài khoản...',
  isClearable = true,
  className,
  size,
  onChange,
}: UserSelectProps) {
  const loadOptions = async (inputValue: string): Promise<UserOption[]> => {
    try {
      const response = await apiGetUserList({ search: inputValue, page: 1, limit: 10 })

      if (response.data?.data?.items) {
        return response.data.data.items.map((user: User) => ({
          value: user.id,
          label: `${user.firstName || ''} ${user.lastName || ''} (${user.username})`.trim(),
          user,
        }))
      }
      return []
    } catch {
      return []
    }
  }

  const CustomOption = ({ innerProps, data }: any) => (
    <div {...innerProps} className="flex items-center gap-2 hover:bg-gray-50 p-2 cursor-pointer">
      <Avatar shape="circle" size={30} src={data.user.avatar} alt={data.user.username}>
        {acronym(`${data.user.firstName} ${data.user.lastName}`)}
      </Avatar>
      <div>
        <div className="font-medium text-gray-900">
          {data.user.firstName || data.user.lastName
            ? `${data.user.firstName || ''} ${data.user.lastName || ''}`.trim()
            : data.user.username}
        </div>
        {(data.user.firstName || data.user.lastName) && (
          <div className="text-gray-500 text-sm">@{data.user.username}</div>
        )}
      </div>
    </div>
  )

  return (
    <Select
      defaultOptions
      cacheOptions
      componentAs={AsyncSelect}
      className={className}
      value={value}
      loadOptions={loadOptions}
      isMulti={isMulti}
      isClearable={isClearable}
      placeholder={placeholder}
      noOptionsMessage={({ inputValue }) =>
        inputValue.length < 2 ? 'Nhập tên tài khoản để tìm kiếm' : 'Không tìm thấy tài khoản hợp lệ'
      }
      loadingMessage={() => 'Đang tìm kiếm...'}
      components={{
        Option: CustomOption,
      }}
      size={size}
      onChange={onChange}
    />
  )
}

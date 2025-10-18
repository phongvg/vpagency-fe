import { User } from '@/@types/user'
import { Avatar, Select } from '@/components/ui'
import { apiGetUserList } from '@/services/UserService'
import AsyncSelect from 'react-select/async'
import acronym from '@/utils/acronym'

export interface UserOption {
  value: string
  label: string
  user: User
}

interface UserSelectProps {
  value?: UserOption | UserOption[] | null
  onChange?: (option: any) => void
  isMulti?: boolean
  placeholder?: string
  isClearable?: boolean
  className?: string
}

export default function UserSelect({
  value,
  onChange,
  isMulti = false,
  placeholder = 'Tìm kiếm tài khoản...',
  isClearable = true,
  className,
}: UserSelectProps) {
  const loadOptions = async (inputValue: string): Promise<UserOption[]> => {
    if (!inputValue || inputValue.length === 0) {
      return []
    }

    try {
      const response = await apiGetUserList({ search: inputValue, page: 1, limit: 10 })

      if (response.data?.data?.data) {
        return response.data.data.data.map((user: User) => ({
          value: user.id,
          label: `${user.firstName || ''} ${user.lastName || ''} (${user.username})`.trim(),
          user,
        }))
      }
      return []
    } catch (error) {
      return []
    }
  }

  const CustomOption = ({ innerProps, _, data }: any) => (
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
      componentAs={AsyncSelect}
      className={className}
      value={value}
      onChange={onChange}
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
      defaultOptions={false}
      cacheOptions
    />
  )
}

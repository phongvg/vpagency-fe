import { useCallback, useState } from 'react'
import { User } from '@/@types/user'
import { Avatar, Select } from '@/components/ui'
import { apiGetUserList } from '@/services/UserService'
import acronym from '@/utils/acronym'
import { components, GroupBase, MenuListProps } from 'react-select'

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

const CustomMenuList = <IsMulti extends boolean = false>(
  props: MenuListProps<UserOption, IsMulti, GroupBase<UserOption>> & {
    hasMore: boolean
    isLoadingMore: boolean
    onLoadMore: () => void
  },
) => {
  const { hasMore, isLoadingMore, onLoadMore, children } = props

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const target = event.target as HTMLDivElement
      const bottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 50

      if (bottom && hasMore && !isLoadingMore) {
        onLoadMore()
      }
    },
    [hasMore, isLoadingMore, onLoadMore],
  )

  return (
    <components.MenuList {...props} innerProps={{ ...props.innerProps, onScroll: handleScroll }}>
      {children}
      {isLoadingMore && (
        <div
          style={{
            padding: '8px 12px',
            textAlign: 'center',
            color: '#999',
          }}
        >
          Đang tải...
        </div>
      )}
    </components.MenuList>
  )
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
  const [options, setOptions] = useState<UserOption[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const loadOptions = useCallback(async (page: number, search: string, append: boolean = false) => {
    try {
      if (append) {
        setIsLoadingMore(true)
      } else {
        setIsLoading(true)
      }

      const limit = 10
      const response = await apiGetUserList({ search, page, limit })

      if (response.data?.data?.items) {
        const newOptions = response.data.data.items.map((user: User) => ({
          value: user.id,
          label: `${user.firstName || ''} ${user.lastName || ''} (${user.username})`.trim(),
          user,
        }))

        if (append) {
          setOptions((prev) => [...prev, ...newOptions])
        } else {
          setOptions(newOptions)
        }

        setHasMore(page < response.data.data.meta.totalPages)
        setCurrentPage(page)
      } else {
        if (!append) {
          setOptions([])
        }
        setHasMore(false)
      }
    } catch {
      if (!append) {
        setOptions([])
      }
      setHasMore(false)
    } finally {
      setIsLoading(false)
      setIsLoadingMore(false)
    }
  }, [])

  const handleLoadMore = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      loadOptions(currentPage + 1, searchValue, true)
    }
  }, [currentPage, searchValue, hasMore, isLoadingMore, loadOptions])

  const handleInputChange = useCallback(
    (newValue: string, actionMeta: { action: string }) => {
      if (
        actionMeta.action === 'menu-close' ||
        actionMeta.action === 'set-value' ||
        actionMeta.action === 'input-blur'
      ) {
        return
      }

      setSearchValue(newValue)
      loadOptions(1, newValue, false)
    },
    [loadOptions],
  )

  const handleMenuOpen = useCallback(() => {
    if (options.length === 0) {
      loadOptions(1, '', false)
    }
  }, [options.length, loadOptions])

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
      className={className}
      value={value}
      options={options}
      isMulti={isMulti}
      isClearable={isClearable}
      placeholder={placeholder}
      isLoading={isLoading}
      loadingMessage={() => 'Đang tìm kiếm...'}
      noOptionsMessage={({ inputValue }) => (inputValue ? `Không tìm thấy "${inputValue}"` : 'Không có dữ liệu')}
      components={{
        MenuList: (props) => (
          <CustomMenuList {...props} hasMore={hasMore} isLoadingMore={isLoadingMore} onLoadMore={handleLoadMore} />
        ),
        Option: CustomOption,
      }}
      size={size}
      onChange={onChange}
      onInputChange={handleInputChange}
      onMenuOpen={handleMenuOpen}
    />
  )
}

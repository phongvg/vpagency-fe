import { useCallback, useEffect, useRef, useState } from 'react'
import Select, { SelectProps } from '@/components/ui/Select'
import CreatableSelect from 'react-select/creatable'
import { components, GroupBase, MenuListProps } from 'react-select'
import { FieldInputProps, FormikProps } from 'formik'

export interface OptionType {
  label: string
  value: any
  [key: string]: any
}

export interface ApiResponse<T = any> {
  data: T[]
  total?: number
  page?: number
  limit?: number
  hasMore?: boolean
}

export interface SelectParams {
  page: number
  limit: number
  search?: string
}

export interface SelectCustomProps<IsMulti extends boolean = false>
  extends Omit<
    SelectProps<OptionType, IsMulti, GroupBase<OptionType>>,
    'options' | 'isLoading' | 'onMenuOpen' | 'onMenuClose'
  > {
  options?: OptionType[]
  limit?: number
  isMulti?: IsMulti
  debounceTime?: number
  field?: FieldInputProps<any>
  form?: FormikProps<any>
  isCreatable?: boolean
  fetchOptions?: (params: SelectParams) => Promise<ApiResponse>
  onValueChange?: (value: IsMulti extends true ? OptionType[] : OptionType | null) => void
  transformResponse?: (data: any) => OptionType[]
  onCreateOption?: (inputValue: string) => void | Promise<void>
  formatCreateLabel?: (inputValue: string) => string
}

const CustomMenuList = <IsMulti extends boolean = false>(
  props: MenuListProps<OptionType, IsMulti, GroupBase<OptionType>> & {
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

export default function SelectCustom<IsMulti extends boolean = false>({
  options: staticOptions,
  fetchOptions,
  limit = 10,
  transformResponse,
  isMulti,
  onValueChange,
  debounceTime = 300,
  value,
  onChange,
  components: customComponents,
  field,
  form,
  isCreatable = false,
  onCreateOption,
  formatCreateLabel,
  ...restProps
}: SelectCustomProps<IsMulti>) {
  const [options, setOptions] = useState<OptionType[]>(staticOptions || [])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [menuIsOpen, setMenuIsOpen] = useState<boolean | undefined>(undefined)

  const debounceTimerRef = useRef<NodeJS.Timeout>()
  const hasLoadedRef = useRef(false)
  const menuOpenRef = useRef(false)

  const loadOptions = useCallback(
    async (page: number, search?: string, append: boolean = false) => {
      if (!fetchOptions) return

      try {
        if (append) {
          setIsLoadingMore(true)
        } else {
          setIsLoading(true)
        }

        const response = await fetchOptions({ page, limit, search })

        let newOptions: OptionType[] = []

        if (transformResponse) {
          newOptions = transformResponse(response.data)
        } else {
          newOptions = response.data.map((item: any) => ({
            label: item.label || item.name || item.title || String(item.value || item.id),
            value: item.value || item.id,
            ...item,
          }))
        }

        if (append) {
          setOptions((prev) => [...prev, ...newOptions])
        } else {
          setOptions(newOptions)
        }

        if (response.hasMore !== undefined) {
          setHasMore(response.hasMore)
        } else if (response.total !== undefined) {
          setHasMore(page * limit < response.total)
        } else {
          setHasMore(newOptions.length >= limit)
        }

        setCurrentPage(page)
      } catch {
        setOptions([])
        setHasMore(false)
      } finally {
        setIsLoading(false)
        setIsLoadingMore(false)
      }
    },
    [fetchOptions, limit, transformResponse],
  )

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
        actionMeta.action === 'input-blur' ||
        !menuOpenRef.current
      ) {
        return
      }

      setSearchValue(newValue)

      if (!fetchOptions) return

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }

      debounceTimerRef.current = setTimeout(() => {
        loadOptions(1, newValue, false)
      }, debounceTime)
    },
    [fetchOptions, debounceTime, loadOptions],
  )

  const handleMenuOpen = useCallback(() => {
    menuOpenRef.current = true
    setMenuIsOpen(true)
  }, [])

  const handleMenuClose = useCallback(() => {
    menuOpenRef.current = false
    setMenuIsOpen(false)
  }, [])

  const handleChange = useCallback(
    (newValue: any, actionMeta: any) => {
      let extractedValue: any

      if (isMulti && Array.isArray(newValue)) {
        extractedValue = newValue.map((item) => (item?.value !== undefined ? item.value : item))
      } else {
        extractedValue = newValue?.value !== undefined ? newValue.value : newValue
      }

      if (field && form) {
        form.setFieldValue(field.name, extractedValue)
      }

      if (onChange) {
        onChange(extractedValue, actionMeta)
      }

      if (onValueChange) {
        onValueChange(newValue)
      }

      if (actionMeta.action === 'clear' && fetchOptions) {
        setSearchValue('')
        loadOptions(1, '', false)
      }
    },
    [onChange, onValueChange, field, form, fetchOptions, loadOptions, isMulti],
  )

  const handleCreateOption = useCallback(
    async (inputValue: string) => {
      const newOption: OptionType = {
        label: inputValue,
        value: inputValue,
      }

      setOptions((prev) => [...prev, newOption])

      const extractedValue = newOption.value

      if (field && form) {
        form.setFieldValue(field.name, extractedValue)
      }

      if (onChange) {
        onChange(extractedValue, { action: 'create-option', option: newOption } as any)
      }

      if (onValueChange) {
        onValueChange(newOption as any)
      }

      if (onCreateOption) {
        await onCreateOption(inputValue)
      }
    },
    [field, form, onChange, onValueChange, onCreateOption],
  )

  useEffect(() => {
    if (staticOptions) {
      setOptions(staticOptions)
      setHasMore(false)
      hasLoadedRef.current = true
    }
  }, [staticOptions])

  useEffect(() => {
    if (fetchOptions && !hasLoadedRef.current) {
      hasLoadedRef.current = true
      loadOptions(1, '', false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchOptions])

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  const selectedValue = (() => {
    const currentValue = field ? field.value : value

    if (!currentValue) return isMulti ? [] : null

    if (isMulti && Array.isArray(currentValue)) {
      return currentValue
        .map((val) => {
          if (typeof val === 'object' && 'value' in val) {
            return val
          }
          const foundOption = options.find((opt) => opt.value === val)
          return foundOption || { label: String(val), value: val }
        })
        .filter(Boolean)
    }

    if (typeof currentValue === 'object' && 'value' in currentValue) {
      return currentValue
    }

    const foundOption = options.find((opt) => opt.value === currentValue)

    if (foundOption) {
      return foundOption
    }

    if (currentValue) {
      return { label: String(currentValue), value: currentValue }
    }

    return null
  })()

  return (
    <Select<OptionType, IsMulti, GroupBase<OptionType>>
      cacheOptions
      {...restProps}
      isClearable
      componentAs={isCreatable ? CreatableSelect : undefined}
      isMulti={isMulti}
      options={options}
      value={selectedValue}
      isLoading={isLoading}
      menuIsOpen={menuIsOpen}
      components={{
        MenuList: (props) => (
          <CustomMenuList {...props} hasMore={hasMore} isLoadingMore={isLoadingMore} onLoadMore={handleLoadMore} />
        ),
        ...customComponents,
      }}
      placeholder={restProps.placeholder || 'Chọn...'}
      noOptionsMessage={({ inputValue }) => (inputValue ? `Không tìm thấy "${inputValue}"` : 'Không có dữ liệu')}
      loadingMessage={() => 'Đang tải...'}
      formatCreateLabel={formatCreateLabel || ((inputValue) => `Tạo mới "${inputValue}"`)}
      onChange={handleChange}
      onCreateOption={isCreatable ? handleCreateOption : undefined}
      onMenuOpen={handleMenuOpen}
      onMenuClose={handleMenuClose}
      onInputChange={handleInputChange}
      onBlur={field ? () => form?.setFieldTouched(field.name, true) : undefined}
    />
  )
}

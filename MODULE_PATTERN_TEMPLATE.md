# Module Pattern Template - React Query & Zustand

## Tổng quan

Đây là template pattern chuẩn cho việc xây dựng module CRUD trong dự án React với TypeScript, sử dụng React Query để quản lý data fetching và Zustand để quản lý UI state.

## Cấu trúc thư mục

```
views/
  modules/                       # Tên module (số nhiều, ví dụ: projectStatus, campaigns, projects)
    ├── components/              # Các React components
    │   ├── ModuleTable.tsx      # Bảng danh sách
    │   ├── ModuleTableTools.tsx # Toolbar (search, create button)
    │   ├── ModuleForm.tsx       # Form tạo/sửa
    │   └── ModuleEditDialog.tsx # Dialog wrapper cho form
    │   └── ModuleSearch.tsx     # Component tìm kiếm
    ├── hooks/                   # Custom hooks
    │   └── useModule.ts         # React Query hooks (useGetModulesQuery, mutations, etc.)
    ├── services/                # API services
    │   └── ModuleService.ts     # API calls (apiGetModuleList, apiGetModuleById, etc.)
    ├── store/                   # Zustand stores
    │   └── useModuleStore.ts    # UI state management (filter, moduleId, dialogOpen)
    ├── types/                   # TypeScript types folder
    │   └── module.type.ts       # TẤT CẢ types: Entity, Request, Response, Filter
    └── Module.tsx               # Main page view component
    └── index.ts                 # Main page component
```

**Lưu ý về cấu trúc types:**

- **`types/module.type.ts`**: Chứa types của module:
  - Entity type (ví dụ: `Campaign`, `Project`, `ProjectStatus`)
  - Update request type: `UpdateModuleRequest = Partial<Module>`
- **KHÔNG** tạo file `types.ts` riêng ngoài folder types
- Entity type có `id?: string` (optional vì khi create chưa có ID)
- Update request dùng `Partial<Entity>` để tất cả field đều optional
- Mọi types của module đều nằm trong một file duy nhất
- Nếu tồn tại file type.ts riêng, cần merge tất cả types vào `module.type.ts`

## Kiến trúc

### 1. **Types Definition** - Định nghĩa kiểu dữ liệu

**File:** `types/module.type.ts` (TẤT CẢ types trong một file)

**Nhiệm vụ:**

- Định nghĩa type cho entity chính
- Type cho update request (sử dụng `Partial<Entity>`)
- Tất cả types của module nằm trong một file duy nhất

**Pattern:**

```typescript
// Entity type - Các field của entity
export type Module = {
  id?: string // ID optional vì khi create chưa có
  name: string
  description: string | null // Các field nullable dùng | null
  active: boolean
  createdAt: string | Date
  updatedAt: string | Date

  // Relations (nếu có)
  owner?: {
    id: string
    username: string
    avatar: string | null
  }

  // Array fields
  tags: string[]
  metadata: Record<string, any> // Cho object động
}

// Update request - Sử dụng Partial<Module>
export type UpdateModuleRequest = Partial<Module>
```

**Quy tắc đặt tên:**

- Entity type: `Module` (số ít, PascalCase)
- Request type: `UpdateModuleRequest = Partial<Module>`
- ID field: `id?: string` (optional vì khi create chưa có ID)
- Tất cả types nằm trong `types/module.type.ts`
- Import: `import { Module, UpdateModuleRequest } from '../types/module.type'`

### 2. **API Service** - Gọi API

**File:** `services/ModuleService.ts`

**Nhiệm vụ:**

- Tạo các function gọi API
- Sử dụng ApiService utility
- Return typed response với BaseResponse/BaseListResponse

**Pattern:**

```typescript
import { Module, UpdateModuleRequest } from '../types/module.type'
import { BaseListResponse, BaseResponse } from '@/@types/common'
import ApiService from '@/services/ApiService'

// GET List - Với pagination và filter
export async function apiGetModuleList(params: any) {
  return ApiService.fetchData<BaseListResponse<Module>>({
    url: '/modules',
    method: 'get',
    params,
  })
}

// GET Detail - Lấy một item theo ID
export async function apiGetModuleById(id: string) {
  return ApiService.fetchData<BaseResponse<Module>>({
    url: `/modules/${id}`,
    method: 'get',
  })
}

// POST Create - Tạo mới
export async function apiCreateModule(payload: UpdateModuleRequest) {
  return ApiService.fetchData<BaseResponse<Module>>({
    url: '/modules',
    method: 'post',
    data: payload,
  })
}

// PUT Update - Cập nhật
export async function apiUpdateModule(moduleId: string, payload: UpdateModuleRequest) {
  return ApiService.fetchData<BaseResponse<Module>>({
    url: `/modules/${moduleId}`,
    method: 'put',
    data: payload,
  })
}

// DELETE - Xóa
export async function apiDeleteModule(moduleId: string) {
  return ApiService.fetchData<BaseResponse<null>>({
    url: `/modules/${moduleId}`,
    method: 'delete',
  })
}
```

**Response types từ `@/@types/common`:**

```typescript
// Base response cho single item
type BaseResponse<T> = {
  data: T
  message: string
  statusCode: number
}

// Base response cho list với pagination
type BaseListResponse<T> = {
  items: T[]
  meta: {
    total: number
    page: number
    limit: number
    hasNext: boolean
    hasPrev: boolean
  }
  message: string
  statusCode: number
}

// Common filter cho list API
type CommonFilterRequest = {
  search?: string
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}
```

**Quy tắc đặt tên function:**

- `apiGet{Entity}List` - Lấy danh sách
- `apiGet{Entity}ById` - Lấy chi tiết
- `apiCreate{Entity}` - Tạo mới
- `apiUpdate{Entity}` - Cập nhật
- `apiDelete{Entity}` - Xóa

### 3. **Zustand Store** - Quản lý UI State

**File:** `store/useModuleStore.ts`

**Nhiệm vụ:**

- Lưu trữ UI state (dialog open/close, filters, pagination)
- Lưu trữ ID của entity đang được chọn (không lưu toàn bộ object)
- Quản lý trạng thái các form và dialog

**Pattern:**

```typescript
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { CommonFilterRequest } from '@/@types/common'

type ModuleState = {
  filter: CommonFilterRequest
  moduleId: string | null // Chỉ lưu ID, không lưu object
  dialogOpen: boolean

  setFilter: (filter: CommonFilterRequest) => void
  setSearch: (search: string) => void
  setModuleId: (moduleId: string | null) => void
  openDialog: (moduleId?: string | null) => void // Nhận ID tùy chọn
  closeDialog: () => void
  clearFilter: () => void
}

export const initialModuleState = {
  filter: {
    search: '',
    page: 1,
    limit: 10,
  },
  moduleId: null,
  dialogOpen: false,
}

export const useModuleStore = create<ModuleState>()(
  devtools((set, get) => ({
    ...initialModuleState,

    setFilter: (filter) => set({ filter }),
    setSearch: (search) => {
      const currentFilter = get().filter
      set({ filter: { ...currentFilter, search, page: 1 } })
    },
    setModuleId: (moduleId) => set({ moduleId }),
    openDialog: (moduleId) =>
      set({
        moduleId: moduleId || null,
        dialogOpen: true,
      }),
    closeDialog: () =>
      set({
        moduleId: null,
        dialogOpen: false,
      }),
    clearFilter: () => set({ filter: initialModuleState.filter }),
  })),
)
```

**Lưu ý quan trọng về Store:**

- Store KHÔNG lưu danh sách modules (`modules: Module[]`) - data này do React Query quản lý
- Store CHỈ lưu UI state: filter, moduleId, dialogOpen
- Khi cần access data, sử dụng `useGetModulesQuery()` để lấy từ React Query cache

### 4. **React Query Hooks** - Data Fetching

**File:** `hooks/useModule.ts`

**Nhiệm vụ:**

- Query hooks để fetch data từ API
- Mutation hooks để create/update/delete
- Invalidate cache sau khi mutation thành công
- Hiển thị toast notification

**Pattern:**

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { GET_MODULE_LIST, GET_MODULE_DETAIL } from '@/utils/queryKey'
import {
  apiGetModuleList,
  apiGetModuleById,
  apiCreateModule,
  apiUpdateModule,
  apiDeleteModule,
} from '../services/ModuleService'
import { useModuleStore } from '../store/useModuleStore'
import { toastError, toastSuccess } from '@/utils/toast'
import { ApiAxiosError } from '@/@types/apiError'

// Query - Lấy danh sách
export const useGetModulesQuery = () => {
  const { filter } = useModuleStore()

  return useQuery({
    queryKey: [GET_MODULE_LIST, filter],
    queryFn: async () => {
      const response = await apiGetModuleList(filter)
      return response.data.data
    },
  })
}

// Query - Lấy chi tiết (enabled khi dialog mở)
export const useGetModuleDetailQuery = (id: string, enabled = false) => {
  return useQuery({
    queryKey: [GET_MODULE_DETAIL, id],
    queryFn: async () => {
      const response = await apiGetModuleById(id)
      return response.data.data
    },
    enabled: enabled && !!id, // Chỉ fetch khi có ID và enabled = true
  })
}

// Mutation - Tạo mới
export const useCreateModuleMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateModuleRequest) => apiCreateModule(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_MODULE_LIST] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

// Mutation - Cập nhật
export const useUpdateModuleMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ moduleId, payload }: { moduleId: string; payload: UpdateModuleRequest }) =>
      apiUpdateModule(moduleId, payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_MODULE_LIST] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

// Mutation - Xóa
export const useDeleteModuleMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (moduleId: string) => apiDeleteModule(moduleId),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_MODULE_LIST] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}
```

### 5. **Main page view component** - Module.tsx

**File:** `Module.tsx`

**Nhiệm vụ:**

- Kết hợp các component lại với nhau

**Pattern:**

```typescript
import ModuleTable from './components/ModuleTable'
import ModuleTableTools from './components/ModuleTableTools'
import ModuleEditDialog from './components/ModuleEditDialog'
import { AdaptableCard } from '@/components/shared'
import { Card } from '@/components/ui'

export default function Module() {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <ModuleTableTools />
      <Card>
        <ModuleTable />
      <ModuleEditDialog />
      </Card>
    </AdaptableCard>
  )
}
```

### 6. **Form Component** - Create/Edit Form

**File:** `components/ModuleForm.tsx`

**Nhiệm vụ:**

- Hiển thị form tạo mới hoặc chỉnh sửa
- Fetch data từ API khi edit (dựa vào moduleId)
- Submit data qua mutation hooks
- Đóng dialog sau khi submit thành công

**Pattern:**

```typescript
import { Button, DatePicker, FormContainer, FormItem, Input, Select, Textarea } from '@/components/ui'
import { useModuleStore } from '../store/useModuleStore'
import {
  useCreateModuleMutation,
  useGetModuleDetailQuery,
  useUpdateModuleMutation
} from '../hooks/useModule'
import { Formik, Form, Field, FieldProps,  } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Tên là bắt buộc'),
  // ... các field khác
})

export default function ModuleForm() {
  const { moduleId, dialogOpen, closeDialog } = useModuleStore()
  const isEdit = !!moduleId

  const { data: module } = useGetModuleDetailQuery(moduleId!, dialogOpen)

  const createMutation = useCreateModuleMutation()
  const updateMutation = useUpdateModuleMutation()

  const initialValues = {
    name: module?.name || '',
    description: module?.description || '',
    // ... map tất cả các field
  }

  const handleSubmit = async (values: UpdateModuleRequest) => {
    if (isEdit) {
      await updateMutation.mutateAsync({
        moduleId: moduleId!,
        payload: values,
      })
    } else {
      await createMutation.mutateAsync(values)
    }

    closeDialog()
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, setFieldValue, values }) => (
        <Form>
          <FormContainer>
            {/* Luôn hiển thị ít nhất hai field trên một dòng */}
            <div className="grid grid-cols-2 gap-4">
              <FormItem asterisk label="Tên" invalid={errors.name && touched.name} errorMessage={errors.name}>
                <Field type="text" autoComplete="off" name="name" placeholder="Nhập tên..." component={Input} />
              </FormItem>
              {/* Các field khác tương tự */}
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button type="button" onClick={closeDialog}>
                Hủy
              </Button>
              <Button variant="solid" type="submit" loading={isSubmitting}>
                {isEdit ? 'Cập nhật' : 'Tạo mới'}
              </Button>
            </div>
          </FormContainer>
        </Form>
      )}
    </Formik>
  )
}
```

### 7. **Table Component** - Danh sách & Actions

**File:** `components/ModuleTable.tsx`

**Nhiệm vụ:**

- Hiển thị danh sách data từ query hook
- Xử lý pagination
- Xử lý các actions (edit, delete)
- Gọi openDialog với ID khi edit

**Pattern:**

```typescript
import { useCallback, useMemo } from 'react'
import { useModuleStore } from '../store/useModuleStore'
import {
  useGetModulesQuery,
  useDeleteModuleMutation
} from '../hooks/useModule'
import { DataTable } from '@/components/shared'
import { ColumnDef } from '@tanstack/react-table'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'

export default function ModuleTable() {
  // 1. Lấy state từ store
  const { filter, openDialog, setFilter } = useModuleStore()

  // 2. Fetch data
  const { data: getModulesResponse, isLoading } = useGetModulesQuery()
  const deleteModuleMutation = useDeleteModuleMutation()

  // 3. Confirm dialog
  const { showConfirm, confirmProps } = useConfirmDialog({
    title: 'Xác nhận xóa',
    type: 'danger',
    confirmText: 'Xóa',
    cancelText: 'Hủy',
  })

  const metaTableData = useMemo(
    () => getModulesResponse?.meta,
    [getModulesResponse]
  )

  // 4. Handle edit - GỌI openDialog VỚI ID
  const handleEdit = useCallback(
    (module: Module) => {
      openDialog(module.id)  // Truyền ID, không phải object
    },
    [openDialog],
  )

  // 5. Handle delete
  const handleDelete = useCallback(
    async (module: Module) => {
      const confirmed = await showConfirm({
        message: `Bạn có chắc chắn muốn xóa "${module.name}"?`,
      })

      if (confirmed) {
        await deleteModuleMutation.mutateAsync(module.id)
      }
    },
    [deleteModuleMutation, showConfirm],
  )

  // 6. Columns definition
  const columns: ColumnDef<Module>[] = useMemo(
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
        header: 'Tên',
        accessorKey: 'name',
        cell: (props) => {
          const row = props.row.original
          return <span>{row.name}</span>
        },
      },
      {
        header: '',
        id: 'actions',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex items-center gap-4">
              <button type="button" onClick={() => handleEdit(row)}>
                <HiOutlinePencilAlt size={24} />
              </button>
              <button type="button" onClick={() => handleDelete(row)}>
                <HiOutlineTrash size={24} />
              </button>
            </div>
          )
        },
      },
    ],
    [filter, handleDelete, handleEdit],
  )

  // 7. Pagination handlers
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
        data={getModulesResponse?.items || []}
        loading={isLoading}
        pagingData={{
          total: metaTableData?.total as number,
          pageIndex: metaTableData?.page as number,
          pageSize: metaTableData?.limit as number,
        }}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
      />
      <ConfirmDialog
        {...confirmProps}
        loading={deleteModuleMutation.isPending}
      />
    </>
  )
}
```

### 8. **Table Tools** - Toolbar với nút Create

**File:** `components/ModuleTableTools.tsx`

**Nhiệm vụ:**

- Hiển thị các công cụ (search, filter, create button)
- Gọi openDialog() không có tham số khi tạo mới

**Pattern:**

```typescript
import { Button } from '@/components/ui'
import ModuleSearch from '@/views/modules/components/ModuleSearch'
import { HiOutlinePlus } from 'react-icons/hi'
import { useModuleStore } from '../store/useModuleStore'

export default function ModuleTableTools() {
  const { clearFilter, openDialog } = useModuleStore()

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-2">
        <ModuleSearch />
        <Button size="sm" icon={<HiOutlineRefresh />} onClick={clearFilter} />
      </div>
      <Button size="sm" variant="solid" icon={<HiOutlinePlus />} onClick={() => openDialog()}>
        Thêm mới
      </Button>
    </div>
  )
}
```

### 9. **Search Component** - Tìm kiếm & Lọc

**File:** `components/ModuleSearch.tsx`

**Nhiệm vụ:**

- Input tìm kiếm với debounce

**Pattern:**

```typescript
import { Input } from '@/components/ui'
import { useDebounce } from '@/hooks/useDebounce'
import { useModuleStore } from '../store/useModuleStore'
import { useEffect, useState } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'

export default function ModuleSearch() {
  const { filter, setFilter } = useModuleStore()

  const [searchValue, setSearchValue] = useState(filter.search || '')

  const debouncedSearchValue = useDebounce(searchValue, 500)

  useEffect(() => {
    setFilter({
      ...filter,
      search: debouncedSearchValue,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue])

  useEffect(() => {
    setSearchValue(filter.search || '')
  }, [filter.search])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <Input
      placeholder="Tìm kiếm module..."
      size="sm"
      prefix={<HiOutlineSearch className="text-lg" />}
      value={searchValue}
      onChange={handleSearchChange}
    />
  )
}
```

## Nguyên tắc chính

### ✅ DO - Nên làm

1. **Lưu ID trong store, fetch data qua React Query**

   - Store chỉ lưu `moduleId: string | null`
   - Dùng `useGetModuleDetailQuery(moduleId!, dialogOpen)` để fetch data
   - React Query tự động cache và quản lý loading state

2. **Enabled query dựa vào dialogOpen**

   - Query chỉ chạy khi `enabled: enabled && !!id`
   - Tránh fetch không cần thiết khi dialog đóng

3. **Invalidate queries sau mutation**

   - Sau create/update/delete: `queryClient.invalidateQueries({ queryKey: [GET_MODULE_LIST] })`
   - Đảm bảo data trong table luôn mới nhất

4. **Formik enableReinitialize**

   - Bật `enableReinitialize` để form tự động cập nhật khi data từ query thay đổi

5. **Handle loading và error states**
   - React Query tự động cung cấp `isLoading`, `isError`, `error`
   - Hiển thị toast notification trong mutation hooks

### ❌ DON'T - Không nên làm

1. **Không lưu toàn bộ object trong store**

   ```typescript
   // ❌ Sai
   selectedModule: Module | null

   // ✅ Đúng
   moduleId: string | null
   ```

2. **Không set object vào store khi edit**

   ```typescript
   // ❌ Sai
   const handleEdit = (module: Module) => {
     setSelectedModule(module)
     openDialog()
   }

   // ✅ Đúng
   const handleEdit = (module: Module) => {
     openDialog(module.id)
   }
   ```

3. **Không fetch data thủ công trong useEffect**

   ```typescript
   // ❌ Sai
   useEffect(() => {
     if (moduleId) {
       fetchModuleDetail(moduleId)
     }
   }, [moduleId])

   // ✅ Đúng
   const { data: module } = useGetModuleDetailQuery(moduleId!, dialogOpen)
   ```

4. **Không quên enabled flag trong detail query**

   ```typescript
   // ❌ Sai
   export const useGetModuleDetailQuery = (id: string) => {
     return useQuery({
       queryKey: [GET_MODULE_DETAIL, id],
       queryFn: async () => { ... },
     })
   }

   // ✅ Đúng
   export const useGetModuleDetailQuery = (id: string, enabled = false) => {
     return useQuery({
       queryKey: [GET_MODULE_DETAIL, id],
       queryFn: async () => { ... },
       enabled: enabled && !!id,
     })
   }
   ```

## Lợi ích của Pattern

1. **Single Source of Truth**: Data được cache bởi React Query, không bị duplicate
2. **Automatic Cache Management**: React Query tự động quản lý cache, refetch, và invalidation
3. **Loading States**: Tự động có loading/error states từ React Query
4. **Optimized Performance**: Query chỉ chạy khi cần thiết (enabled flag)
5. **Clean Separation**: Store quản lý UI state, React Query quản lý server state
6. **Easy Testing**: Mỗi layer có thể test độc lập
7. **Consistent Pattern**: Mọi module đều follow cùng một pattern, dễ maintain

## Checklist khi tạo module mới

### Types & Service Layer

- [ ] **types/module.type.ts**

  - [ ] Định nghĩa Entity type `Module` với `id?: string` (optional)
  - [ ] Các field nullable dùng `| null`, không dùng `| undefined`
  - [ ] Định nghĩa relations nếu có (owner, category, etc.)
  - [ ] Có `createdAt`, `updatedAt` cho mọi entity
  - [ ] Định nghĩa `UpdateModuleRequest = Partial<Module>`

- [ ] **services/ModuleService.ts**
  - [ ] Import types từ `../types/module.type` (Module, UpdateModuleRequest)
  - [ ] Function `apiGetModuleList(params: any)` - return `BaseListResponse<Module>`
  - [ ] Function `apiGetModuleById(id: string)` - return `BaseResponse<Module>`
  - [ ] Function `apiCreateModule(payload: UpdateModuleRequest)` - return `BaseResponse<Module>`
  - [ ] Function `apiUpdateModule(moduleId: string, payload: UpdateModuleRequest)` - return `BaseResponse<Module>`
  - [ ] Function `apiDeleteModule(moduleId: string)` - return `BaseResponse<null>`

### State Management

- [ ] **store/useModuleStore.ts**
  - [ ] State: `moduleId: string | null` (KHÔNG phải `selectedModule: Module | null`)
  - [ ] State: `dialogOpen: boolean`
  - [ ] State: `filter: CommonFilterRequest`
  - [ ] Method `openDialog(moduleId?: string | null)` nhận ID tùy chọn
  - [ ] Method `closeDialog()` clear moduleId và đóng dialog
  - [ ] Method `setFilter(filter: CommonFilterRequest)`
  - [ ] Method `setSearch(search: string)` tự động reset page = 1
  - [ ] Method `clearFilter()` reset về initial state

### Data Fetching

- [ ] **hooks/useModule.ts**
  - [ ] Query hook `useGetModulesQuery()` với filter từ store
  - [ ] Query hook `useGetModuleDetailQuery(id: string, enabled = false)` với enabled flag
  - [ ] Mutation hook `useCreateModuleMutation()` với invalidateQueries
  - [ ] Mutation hook `useUpdateModuleMutation()` với invalidateQueries
  - [ ] Mutation hook `useDeleteModuleMutation()` với invalidateQueries
  - [ ] Tất cả mutation có `toastSuccess` và `toastError`

### UI Components

- [ ] **components/ModuleForm.tsx**

  - [ ] Sử dụng `const { moduleId, dialogOpen, closeDialog } = useModuleStore()`
  - [ ] Fetch data: `const { data: module } = useGetModuleDetailQuery(moduleId!, dialogOpen)`
  - [ ] Formik với `enableReinitialize={true}`
  - [ ] initialValues map từ `module?.field || defaultValue`
  - [ ] handleSubmit gọi mutation với `moduleId!` khi update
  - [ ] Validation schema với Yup

- [ ] **components/ModuleTable.tsx**

  - [ ] Lấy `filter`, `openDialog`, `setFilter` từ store
  - [ ] Fetch data: `useGetModulesQuery()`
  - [ ] handleEdit: `openDialog(module.id)` - TRUYỀN ID, không phải object
  - [ ] handleDelete với confirm dialog
  - [ ] Columns với STT tính theo pagination
  - [ ] Pagination handlers: `onPaginationChange`, `onSelectChange`

- [ ] **components/ModuleTableTools.tsx**
  - [ ] Button "Tạo mới" gọi `openDialog()` KHÔNG có tham số
  - [ ] Search input với debounce (nếu cần)
  - [ ] Filter controls (nếu cần)

### Query Keys

- [ ] Thêm constants vào `utils/queryKey.ts`:
  - [ ] `export const GET_MODULE_LIST = 'getModuleList'`
  - [ ] `export const GET_MODULE_DETAIL = 'getModuleDetail'`

## Ví dụ thực tế

Tham khảo các module đã implement:

- **Campaign Module**: `views/campaigns/`
- **Project Module**: `views/projects/`

---

**Lưu ý quan trọng**: Pattern này đảm bảo consistency và maintainability cho toàn bộ dự án. Khi tạo module mới, hãy tuân theo template này một cách chặt chẽ.

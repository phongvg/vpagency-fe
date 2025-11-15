# Module Pattern Template - React Query & Zustand

## Tổng quan

Đây là template pattern chuẩn cho việc xây dựng module CRUD trong dự án React với TypeScript, sử dụng React Query để quản lý data fetching và Zustand để quản lý UI state.

## Kiến trúc

### 1. **Zustand Store** - Quản lý UI State

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

### 2. **React Query Hooks** - Data Fetching

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

### 3. **Form Component** - Create/Edit Form

**File:** `components/ModuleForm.tsx`

**Nhiệm vụ:**

- Hiển thị form tạo mới hoặc chỉnh sửa
- Fetch data từ API khi edit (dựa vào moduleId)
- Submit data qua mutation hooks
- Đóng dialog sau khi submit thành công

**Pattern:**

```typescript
import { useModuleStore } from '../store/useModuleStore'
import {
  useCreateModuleMutation,
  useGetModuleDetailQuery,
  useUpdateModuleMutation
} from '../hooks/useModule'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Tên là bắt buộc'),
  // ... các field khác
})

export default function ModuleForm() {
  // 1. Lấy moduleId và dialogOpen từ store
  const { moduleId, dialogOpen, closeDialog } = useModuleStore()
  const isEdit = !!moduleId

  // 2. Fetch data khi edit (chỉ khi dialog mở và có ID)
  const { data: module } = useGetModuleDetailQuery(moduleId!, dialogOpen)

  // 3. Mutations
  const createMutation = useCreateModuleMutation()
  const updateMutation = useUpdateModuleMutation()

  // 4. Initial values từ data đã fetch
  const initialValues = {
    name: module?.name || '',
    description: module?.description || '',
    // ... map tất cả các field
  }

  // 5. Handle submit
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
      enableReinitialize  // Quan trọng: Re-init khi data thay đổi
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, setFieldValue, values }) => (
        <Form>
          <FormContainer>
            {/* Các field của form */}
            <FormItem
              asterisk
              label="Tên"
              invalid={errors.name && touched.name}
              errorMessage={errors.name}
            >
              <Field
                name="name"
                placeholder="Nhập tên..."
                component={Input}
              />
            </FormItem>

            {/* Buttons */}
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

### 4. **Table Component** - Danh sách & Actions

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

### 5. **Table Tools** - Toolbar với nút Create

**File:** `components/ModuleTableTools.tsx`

**Nhiệm vụ:**

- Hiển thị các công cụ (search, filter, create button)
- Gọi openDialog() không có tham số khi tạo mới

**Pattern:**

```typescript
import { Button } from '@/components/ui'
import { HiOutlinePlus } from 'react-icons/hi'
import { useModuleStore } from '../store/useModuleStore'

export default function ModuleTableTools() {
  const { clearFilter, openDialog } = useModuleStore()

  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold">Danh sách Module</h3>

      <div className="flex gap-2">
        {/* Nút tạo mới - gọi openDialog() không tham số */}
        <Button
          size="sm"
          variant="solid"
          icon={<HiOutlinePlus />}
          onClick={() => openDialog()}
        >
          Tạo mới
        </Button>
      </div>
    </div>
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

- [ ] Tạo Store với `moduleId: string | null`
- [ ] Method `openDialog(moduleId?: string | null)` nhận ID tùy chọn
- [ ] Method `closeDialog()` clear moduleId
- [ ] Query hook `useGetModulesQuery()` với filter từ store
- [ ] Query hook `useGetModuleDetailQuery(id, enabled)` với enabled flag
- [ ] Mutation hooks: create, update, delete với invalidateQueries
- [ ] Form sử dụng `enableReinitialize`
- [ ] Form fetch data qua `useGetModuleDetailQuery(moduleId!, dialogOpen)`
- [ ] Form submit qua mutation hooks
- [ ] Table gọi `openDialog(module.id)` khi edit
- [ ] TableTools gọi `openDialog()` không tham số khi tạo mới

## Ví dụ thực tế

Tham khảo các module đã implement:

- **Campaign Module**: `views/campaigns/`
- **Project Module**: `views/projects/`

---

**Lưu ý quan trọng**: Pattern này đảm bảo consistency và maintainability cho toàn bộ dự án. Khi tạo module mới, hãy tuân theo template này một cách chặt chẽ.

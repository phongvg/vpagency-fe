# Project Management Module

Module quản lý dự án cho VPAgency Frontend.

## Cấu trúc thư mục

```
src/views/systems/projects/
├── components/
│   ├── DrawerFooter.tsx          # Footer cho Drawer
│   ├── ProjectEditContent.tsx    # Content wrapper cho form
│   ├── ProjectEditDialog.tsx     # Dialog chính cho create/edit
│   ├── ProjectEditForm.tsx       # Form chính
│   ├── ProjectSearch.tsx         # Search input component
│   ├── ProjectTable.tsx          # Bảng hiển thị danh sách
│   └── ProjectTableTools.tsx     # Toolbar (search, filter, create button)
├── hooks/
│   └── useProjectsQueries.ts     # React Query hooks
├── store/
│   └── useProjectStore.ts        # Zustand store
├── types.ts                      # TypeScript types
├── Projects.tsx                  # Main component
└── index.tsx                     # Export
```

## Features

### 1. Danh sách dự án

- Hiển thị danh sách với pagination
- Tìm kiếm theo tên, mô tả, ghi chú
- Lọc theo: status, type, ownerId
- Sắp xếp theo các trường
- Hiển thị: tên, loại, trạng thái, chủ sở hữu, ngân sách, số lượng ads accounts

### 2. Thêm/Sửa dự án

- Form validation với Yup
- Chọn chủ sở hữu (UserSelect)
- Chọn loại dự án (SET_CAMPAIGN, LAUNCH_CAMPAIGN)
- Chọn trạng thái (RUNNING, STOPPED, WAITING, DONE, ON_HOLD)
- Nhập ngân sách, CPC
- Chọn deadline
- Mô tả và ghi chú

### 3. Xóa dự án

- Confirm dialog trước khi xóa
- Kiểm tra ràng buộc (không xóa được nếu có ads accounts hoặc daily reports)
- Hiển thị lỗi chi tiết từ backend

## API Endpoints

- `GET /api/projects` - Lấy danh sách dự án
- `GET /api/projects/:id` - Lấy chi tiết dự án
- `POST /api/projects` - Tạo dự án mới
- `PUT /api/projects/:id` - Cập nhật dự án
- `DELETE /api/projects/:id` - Xóa dự án
- `GET /api/projects/owner/:ownerId` - Lấy dự án theo owner

## State Management

### Zustand Store

```typescript
{
  filter: {
    search: string
    page: number
    limit: number
    sortBy: string
    sortOrder: 'asc' | 'desc'
    status?: ProjectStatus
    type?: ProjectType
    ownerId?: string
  }
  projects: Project[]
  selectedProject: Project | null
  drawerOpen: boolean
}
```

### React Query

- `useGetProjectsQuery()` - Fetch danh sách
- `useCreateProjectMutation()` - Tạo mới
- `useUpdateProjectMutation()` - Cập nhật
- `useDeleteProjectMutation()` - Xóa

## Authorization

Yêu cầu roles:

- **ADMIN** - Full access
- **MANAGER_AFF** - Full access
- **MANAGER_AGENCY** - Full access

## Usage

```tsx
import Projects from '@/views/systems/projects'

// Trong route config
{
  key: 'systems.projects',
  path: urlConfig.systemProjects,
  component: lazy(() => import('@/views/systems/projects')),
  authority: [Role.ADMIN, Role.MANAGER_AFF, Role.MANAGER_AGENCY],
  meta: {
    header: 'Quản lý dự án',
  },
}
```

## Validation Rules

- **name** - Required
- **type** - Required (SET_CAMPAIGN | LAUNCH_CAMPAIGN)
- **status** - Optional (default: RUNNING)
- **totalBudget** - Optional, số dương
- **deadline** - Optional, Date

## Dependencies

- `@tanstack/react-query` - Data fetching
- `zustand` - State management
- `formik` - Form handling
- `yup` - Validation
- `dayjs` - Date formatting

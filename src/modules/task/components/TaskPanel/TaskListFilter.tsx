import { projectApi } from "@/modules/project/api/project.api";
import type { Project } from "@/modules/project/types/project.type";
import type { TaskListParams } from "@/modules/task/types/task.type";
import { priorityOptions, statusOptions, typeOptions } from "@/modules/task/utils/task.util";
import { userApi } from "@/modules/user/api/user.api";
import type { User } from "@/modules/user/types/user.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { AppSelect } from "@/shared/components/common/AppSelect";
import { AsyncSelect } from "@/shared/components/common/AsyncSelect";
import DatePicker from "@/shared/components/common/DatePicker/DatePicker";
import { Input } from "@/shared/components/ui/input";
import { useDebounce } from "@/shared/hooks/useDebounce";
import type { SelectOption } from "@/shared/types/common/select-option.type";
import { createAsyncSelectFetcher } from "@/shared/utils/async-select.util";
import { format } from "date-fns";
import { useEffect, useState } from "react";

interface TaskListFilterProps {
  params: TaskListParams;
  setParams: React.Dispatch<React.SetStateAction<TaskListParams>>;
  projectSelect: SelectOption | null;
  setProjectSelect: React.Dispatch<React.SetStateAction<SelectOption | null>>;
  assignedUserSelect: SelectOption | null;
  setAssignedUserSelect: React.Dispatch<React.SetStateAction<SelectOption | null>>;
  creatorSelect: SelectOption | null;
  setCreatorSelect: React.Dispatch<React.SetStateAction<SelectOption | null>>;
}

export default function TaskListFilter({
  params,
  setParams,
  projectSelect,
  setProjectSelect,
  assignedUserSelect,
  setAssignedUserSelect,
  creatorSelect,
  setCreatorSelect,
}: TaskListFilterProps) {
  const fetchProjects = createAsyncSelectFetcher(projectApi.getProjects);
  const fetchUsers = createAsyncSelectFetcher(userApi.getUsers);

  const [searchInput, setSearchInput] = useState<string | undefined>(undefined);
  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    if (debouncedSearch !== params.search) {
      setParams((prev) => ({ ...prev, search: debouncedSearch, page: 1 }));
    }
  }, [debouncedSearch, params.search, setParams]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lọc công việc</CardTitle>
      </CardHeader>

      <CardContent>
        <div className='flex flex-col gap-2'>
          <Input placeholder='Tên công việc' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />

          <AppSelect
            options={statusOptions}
            placeholder='Trạng thái công việc'
            value={params.status}
            onValueChange={(value) => setParams((prev) => ({ ...prev, status: typeof value === "string" ? value : undefined, page: 1 }))}
          />

          <AppSelect
            options={typeOptions}
            placeholder='Loại công việc'
            value={params.type}
            onValueChange={(value) => setParams((prev) => ({ ...prev, type: typeof value === "string" ? value : undefined, page: 1 }))}
          />

          <AppSelect
            options={priorityOptions}
            placeholder='Mức độ ưu tiên'
            value={params.priority}
            onValueChange={(value) => setParams((prev) => ({ ...prev, priority: typeof value === "string" ? value : undefined, page: 1 }))}
          />

          <AsyncSelect<Project>
            placeholder='Dự án'
            fetcher={fetchProjects}
            mapOption={(item) => ({ label: item.name, value: item.id })}
            value={projectSelect}
            onChange={(value) => {
              setProjectSelect(value as SelectOption | null);
              setParams((prev) => ({ ...prev, projectId: Array.isArray(value) ? undefined : value ? value.value : undefined, page: 1 }));
            }}
          />

          <AsyncSelect<User>
            placeholder='Người tạo việc'
            fetcher={fetchUsers}
            mapOption={(item) => ({ label: `${item.firstName} ${item.lastName}`, value: item.id })}
            value={creatorSelect}
            onChange={(value) => {
              setCreatorSelect(value as SelectOption | null);
              setParams((prev) => ({ ...prev, creatorId: Array.isArray(value) ? undefined : value ? value.value : undefined, page: 1 }));
            }}
          />

          <AsyncSelect<User>
            placeholder='Người nhận việc'
            fetcher={fetchUsers}
            mapOption={(item) => ({ label: `${item.firstName} ${item.lastName}`, value: item.id })}
            value={assignedUserSelect}
            onChange={(value) => {
              setAssignedUserSelect(value as SelectOption | null);
              setParams((prev) => ({ ...prev, assignedUserId: Array.isArray(value) ? undefined : value ? value.value : undefined, page: 1 }));
            }}
          />

          <DatePicker
            value={params.fromDate}
            onChange={(date) => setParams((prev) => ({ ...prev, fromDate: date ? format(date, "yyyy-MM-dd") : undefined, page: 1 }))}
            placeholder='Từ ngày'
          />

          <DatePicker
            value={params.toDate}
            onChange={(date) => setParams((prev) => ({ ...prev, toDate: date ? format(date, "yyyy-MM-dd") : undefined, page: 1 }))}
            placeholder='Đến ngày'
          />
        </div>
      </CardContent>
    </Card>
  );
}

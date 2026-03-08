import { projectApi } from "@/modules/project/api/project.api";
import type { Project } from "@/modules/project/types/project.type";
import type { TaskListParams } from "@/modules/task/types/task.type";
import { priorityOptions, statusOptions, typeOptions } from "@/modules/task/utils/task.util";
import { userApi } from "@/modules/user/api/user.api";
import type { User } from "@/modules/user/types/user.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import AppInput from "@/shared/components/common/AppInput";
import AppSelect from "@/shared/components/common/AppSelect";
import AsyncSelect from "@/shared/components/common/AsyncSelect";
import DatePicker from "@/shared/components/common/DatePicker/DatePicker";
import { DATE_RANGE_OPTIONS } from "@/shared/constants/dateRange.constant";
import { getDateRangeFromValue } from "@/shared/helpers/getDateRangeFromValue";
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

  const [searchInput, setSearchInput] = useState<string | undefined>(params.search);
  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    setSearchInput(params.search);
  }, [params.search]);

  useEffect(() => {
    if (debouncedSearch !== params.search) {
      setParams((prev) => ({ ...prev, search: debouncedSearch, page: 1 }));
    }
  }, [debouncedSearch, params.search, setParams]);

  const handleDateRangeChange = (value: string | null) => {
    if (!value) return;

    const dateRange = getDateRangeFromValue(value);

    setParams((prev) => ({
      ...prev,
      fromDate: dateRange.fromDate,
      toDate: dateRange.toDate,
      page: 1,
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lọc công việc</CardTitle>
      </CardHeader>

      <CardContent>
        <div className='flex flex-col gap-2'>
          <AppInput
            label='Tên công việc'
            placeholder='Tìm kiếm theo tên công việc'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />

          <AppSelect
            label='Trạng thái'
            options={statusOptions}
            placeholder='Chọn trạng thái công việc'
            value={params.status}
            onValueChange={(value) => setParams((prev) => ({ ...prev, status: typeof value === "string" ? value : undefined, page: 1 }))}
            menuPlacement='bottom'
          />

          <AppSelect
            label='Loại công việc'
            options={typeOptions}
            placeholder='Chọn loại công việc'
            value={params.type}
            onValueChange={(value) => setParams((prev) => ({ ...prev, type: typeof value === "string" ? value : undefined, page: 1 }))}
            menuPlacement='bottom'
          />

          <AppSelect
            label='Mức độ ưu tiên'
            options={priorityOptions}
            placeholder='Chọn mức độ ưu tiên'
            value={params.priority}
            onValueChange={(value) => setParams((prev) => ({ ...prev, priority: typeof value === "string" ? value : undefined, page: 1 }))}
            menuPlacement='bottom'
          />

          <AsyncSelect<Project>
            label='Dự án'
            placeholder='Chọn dự án'
            fetcher={fetchProjects}
            mapOption={(item) => ({ label: item.name, value: item.id })}
            value={projectSelect}
            onChange={(value) => {
              setProjectSelect(value as SelectOption | null);
              setParams((prev) => ({ ...prev, projectId: Array.isArray(value) ? undefined : value ? value.value : undefined, page: 1 }));
            }}
          />

          <AsyncSelect<User>
            label='Người tạo việc'
            placeholder='Chọn người tạo việc'
            fetcher={fetchUsers}
            mapOption={(item) => ({ label: `${item.firstName} ${item.lastName}`, value: item.id })}
            value={creatorSelect}
            onChange={(value) => {
              setCreatorSelect(value as SelectOption | null);
              setParams((prev) => ({ ...prev, creatorId: Array.isArray(value) ? undefined : value ? value.value : undefined, page: 1 }));
            }}
          />

          <AsyncSelect<User>
            label='Người nhận việc'
            placeholder='Chọn người nhận việc'
            fetcher={fetchUsers}
            mapOption={(item) => ({ label: `${item.firstName} ${item.lastName}`, value: item.id })}
            value={assignedUserSelect}
            onChange={(value) => {
              setAssignedUserSelect(value as SelectOption | null);
              setParams((prev) => ({ ...prev, assignedUserId: Array.isArray(value) ? undefined : value ? value.value : undefined, page: 1 }));
            }}
          />

          <AppSelect
            label='Khoảng thời gian'
            placeholder='Chọn khoảng thời gian'
            options={DATE_RANGE_OPTIONS}
            onValueChange={(value) => handleDateRangeChange(String(value))}
          />

          <DatePicker
            label='Ngày tạo từ'
            value={params.fromDate}
            onChange={(date) => setParams((prev) => ({ ...prev, fromDate: date ? format(date, "yyyy-MM-dd") : undefined, page: 1 }))}
            placeholder='Từ ngày'
          />

          <DatePicker
            label='Ngày tạo đến'
            value={params.toDate}
            onChange={(date) => setParams((prev) => ({ ...prev, toDate: date ? format(date, "yyyy-MM-dd") : undefined, page: 1 }))}
            placeholder='Đến ngày'
          />
        </div>
      </CardContent>
    </Card>
  );
}

import type { ProjectDailyStatsListParams } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import { projectTypeApi } from "@/modules/projectType/api/projectType.api";
import type { ProjectType } from "@/modules/projectType/types/projectType.type";
import AppButton from "@/shared/components/common/AppButton";
import AppSelect from "@/shared/components/common/AppSelect";
import AsyncSelect from "@/shared/components/common/AsyncSelect";
import DatePicker from "@/shared/components/common/DatePicker/DatePicker";
import SearchInput from "@/shared/components/SearchInput";
import { DATE_RANGE_OPTIONS } from "@/shared/constants/dateRange.constant";
import { getDateRangeFromValue } from "@/shared/helpers/getDateRangeFromValue";
import { useAuthStore } from "@/shared/stores/auth/useAuthStore";
import { createAsyncSelectFetcher } from "@/shared/utils/async-select.util";
import { isAdminOrAccounting } from "@/shared/utils/permission.util";
import { format } from "date-fns";
import { CirclePlus } from "lucide-react";

interface ProjectDailyStatsFilterProps {
  searchInput: string | undefined;
  setSearchInput: React.Dispatch<React.SetStateAction<string | undefined>>;
  params: ProjectDailyStatsListParams;
  setParams: React.Dispatch<React.SetStateAction<ProjectDailyStatsListParams>>;
  rangePickerValue: string | null;
  setRangePickerValue: React.Dispatch<React.SetStateAction<string | null>>;
  onOpenModal?: () => void;
}

export default function ProjectDailyStatsFilter({
  searchInput,
  setSearchInput,
  params,
  setParams,
  rangePickerValue,
  setRangePickerValue,
  onOpenModal,
}: ProjectDailyStatsFilterProps) {
  const { user } = useAuthStore();

  const fetchProjectTypes = createAsyncSelectFetcher(projectTypeApi.getProjectTypes);

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
    <div className='flex justify-between items-center mb-4'>
      <div className='flex items-end gap-2'>
        <SearchInput searchInput={searchInput} setSearchInput={setSearchInput} placeholder='Tìm kiếm theo tên dự án' />

        <AsyncSelect<ProjectType>
          fetcher={fetchProjectTypes}
          mapOption={(type) => ({ value: type.id, label: type.name })}
          onChange={(value) => setParams((prev) => ({ ...prev, typeId: value && !Array.isArray(value) ? String(value.value) : undefined, page: 1 }))}
          placeholder='Loại dự án'
        />

        <DatePicker
          value={params.fromDate ? format(new Date(params.fromDate), "yyyy-MM-dd") : undefined}
          onChange={(date) => setParams((prev) => ({ ...prev, fromDate: date ? format(date, "yyyy-MM-dd") : undefined, page: 1 }))}
          placeholder='Từ ngày'
        />

        <DatePicker
          value={params.toDate ? format(new Date(params.toDate), "yyyy-MM-dd") : undefined}
          onChange={(date) => setParams((prev) => ({ ...prev, toDate: date ? format(date, "yyyy-MM-dd") : undefined, page: 1 }))}
          placeholder='Đến ngày'
        />

        <AppSelect
          placeholder='Chọn khoảng thời gian'
          options={DATE_RANGE_OPTIONS}
          value={rangePickerValue}
          onValueChange={(value) => {
            setRangePickerValue(String(value));
            handleDateRangeChange(String(value));
          }}
          menuPlacement='bottom'
        />
      </div>

      {isAdminOrAccounting(user?.roles) && onOpenModal && (
        <AppButton size='sm' variant='outline' onClick={onOpenModal}>
          <CirclePlus />
          Tạo báo cáo
        </AppButton>
      )}
    </div>
  );
}

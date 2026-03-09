import type { ProjectDailyStatsListParams } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import AppSelect from "@/shared/components/common/AppSelect";
import DatePicker from "@/shared/components/common/DatePicker/DatePicker";
import SearchInput from "@/shared/components/SearchInput";
import { DATE_RANGE_OPTIONS } from "@/shared/constants/dateRange.constant";
import { getDateRangeFromValue } from "@/shared/helpers/getDateRangeFromValue";
import { format } from "date-fns";

interface FinalUrlDailyStatsFilterProps {
  searchInput: string | undefined;
  setSearchInput: React.Dispatch<React.SetStateAction<string | undefined>>;
  params: ProjectDailyStatsListParams;
  setParams: React.Dispatch<React.SetStateAction<ProjectDailyStatsListParams>>;
  rangePickerValue: string | null;
  setRangePickerValue: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function FinalUrlDailyStatsFilter({
  searchInput,
  setSearchInput,
  params,
  setParams,
  rangePickerValue,
  setRangePickerValue,
}: FinalUrlDailyStatsFilterProps) {
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
    </div>
  );
}

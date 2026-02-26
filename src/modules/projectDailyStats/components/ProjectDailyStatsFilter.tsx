import type { ProjectDailyStatsListParams } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import AppButton from "@/shared/components/common/AppButton";
import DatePicker from "@/shared/components/common/DatePicker/DatePicker";
import SearchInput from "@/shared/components/SearchInput";
import { format } from "date-fns";
import { CirclePlus } from "lucide-react";

interface ProjectDailyStatsFilterProps {
  searchInput: string | undefined;
  setSearchInput: React.Dispatch<React.SetStateAction<string | undefined>>;
  params: ProjectDailyStatsListParams;
  setParams: React.Dispatch<React.SetStateAction<ProjectDailyStatsListParams>>;
  onOpenModal: () => void;
}

export default function ProjectDailyStatsFilter({ searchInput, setSearchInput, params, setParams, onOpenModal }: ProjectDailyStatsFilterProps) {
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
      </div>

      <AppButton size='sm' variant='outline' onClick={onOpenModal}>
        <CirclePlus />
        Tạo báo cáo
      </AppButton>
    </div>
  );
}

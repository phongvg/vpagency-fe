import type { ProjectDailyStatsListParams } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import AppButton from "@/shared/components/common/AppButton";
import DatePicker from "@/shared/components/common/DatePicker/DatePicker";
import { Input } from "@/shared/components/ui/input";
import { format } from "date-fns";
import { CirclePlus } from "lucide-react";

interface ProjectDailyStatsFilterProps {
  searchInput: string | undefined;
  setSearchInput: (value: string | undefined) => void;
  params: ProjectDailyStatsListParams;
  setParams: React.Dispatch<React.SetStateAction<ProjectDailyStatsListParams>>;
  onOpenModal: () => void;
}

export default function ProjectDailyStatsFilter({ searchInput, setSearchInput, params, setParams, onOpenModal }: ProjectDailyStatsFilterProps) {
  return (
    <div className='flex justify-between items-center mb-4'>
      <div className='flex items-end gap-2'>
        <Input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder='Tìm kiếm theo tên dự án' className='w-[200px]' />

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

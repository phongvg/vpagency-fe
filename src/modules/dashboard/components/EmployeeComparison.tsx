import EmployeeComparisonTable from "@/modules/dashboard/components/EmployeeComparisonTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card";
import AppSelect from "@/shared/components/common/AppSelect";
import DatePicker from "@/shared/components/common/DatePicker";
import SearchInput from "@/shared/components/SearchInput";

export default function EmployeeComparison() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tổng quan hiệu suất nhân viên</CardTitle>
      </CardHeader>

      <CardContent className='normal-case'>
        <div className='space-y-4'>
          <div className='flex items-end gap-2'>
            <SearchInput searchInput={undefined} setSearchInput={() => {}} placeholder='Tìm kiếm theo tên dự án' />
            <DatePicker value={undefined} placeholder='Từ ngày' />
            <DatePicker value={undefined} placeholder='Đến ngày' />
            <AppSelect placeholder='Loại dự án' options={[]} menuPlacement='bottom' />
          </div>

          <EmployeeComparisonTable />
        </div>
      </CardContent>
    </Card>
  );
}

import EmployeeComparisonTable from "@/modules/dashboard/components/EmployeeComparisonTable";
import EmployeeProjectTable from "@/modules/dashboard/components/EmployeeDetailTable";
import { EmployeesWithProjects } from "@/modules/dashboard/mocks/employee-projects";
import AppSelect from "@/shared/components/common/AppSelect";
import DatePicker from "@/shared/components/common/DatePicker";
import SearchInput from "@/shared/components/SearchInput";

export default function EmployeeComparison() {
  return (
    <div className='space-y-4'>
      <div className='flex items-end gap-2'>
        <SearchInput searchInput={undefined} setSearchInput={() => {}} placeholder='Tìm kiếm theo tên dự án' />
        <DatePicker value={undefined} placeholder='Từ ngày' />
        <DatePicker value={undefined} placeholder='Đến ngày' />
        <AppSelect placeholder='Loại dự án' options={[]} menuPlacement='bottom' />
      </div>

      <EmployeeComparisonTable />

      <div className='space-y-4'>
        {EmployeesWithProjects.map((employee) => (
          <EmployeeProjectTable key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  );
}

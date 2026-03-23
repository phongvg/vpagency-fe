import EmployeeComparison from "@/modules/employeePerfomance/components/EmployeeComparison";
import EmployeeProject from "@/modules/employeePerfomance/components/EmployeeProject";
import EmployeeRanking from "@/modules/employeePerfomance/components/EmployeeRanking";

export default function EmployeePerfomance() {
  return (
    <div className='space-y-4'>
      <div className='slide-in-from-bottom-4 animate-in duration-1000 fade-in-50'>
        <EmployeeRanking />
      </div>

      <div className='slide-in-from-bottom-4 animate-in duration-1000 fade-in-50'>
        <EmployeeComparison />
      </div>

      <div className='slide-in-from-bottom-4 animate-in duration-1000 fade-in-50'>
        <EmployeeProject />
      </div>
    </div>
  );
}

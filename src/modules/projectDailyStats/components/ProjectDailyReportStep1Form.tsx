import { projectApi } from "@/modules/project/api/project.api";
import type { Project } from "@/modules/project/types/project.type";
import { FormAsyncSelect } from "@/shared/components/form/FormAsyncSelect";
import { FormDatePicker } from "@/shared/components/form/FormDatePicker";
import { createAsyncSelectFetcher } from "@/shared/utils/async-select.util";

export default function ProjectDailyReportStep1Form() {
  const fetchProjects = createAsyncSelectFetcher(projectApi.getProjects);

  return (
    <div className='space-y-4'>
      <div className='gap-4 grid grid-cols-2'>
        <div>
          <FormDatePicker name='date' label='Ngày báo cáo' required />
        </div>

        <div>
          <FormAsyncSelect<Project>
            name='projectId'
            label='Dự án'
            fetcher={fetchProjects}
            mapOption={(project) => ({ value: project.id, label: project.name })}
            placeholder='Chọn dự án'
            className='col-span-3'
            required
          />
        </div>
      </div>

      <div className='text-red-400 italic'>
        <span className='font-bold'>Lưu ý:</span> Hệ thống sẽ tự động tính toán các chỉ số báo cáo dựa trên dữ liệu chiến dịch và dự án đã có.
      </div>
    </div>
  );
}

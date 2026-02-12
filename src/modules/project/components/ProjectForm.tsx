import { ageRangeOptions, gendersOptions } from "@/modules/project/constants/project.constant";
import { projectStatusApi } from "@/modules/projectStatus/api/projectStatus.api";
import type { ProjectStatus } from "@/modules/projectStatus/types/projectStatus.type";
import { projectTypeApi } from "@/modules/projectType/api/projectType.api";
import type { ProjectType } from "@/modules/projectType/types/projectType.type";
import { FormAsyncSelect } from "@/shared/components/form/FormAsyncSelect";
import { FormDatePicker } from "@/shared/components/form/FormDatePicker";
import { FormInput } from "@/shared/components/form/FormInput";
import { FormPriceInput } from "@/shared/components/form/FormPriceInput";
import { FormSelect } from "@/shared/components/form/FormSelect";
import { FormTextarea } from "@/shared/components/form/FormTextarea";
import { createAsyncSelectFetcher } from "@/shared/utils/async-select.util";

export default function ProjectForm() {
  const fetchProjectTypes = createAsyncSelectFetcher(projectTypeApi.getProjectTypes);
  const fetchProjectStatuses = createAsyncSelectFetcher(projectStatusApi.getProjectStatuses);

  return (
    <div className='gap-4 grid grid-cols-3'>
      <FormInput name='name' label='Tên dự án' required />

      <FormAsyncSelect<ProjectType>
        name='typeId'
        label='Loại dự án'
        fetcher={fetchProjectTypes}
        mapOption={(type) => ({ value: type.id, label: type.name })}
        placeholder='Chọn loại dự án'
        required
      />

      <FormAsyncSelect<ProjectStatus>
        name='statusId'
        label='Trạng thái'
        fetcher={fetchProjectStatuses}
        mapOption={(status) => ({ value: status.id, label: status.name })}
        placeholder='Chọn trạng thái'
        required
      />

      <FormInput name='title' label='Tiêu đề' />

      <FormDatePicker name='deadline' label='Deadline' placeholder='Chọn ngày' />

      <FormDatePicker name='startedAt' label='Ngày bắt đầu' placeholder='Chọn ngày' />

      <FormTextarea name='description' label='Mô tả' />

      <FormTextarea name='note' label='Ghi chú' />

      <FormTextarea name='content' label='Nội dung' />

      <FormPriceInput name='totalBudget' label='Tổng ngân sách' />

      <FormSelect name='gender' label='Giới tính' options={gendersOptions} />

      <FormSelect name='ageRange' label='Độ tuổi' options={ageRangeOptions} isMulti />
    </div>
  );
}

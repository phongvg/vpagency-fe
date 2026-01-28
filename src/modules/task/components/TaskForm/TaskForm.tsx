import { projectApi } from "@/modules/project/api/project.api";
import type { Project } from "@/modules/project/types/project.type";
import { TaskType } from "@/modules/task/types/task.type";
import { frequencyOptions, priorityOptions, typeOptions } from "@/modules/task/utils/task.util";
import { userApi } from "@/modules/user/api/user.api";
import type { User } from "@/modules/user/types/user.type";
import { FormAsyncSelect } from "@/shared/components/form/FormAsyncSelect";
import { FormDatePicker } from "@/shared/components/form/FormDatePicker";
import { FormInput } from "@/shared/components/form/FormInput";
import { FormPriceInput } from "@/shared/components/form/FormPriceInput";
import { FormSelect } from "@/shared/components/form/FormSelect";
import { FormTextarea } from "@/shared/components/form/FormTextarea";
import { createAsyncSelectFetcher } from "@/shared/utils/async-select.util";
import { Fragment } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export default function TaskForm() {
  const { control } = useFormContext();

  const taskType = useWatch({
    control,
    name: "type",
  });

  const fetchUsers = createAsyncSelectFetcher(userApi.getUsers);
  const fetchProjects = createAsyncSelectFetcher(projectApi.getProjects);

  const renderFormFields = () => {
    switch (taskType) {
      case TaskType.SET_CAMPAIGN:
        return (
          <Fragment>
            <FormInput type='number' name='numberOfAccounts' label='Số lượng tài khoản' />
            <FormInput type='number' name='numberOfResultCampaigns' label='Số lượng kết quả chiến dịch' />
          </Fragment>
        );
      case TaskType.LAUNCH_CAMPAIGN:
        return (
          <Fragment>
            <FormPriceInput name='dailyBudget' label='Ngân sách hàng ngày' />
            <FormInput type='number' name='numberOfBackupCampaigns' label='Số lượng tài khoản dự phòng' />
          </Fragment>
        );
      case TaskType.APPEAL_ACCOUNT:
        return <FormInput type='number' name='numberOfSuspendedAccounts' label='Số lượng tài khoản tạm ngưng' />;
      case TaskType.DOCUMENT_APPEAL:
        return (
          <Fragment>
            <FormAsyncSelect<Project>
              name='projectIds'
              label='Dự án cần kháng'
              className='col-span-2'
              fetcher={fetchProjects}
              mapOption={(project) => ({ value: project.id, label: project.name })}
              placeholder='Chọn dự án cần kháng'
              required
              isMulti
            />
            <FormInput type='number' name='numberOfAppealDocuments' label='Số lượng đơn kháng' />
          </Fragment>
        );
      case TaskType.RESEARCH:
        return <FormTextarea name='researchContent' label='Nội dung nghiên cứu' className='col-span-2' />;
      default:
        return null;
    }
  };

  return (
    <div className='grid grid-cols-2 gap-4'>
      <FormInput name='name' label='Tên công việc' className='col-span-2' required />

      <FormSelect name='type' label='Loại công việc' options={typeOptions} placeholder='Chọn loại công việc' required />

      <FormSelect name='priority' label='Độ ưu tiên' options={priorityOptions} placeholder='Chọn độ ưu tiên' required />

      <FormSelect name='frequency' label='Tần suất' options={frequencyOptions} placeholder='Chọn tần suất' required />

      <FormDatePicker name='deadline' label='Deadline' placeholder='Chọn ngày' required />

      <FormAsyncSelect<User>
        name='assignedUserIds'
        label='Người nhận việc'
        className='col-span-2'
        fetcher={fetchUsers}
        mapOption={(user) => ({ value: user.id, label: `${user.firstName} ${user.lastName}` })}
        placeholder='Chọn người nhận việc'
        isMulti
        required
      />

      <FormTextarea name='note' label='Ghi chú' className='col-span-2' />

      {renderFormFields()}
    </div>
  );
}

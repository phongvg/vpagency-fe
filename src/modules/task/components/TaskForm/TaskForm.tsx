import { frequencyOptions, priorityOptions, typeOptions } from "@/modules/task/utils/task.util";
import { userApi } from "@/modules/user/api/user.api";
import type { User } from "@/modules/user/types/user.type";
import { FormAsyncSelect } from "@/shared/components/form/FormAsyncSelect";
import { FormDatePicker } from "@/shared/components/form/FormDatePicker";
import { FormInput } from "@/shared/components/form/FormInput";
import { FormSelect } from "@/shared/components/form/FormSelect";
import { createAsyncSelectFetcher } from "@/shared/utils/async-select.util";

export default function TaskForm() {
  const fetchUsers = createAsyncSelectFetcher(userApi.getUsers);

  return (
    <div className='grid grid-cols-2 gap-4'>
      <FormInput name='name' label='Tên công việc' required />
      <FormSelect name='type' label='Loại công việc' options={typeOptions} placeholder='Chọn loại công việc' required />
      <FormSelect name='priority' label='Độ ưu tiên' options={priorityOptions} placeholder='Chọn độ ưu tiên' required />
      <FormSelect name='frequency' label='Tần suất' options={frequencyOptions} placeholder='Chọn tần suất' required />
      <FormDatePicker name='deadline' label='Deadline' placeholder='Chọn ngày' required />
      <FormAsyncSelect<User>
        name='assignedUserIds'
        label='Người được giao'
        fetcher={fetchUsers}
        mapOption={(user) => ({ value: user.id, label: `${user.firstName} ${user.lastName}` })}
        placeholder='Chọn người được giao'
        isMulti
        required
      />
    </div>
  );
}

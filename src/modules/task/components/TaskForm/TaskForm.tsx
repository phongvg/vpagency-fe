import { frequencyOptions, priorityOptions, typeOptions } from "@/modules/task/utils/task.util";
import { FormInput } from "@/shared/components/form/FormInput";
import FormSelect from "@/shared/components/form/FormSelect/FormSelect";

export default function TaskForm() {
  return (
    <div className='grid grid-cols-2 gap-4'>
      <FormInput name='name' label='Tên công việc' required />
      <FormSelect name='type' label='Loại công việc' options={typeOptions} placeholder='Chọn loại công việc' required />
      <FormSelect name='priority' label='Độ ưu tiên' options={priorityOptions} placeholder='Chọn độ ưu tiên' required />
      <FormSelect name='frequency' label='Tần suất' options={frequencyOptions} placeholder='Chọn tần suất' required />
    </div>
  );
}

import { FormInput } from "@/shared/components/form/FormInput";
import { FormTextarea } from "@/shared/components/form/FormTextarea";

export default function ProjectTypeForm() {
  return (
    <div className='space-y-4'>
      <FormInput name='name' label='Tên loại dự án' required />

      <FormTextarea name='description' label='Mô tả' />
    </div>
  );
}

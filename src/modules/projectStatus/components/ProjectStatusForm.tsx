import { FormInput } from "@/shared/components/form/FormInput";
import { FormTextarea } from "@/shared/components/form/FormTextarea";

export default function ProjectStatusForm() {
  return (
    <div className='space-y-4'>
      <FormInput name='name' label='Tên trạng thái' required />

      <FormTextarea name='description' label='Mô tả' />
    </div>
  );
}

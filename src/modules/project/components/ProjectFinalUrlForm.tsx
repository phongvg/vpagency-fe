import { FormInput } from "@/shared/components/form/FormInput";

export default function ProjectFinalUrlForm() {
  return (
    <div className='gap-4 grid grid-cols-2'>
      <FormInput name='name' label='Tên URL' required />

      <FormInput name='finalURL' label='URL' required />
    </div>
  );
}

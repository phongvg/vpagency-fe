import { FormDatePicker } from "@/shared/components/form/FormDatePicker";
import { FormInput } from "@/shared/components/form/FormInput";

export default function AppealedProxyForm() {
  return (
    <div className='space-y-4'>
      <FormInput name='ip' label='IP' required />

      <div className='gap-4 grid grid-cols-2'>
        <FormInput name='protocol' label='Protocol' />
        <FormInput name='country' label='Quốc gia' />
      </div>

      <div className='gap-4 grid grid-cols-2'>
        <FormInput name='source' label='Nguồn' />
        <FormInput name='user' label='Người dùng' />
      </div>

      <FormDatePicker name='purchasedAt' label='Ngày mua' />
    </div>
  );
}

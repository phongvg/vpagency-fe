import { FormInput } from "@/shared/components/form/FormInput";

export default function ChangePasswordForm() {
  return (
    <div className='gap-4 grid grid-cols-2'>
      <FormInput name='newPassword' label='Mật khẩu mới' className='col-span-2' required />
      <FormInput name='confirmNewPassword' label='Xác nhận mật khẩu' className='col-span-2' required />
    </div>
  );
}

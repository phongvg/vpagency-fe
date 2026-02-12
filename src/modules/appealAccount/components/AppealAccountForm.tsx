import { FormInput } from "@/shared/components/form/FormInput";
import { FormTextarea } from "@/shared/components/form/FormTextarea";

export default function AppealAccountForm() {
  return (
    <div className='space-y-4'>
      <div className='gap-4 grid grid-cols-2'>
        <FormInput name='profileName' label='Tên Profile' required />
        <FormInput name='email' label='Email' required type='email' />
      </div>

      <div className='gap-4 grid grid-cols-2'>
        <FormInput name='password' label='Mật khẩu' required />
        <FormInput name='recoveryEmail' label='Email khôi phục' />
      </div>

      <div className='gap-4 grid grid-cols-2'>
        <FormInput name='twoFa' label='2FA' />
        <FormInput name='mcc' label='MCC' />
      </div>

      <div className='gap-4 grid grid-cols-2'>
        <FormInput name='uid' label='UID' />
        <FormInput name='appealPlatform' label='Nền tảng kháng cáo' />
      </div>

      <div className='gap-4 grid grid-cols-2'>
        <FormInput name='appealedBy' label='Người kháng cáo' />
        <FormInput name='usedBy' label='Người sử dụng' />
      </div>

      <div className='gap-4 grid grid-cols-2'>
        <FormInput name='rarityLevel' label='Mức độ hiếm' />
      </div>

      <FormTextarea name='note' label='Ghi chú 1' />
      <FormTextarea name='note2' label='Ghi chú 2' />
    </div>
  );
}

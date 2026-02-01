import RoleSelector from "@/modules/user/components/RoleSelector";
import { FormInput } from "@/shared/components/form/FormInput";

export default function UserForm() {
  return (
    <div className='gap-4 grid grid-cols-2'>
      <FormInput name='username' label='Tên đăng nhập' className='col-span-2' required disabled />

      <FormInput name='firstName' label='Họ và tên đệm' required />

      <FormInput name='lastName' label='Tên' required />

      <FormInput name='email' label='Email' className='col-span-2' required />

      <div className='col-span-2'>
        <RoleSelector name='roles' label='Vai trò' required />
      </div>
    </div>
  );
}

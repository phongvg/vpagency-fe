import { gmailStatusApi } from "@/modules/gmailStatus/api/gmailStatus.api";
import type { GmailStatus } from "@/modules/gmailStatus/types/gmailStatus.type";
import { userApi } from "@/modules/user/api/user.api";
import type { User } from "@/modules/user/types/user.type";
import { FormAsyncSelect } from "@/shared/components/form/FormAsyncSelect";
import { FormInput } from "@/shared/components/form/FormInput";
import { createAsyncSelectFetcher } from "@/shared/utils/async-select.util";

export default function GmailForm() {
  const fetchGmailStatuses = createAsyncSelectFetcher(gmailStatusApi.getGmailStatuses);
  const fetchUsers = createAsyncSelectFetcher(userApi.getUsers);

  return (
    <div className='gap-4 grid grid-cols-2'>
      <FormInput name='name' label='Email' className='col-span-2' required />

      <FormInput name='password' label='Mật khẩu' required />

      <FormAsyncSelect<GmailStatus>
        name='statusId'
        label='Trạng thái'
        fetcher={fetchGmailStatuses}
        mapOption={(status) => ({ value: status.id, label: status.name })}
        placeholder='Chọn trạng thái'
      />

      <FormAsyncSelect<User>
        name='assignedUserIds'
        label='Người nhận mail'
        className='col-span-2'
        fetcher={fetchUsers}
        mapOption={(user) => ({ value: user.id, label: user.username })}
        placeholder='Chọn người nhận'
        isMulti
      />

      <FormInput name='recoverMail' label='Mail khôi phục' />

      <FormInput name='recoverMailPassword' label='Mật khẩu mail khôi phục' />

      <FormInput name='code2fa' label='Mã 2FA' />

      <FormInput name='phone' label='Số điện thoại' />

      <FormInput name='proxy' label='Proxy' />

      <FormInput name='price' label='Giá' type='number' />

      <FormInput name='appPassword' label='Mật khẩu ứng dụng' />

      <FormInput name='createdYear' label='Năm tạo' type='number' />

      <FormInput name='profileName' label='Tên hồ sơ' className='col-span-2' />
    </div>
  );
}

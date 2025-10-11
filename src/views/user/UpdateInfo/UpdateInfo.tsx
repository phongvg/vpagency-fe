import { Card } from '@/components/ui'
import UpdateInfoForm from '@/views/user/UpdateInfo/components/UpdateInfoForm'

export default function UpdateInfo() {
  return (
    <>
      <div className="mb-8">
        <h3 className="mb-1">Cập nhật thông tin cá nhân</h3>
        <p>Vui lòng cập nhật thông tin cá nhân để hoàn tất đăng nhập</p>
      </div>

      <Card>
        <UpdateInfoForm />
      </Card>
    </>
  )
}

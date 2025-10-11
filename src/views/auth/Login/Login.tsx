import { Card } from '@/components/ui'
import LoginForm from './components/LoginForm'

export default function Login() {
  return (
    <>
      <div className="mb-8">
        <h3 className="mb-1">Đăng nhập</h3>
        <p>Vui lòng nhập thông tin tài khoản của bạn để đăng nhập!</p>
      </div>

      <Card>
        <LoginForm />
      </Card>
    </>
  )
}

import authImage from "@/assets/images/authentication.jpg";
import LoginForm from "@/modules/auth/login/components/LoginForm";
import { Card, CardContent } from "@/shared/components/ui/card";
import { FieldGroup } from "@/shared/components/ui/field";
import { APP_NAME } from "@/shared/constants/app.constant";

export default function LoginPage() {
  return (
    <div className='w-full max-w-md md:max-w-4xl'>
      <div className='flex flex-col gap-6'>
        <Card className='overflow-hidden p-0'>
          <CardContent className='grid p-0 md:grid-cols-2'>
            <div className='p-6 md:p-8'>
              <FieldGroup>
                <div className='flex flex-col items-center gap-2 text-center'>
                  <h1 className='text-2xl font-bold'>Đăng nhập</h1>
                  <p className='text-muted-foreground text-balance'>Vui lòng đăng nhập để tiếp tục sử dụng hệ thống.</p>
                </div>

                <LoginForm />
              </FieldGroup>
            </div>

            <div className='bg-muted relative hidden md:block'>
              <img src={authImage} alt={APP_NAME} className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale' />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

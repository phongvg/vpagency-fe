import { useAuth } from "@/auth/useAuth";
import { loginFormSchema, type LoginFormType } from "@/modules/auth/login/schemas/login-form.schema";
import AppButton from "@/shared/components/common/AppButton";
import { FormInput } from "@/shared/components/form/FormInput";
import { Form } from "@/shared/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const { login } = useAuth();

  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormType) => {
    await login(values.username, values.password);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormInput name='username' label='Tên đăng nhập' required />
        <FormInput type='password' name='password' label='Mật khẩu' required />
        <AppButton type='submit' className='w-full'>
          Đăng nhập
        </AppButton>
      </form>
    </Form>
  );
}

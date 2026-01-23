import { loginFormSchema, type LoginFormType } from "@/modules/auth/login/schemas/login-form.schema";
import { AppButton } from "@/shared/components/common/AppButton";
import { FormInput } from "@/shared/components/form/FormInput";
import { Form } from "@/shared/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormType) => {
    console.log("values :>> ", values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormInput name='username' label='Tên đăng nhập' required />
        <FormInput name='password' label='Mật khẩu' required />
        <AppButton type='submit' className='w-full'>
          Đăng nhập
        </AppButton>
      </form>
    </Form>
  );
}

import * as z from "zod";

export const loginFormSchema = z.object({
  username: z.string().min(1, "Tên đăng nhập không được bỏ trống"),
  password: z.string().min(1, "Mật khẩu không được bỏ trống"),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;

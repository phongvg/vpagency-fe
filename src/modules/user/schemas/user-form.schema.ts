import { REGEX } from "@/shared/constants/regex.constant";
import * as z from "zod";

export const userFormSchema = z.object({
  username: z.string().min(1, "Tên đăng nhập không được bỏ trống"),
  firstName: z.string().min(1, "Họ tên đệm không được bỏ trống"),
  lastName: z.string().min(1, "Tên không được bỏ trống"),
  email: z.string().min(1, "Email không được bỏ trống").regex(REGEX.EMAIL, "Email không hợp lệ"),
  roles: z.array(z.string()).min(1, "Phải có ít nhất một vai trò"),
});

export type UserFormType = z.infer<typeof userFormSchema>;

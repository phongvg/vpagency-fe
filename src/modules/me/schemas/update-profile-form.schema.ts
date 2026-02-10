import { REGEX } from "@/shared/constants/regex.constant";
import * as z from "zod";

export const updateProfileFormSchema = z.object({
  username: z.string().optional(),
  firstName: z.string().min(1, "Họ tên đệm không được bỏ trống"),
  lastName: z.string().min(1, "Tên không được bỏ trống"),
  email: z.string().min(1, "Email không được bỏ trống").regex(REGEX.EMAIL, "Email không hợp lệ"),
  password: z.string().optional(),
  avatar: z.any().optional().nullable(),
});

export const updateProfilePageFormSchema = z.object({
  username: z.string().min(1, "Tên đăng nhập không được bỏ trống"),
  firstName: z.string().min(1, "Họ tên đệm không được bỏ trống"),
  lastName: z.string().min(1, "Tên không được bỏ trống"),
  email: z.string().min(1, "Email không được bỏ trống").regex(REGEX.EMAIL, "Email không hợp lệ"),
  password: z.string().min(1, "Mật khẩu không được để trống"),
  avatar: z.any().optional().nullable(),
});

export type UpdateProfileFormType = z.infer<typeof updateProfileFormSchema>;
export type UpdateProfilePageFormType = z.infer<typeof updateProfilePageFormSchema>;

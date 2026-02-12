import * as z from "zod";

export const changePasswordFormSchema = z
  .object({
    newPassword: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmNewPassword: z.string().min(1, "Mật khẩu không được bỏ trống"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmNewPassword"],
  });

export type ChangePasswordFormType = z.infer<typeof changePasswordFormSchema>;

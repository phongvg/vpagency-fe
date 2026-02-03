import * as z from "zod";

export const appealAccountFormSchema = z.object({
  profileName: z.string().min(1, "Tên profile không được bỏ trống"),
  email: z.string().min(1, "Email không được bỏ trống").email("Email không hợp lệ"),
  password: z.string().min(1, "Mật khẩu không được bỏ trống"),
  recoveryEmail: z.string().optional(),
  twoFa: z.string().optional(),
  mcc: z.string().optional(),
  uid: z.string().optional(),
  appealPlatform: z.string().optional(),
  appealedBy: z.string().optional(),
  usedBy: z.string().optional(),
  note: z.string().optional(),
  note2: z.string().optional(),
  rarityLevel: z.string().optional(),
});

export type AppealAccountFormType = z.infer<typeof appealAccountFormSchema>;

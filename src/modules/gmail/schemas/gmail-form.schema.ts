import { REGEX } from "@/shared/constants/regex.constant";
import * as z from "zod";

export const gmailFormSchema = z.object({
  name: z.string().min(1, "Email không được bỏ trống").regex(REGEX.EMAIL, "Email không hợp lệ"),
  password: z.string().min(1, "Mật khẩu không được bỏ trống"),
  statusId: z.object({ value: z.string(), label: z.string() }).optional().nullable(),
  assignedUserIds: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  recoverMail: z.string().optional(),
  recoverMailPassword: z.string().optional(),
  code2fa: z.string().optional(),
  phone: z.string().optional(),
  proxy: z.string().optional(),
  price: z.number().optional(),
  appPassword: z.string().optional(),
  createdYear: z.number().optional(),
  profileName: z.string().optional(),
});

export type GmailFormType = z.infer<typeof gmailFormSchema>;

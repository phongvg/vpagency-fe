import * as z from "zod";

export const gmailStatusFormSchema = z.object({
  name: z.string().min(1, "Tên không được bỏ trống"),
  description: z.string().optional().nullable(),
});

export type GmailStatusFormType = z.infer<typeof gmailStatusFormSchema>;

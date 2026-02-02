import * as z from "zod";

export const projectStatusFormSchema = z.object({
  name: z.string().min(1, "Tên không được bỏ trống"),
  description: z.string().optional().nullable(),
});

export type ProjectStatusFormType = z.infer<typeof projectStatusFormSchema>;

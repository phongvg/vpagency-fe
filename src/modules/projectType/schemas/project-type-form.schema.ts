import * as z from "zod";

export const projectTypeFormSchema = z.object({
  name: z.string().min(1, "Tên không được bỏ trống"),
  description: z.string().optional().nullable(),
});

export type ProjectTypeFormType = z.infer<typeof projectTypeFormSchema>;

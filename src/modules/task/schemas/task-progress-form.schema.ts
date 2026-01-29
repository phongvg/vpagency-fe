import * as z from "zod";

export const taskProgressFormSchema = z.object({
  progress: z.number().min(0).max(100),
});

export type TaskProgressFormSchema = z.infer<typeof taskProgressFormSchema>;

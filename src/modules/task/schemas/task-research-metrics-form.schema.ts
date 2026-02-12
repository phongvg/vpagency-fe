import * as z from "zod";

export const taskResearchMetricsFormSchema = z.object({
  resultDate: z.date({ error: "Ngày nghiên cứu không được bỏ trống" }),
  result: z.string().min(1, "Kết quả nghiên cứu không được bỏ trống"),
  difficultyLevel: z.string().min(1, "Mức độ khó không được bỏ trống"),
});

export type TaskResearchMetricsFormType = z.infer<typeof taskResearchMetricsFormSchema>;

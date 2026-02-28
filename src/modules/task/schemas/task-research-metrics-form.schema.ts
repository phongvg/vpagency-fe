import * as z from "zod";

export const taskResearchMetricsFormSchema = z.object({
  resultDate: z
    .date()
    .nullable()
    .optional()
    .refine((val) => val !== null && val !== undefined, { message: "Ngày nghiên cứu không được bỏ trống" }),
  result: z.string().min(1, "Kết quả nghiên cứu không được bỏ trống"),
  difficultyLevel: z.string().min(1, "Mức độ khó không được bỏ trống"),
});

export type TaskResearchMetricsFormType = Omit<z.infer<typeof taskResearchMetricsFormSchema>, "resultDate"> & {
  resultDate?: Date | null | undefined;
};

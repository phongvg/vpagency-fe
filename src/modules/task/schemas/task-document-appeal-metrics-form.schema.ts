import * as z from "zod";

export const taskDocumentAppealMetricsFormSchema = z.object({
  appealDate: z.date({ error: "Ngày kháng tài khoản không được bỏ trống" }),
  projectId: z
    .object(
      {
        value: z.string(),
        label: z.string(),
      },
      { error: "Dự án không được bỏ trống" }
    )
    .optional(),
  appealCount: z.number().min(1, "Số lần kháng phải lớn hơn hoặc bằng 1"),
  successCount: z.number().min(0, "Số lần kháng thành công phải lớn hơn hoặc bằng 0"),
  note: z.string().optional(),
});

export type TaskDocumentAppealMetricsFormType = z.infer<typeof taskDocumentAppealMetricsFormSchema>;

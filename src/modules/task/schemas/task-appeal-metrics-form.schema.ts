import * as z from "zod";

export const taskAppealMetricsFormSchema = z.object({
  appealDate: z.date({ error: "Ngày kháng tài khoản không được bỏ trống" }),
  suspensionReason: z.string().min(1, "Lý do tạm ngưng không được bỏ trống"),
  appealCount: z.number().min(1, "Số lần kháng phải lớn hơn hoặc bằng 1"),
  successCount: z.number().min(0, "Số lần kháng thành công phải lớn hơn hoặc bằng 0"),
  failureCount: z.number().min(0, "Số lần kháng thất bại phải lớn hơn hoặc bằng 0"),
});

export type TaskAppealMetricsFormType = z.infer<typeof taskAppealMetricsFormSchema>;

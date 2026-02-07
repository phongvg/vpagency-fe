import * as z from "zod";

export const projectFormSchema = z.object({
  name: z.string().min(1, "Tên dự án không được để trống"),
  typeId: z.object({ label: z.string(), value: z.string() }, { error: "Loại dự án không được để trống" }).nullable(),
  statusId: z.object({ label: z.string(), value: z.string() }, { error: "Trạng thái dự án không được để trống" }).nullable(),
  totalBudget: z.number().min(0, "Ngân sách phải lớn hơn hoặc bằng 0").nullable(),
  ageRange: z.array(z.string()).nullable(),
  gender: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  note: z.string().nullable(),
  content: z.string().nullable(),
  deadline: z.date().nullable(),
  startedAt: z.date().nullable(),
  finalUrls: z
    .array(
      z.object({
        name: z.string().min(1, "Tên không được để trống"),
        finalURL: z.string().min(1, "URL không được để trống"),
        countriesTier1: z.array(z.string()).nullable(),
        countriesTier2: z.array(z.string()).nullable(),
        countriesTier3: z.array(z.string()).nullable(),
        excludeCountries: z.array(z.string()).nullable(),
      })
    )
    .nullable(),
});

export type ProjectFormType = z.infer<typeof projectFormSchema>;

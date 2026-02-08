import type { SelectOption } from "@/shared/types/common/select-option.type";
import * as z from "zod";

export const projectFormSchema = z.object({
  name: z.string().min(1, "Tên dự án không được để trống"),
  typeId: z
    .object({ label: z.string(), value: z.string() })
    .nullable()
    .refine((val) => val !== null, { message: "Loại dự án không được để trống" }),
  statusId: z
    .object({ label: z.string(), value: z.string() })
    .nullable()
    .refine((val) => val !== null, { message: "Trạng thái dự án không được để trống" }),
  totalBudget: z.number().nullable(),
  ageRange: z.array(z.object({ label: z.string(), value: z.string() })).nullable(),
  gender: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  note: z.string().nullable(),
  content: z.string().nullable(),
  deadline: z.date().nullable(),
  startedAt: z.date().nullable(),
});

export type ProjectFormType = Omit<z.infer<typeof projectFormSchema>, "typeId" | "statusId"> & {
  typeId: SelectOption | null;
  statusId: SelectOption | null;
};

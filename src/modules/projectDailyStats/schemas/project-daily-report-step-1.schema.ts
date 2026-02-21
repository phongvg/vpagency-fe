import type { SelectOption } from "@/shared/types/common/select-option.type";
import * as z from "zod";

export const projectDailyReportStep1Schema = z.object({
  date: z
    .date()
    .nullable()
    .optional()
    .refine((val) => val !== null && val !== undefined, { message: "Ngày báo cáo không được để trống" }),
  projectId: z
    .object({ label: z.string(), value: z.string() })
    .nullable()
    .refine((val) => val !== null, { message: "Dự án không được để trống" }),
});

export type ProjectDailyReportStep1Type = Omit<z.infer<typeof projectDailyReportStep1Schema>, "projectId" | "date"> & {
  projectId: SelectOption | null;
  date?: Date | null | undefined;
};

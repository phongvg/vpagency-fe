import * as z from "zod";

export const projectDailyReportStep2Schema = z.object({
  totalRef: z
    .number()
    .nullable()
    .refine((val) => val !== null, { message: "Tổng số ref không được để trống" }),
  costPerRef: z.number().nullable(),
  rateRefPerClick: z.number().nullable(),
  totalFtd: z
    .number()
    .nullable()
    .refine((val) => val !== null, { message: "Tổng số FTD không được để trống" }),
  costPerFtd: z.number().nullable(),
  costFtdPerRef: z.number().nullable(),
  totalTargetDailyKeyVolume: z.number(),
  totalTargetRef: z.number().nullable(),
  totalClickPerVolume: z.number().nullable(),
  totalRefPerVolume: z.number().nullable(),
  receivedRevenue: z
    .number()
    .nullable()
    .refine((val) => val !== null, { message: "Hoa hồng rút về không được để trống" }),
  holdRevenue: z
    .number()
    .nullable()
    .refine((val) => val !== null, { message: "Hoa hồng tạm giữ không được để trống" }),
  profit: z.number(),
  roi: z.number(),

  totalClicks: z.number().nullable(),
  totalTargetCpc: z.number().nullable(),
  totalCost: z.number().nullable(),
});

export type ProjectDailyReportStep2Type = Omit<
  z.infer<typeof projectDailyReportStep2Schema>,
  "receivedRevenue" | "holdRevenue" | "totalRef" | "totalFtd"
> & {
  receivedRevenue: number | null;
  holdRevenue: number | null;
  totalRef: number | null;
  totalFtd: number | null;
};

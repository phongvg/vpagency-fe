import { z } from "zod";

export const CampaignFormSchema = z.object({
  importAt: z.date().nullable().optional(),
  date: z
    .date()
    .nullable()
    .optional()
    .refine((val) => val !== null && val !== undefined, { message: "Ngày dữ liệu không được để trống" }),
  uid: z.string().min(1, "Vui lòng nhập UID"),
  mcc: z.string().nullable(),
  name: z.string().min(1, "Vui lòng nhập tên chiến dịch"),
  externalId: z.string().min(1, "Vui lòng nhập ID chiến dịch"),
  finalUrlImport: z.string().nullable(),
  gmail: z.string().nullable().optional(),

  keywords: z.array(
    z.object({
      keyword: z.string().nullable().optional(),
      match: z.string().nullable().optional(),
      clicks: z.number().nullable().optional(),
      ctr: z.number().nullable().optional(),
      cpc: z.number().nullable().optional(),
      cpm: z.number().nullable().optional(),
      cost: z.number().nullable().optional(),
      impression: z.number().nullable().optional(),
      bid: z.number().nullable().optional(),
    })
  ),

  negativeKeywords: z.array(
    z.object({
      keyword: z.string().nullable().optional(),
      match: z.string().nullable().optional(),
      clicks: z.number().nullable().optional(),
      ctr: z.number().nullable().optional(),
      cpc: z.number().nullable().optional(),
      cpm: z.number().nullable().optional(),
      cost: z.number().nullable().optional(),
      impression: z.number().nullable().optional(),
      bid: z.number().nullable().optional(),
    })
  ),

  topSearchTerms: z.array(
    z.object({
      term: z.string().nullable().optional(),
      cpc: z.number().nullable().optional(),
      cost: z.number().nullable().optional(),
      clicks: z.number().nullable().optional(),
      ctr: z.number().nullable().optional(),
      cpm: z.number().nullable().optional(),
      impression: z.number().nullable().optional(),
    })
  ),

  status: z.string().nullable().optional(),
  avgCpc: z.number().nullable(),
  targetCpc: z.number().nullable(),
  clicks: z.number().nullable(),
  ctr: z.number().nullable(),
  cpm: z.number().nullable(),
  cost: z.number().nullable(),
  impression: z.number().nullable(),
  campaignBudget: z.number().nullable(),

  targetLocations: z.array(z.string()),
  locationExcluded: z.array(z.string()),

  locationStats: z.array(
    z.object({
      location: z.string().nullable().optional(),
      clicks: z.number().nullable().optional(),
      ctr: z.number().nullable().optional(),
      cpc: z.number().nullable().optional(),
      cost: z.number().nullable().optional(),
      cpm: z.number().nullable().optional(),
      impression: z.number().nullable().optional(),
    })
  ),
});

export type CampaignFormType = Omit<z.infer<typeof CampaignFormSchema>, "importAt" | "date"> & {
  importAt?: Date | null;
  date?: Date | null;
};

import * as z from "zod";

export const projectFinalUrlFormSchema = z.object({
  name: z.string().min(1, "Tên URL không được để trống"),
  finalURL: z.string().min(1, "URL không được để trống"),
  countriesTier1: z.array(z.string()).nullable(),
  countriesTier2: z.array(z.string()).nullable(),
  countriesTier3: z.array(z.string()).nullable(),
  excludeCountries: z.array(z.string()).nullable(),
  title: z.string().nullable(),
  content: z.string().nullable(),
  targetRef: z.number().nullable(),
  targetCostPerRef: z.number().nullable(),
  targetFtd: z.number().nullable(),
  targetCostPerFtd: z.number().nullable(),
  targetDailyKeyVolume: z.number().nullable(),
  targetCpc: z.number().nullable(),
  budget: z.number().nullable(),
  suggestedBid: z.number().nullable(),
});

export type ProjectFinalUrlFormType = z.infer<typeof projectFinalUrlFormSchema>;

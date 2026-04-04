import * as z from "zod";

export const appealedProxyFormSchema = z.object({
  ip: z.string().min(1, "IP không được bỏ trống"),
  protocol: z.string().optional(),
  country: z.string().optional(),
  source: z.string().optional(),
  user: z.string().optional(),
  purchasedAt: z.date().optional(),
});

export type AppealedProxyFormType = z.infer<typeof appealedProxyFormSchema>;

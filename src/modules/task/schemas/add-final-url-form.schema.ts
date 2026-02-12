import * as zod from "zod";

export const addFinalUrlFormSchema = zod.object({
  name: zod.string().min(1, "Tên URL không được để trống"),
  finalUrl: zod.string().min(1, "URL không được để trống"),
});

export type AddFinalUrlFormValues = zod.infer<typeof addFinalUrlFormSchema>;

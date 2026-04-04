import type { AppealedProxyFormType } from "@/modules/appealedProxy/schemas/appealed-proxy-form.schema";
import type { AppealedProxy, CreateAppealedProxyRequest } from "@/modules/appealedProxy/types/appealedProxy.type";
import { formatDate } from "date-fns";

export const transformAppealedProxyToForm = (proxy?: AppealedProxy): AppealedProxyFormType => ({
  ip: proxy?.ip || "",
  protocol: proxy?.protocol || "",
  country: proxy?.country || "",
  source: proxy?.source || "",
  user: proxy?.user || "",
  purchasedAt: proxy?.purchasedAt || undefined,
});

export const transformFormToCreateAppealedProxy = (form: AppealedProxyFormType): CreateAppealedProxyRequest => ({
  ip: form.ip,
  protocol: form.protocol || undefined,
  country: form.country || undefined,
  source: form.source || undefined,
  user: form.user || undefined,
  purchasedAt: form.purchasedAt ? formatDate(form.purchasedAt, "yyyy-MM-dd") : undefined,
});

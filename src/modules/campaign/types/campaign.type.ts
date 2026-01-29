import type { BaseParam } from "@/shared/types/common/param.type";

export type CampaignListParams = BaseParam & {
  importAtFrom?: string;
  importAtTo?: string;
  dateFrom?: string;
  dateTo?: string;
  uid?: string;
  externalId?: string;
  gmail?: string;
  campaignName?: string;
  finalUrl?: string;
};

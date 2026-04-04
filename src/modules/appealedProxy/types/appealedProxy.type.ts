import type { BaseParams } from "@/shared/types/common/param.type";

export type AppealedProxyListParams = BaseParams & {
  search?: string;
  protocol?: string;
  country?: string;
  source?: string;
  user?: string;
};

export type AppealedProxy = {
  id: string;
  ip: string;
  protocol: string;
  country: string;
  source: string;
  user: string;
  purchasedAt: Date;
  createdAt: Date;
};

export type CreateAppealedProxyRequest = {
  ip: string;
  protocol?: string;
  country?: string;
  source?: string;
  user?: string;
  purchasedAt?: string;
};

export type UpdateAppealedProxyRequest = Partial<CreateAppealedProxyRequest>;

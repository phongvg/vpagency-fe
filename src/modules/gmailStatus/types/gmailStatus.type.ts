import type { BaseParam } from "@/shared/types/common/param.type";

export type GmailStatusListParams = BaseParam & {
  search?: string;
};

export type GmailStatus = {
  id: string;
  name: string;
  description: string | null;
  active: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
};

export type UpdateGmailStatusRequest = {
  name?: string;
  description?: string | null;
  active?: boolean;
};

export type CreateGmailStatusRequest = {
  name: string;
  description?: string | null;
};

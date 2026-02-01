import type { GmailStatus } from "@/modules/gmailStatus/types/gmailStatus.type";
import type { User } from "@/modules/user/types/user.type";
import type { BaseParam } from "@/shared/types/common/param.type";

export type GmailListParams = BaseParam & {
  search?: string;
};

export type Gmail = {
  id: string;
  name: string;
  statusId: string | null;
  status: GmailStatus;
  assignedUserIds: string[];
  assignedUsers: User[];
  password: string;
  recoverMail: string | null;
  recoverMailPassword: string | null;
  code2fa: string | null;
  phone: string | null;
  proxy: string | null;
  price: number | null;
  appPassword: string | null;
  createdYear: number | null;
  profileName: string | null;
  creatorId: string;
  creator: User | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateGmailRequest = {
  name?: string;
  password?: string;
  statusId?: string;
  assignedUserIds?: string[];
  recoverMail?: string;
  recoverMailPassword?: string | null;
  code2fa?: string;
  phone?: string;
  proxy?: string;
  price?: number;
  appPassword?: string;
  createdYear?: number | null;
  profileName?: string;
};

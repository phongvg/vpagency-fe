import type { User } from "@/modules/user/types/user.type";
import type { BaseParam } from "@/shared/types/common/param.type";

export type AppealAccountListParams = BaseParam & {
  search?: string;
};

export type AppealAccount = {
  id: string;
  profileName: string;
  email: string;
  password: string;
  recoveryEmail: string;
  twoFa: string;
  mcc: string;
  uid: string;
  appealPlatform: string;
  appealedBy: string;
  usedBy: string;
  note: string;
  note2: string;
  rarityLevel: string;
  creator: User;
};

export type UpdateAppealAccountRequest = {
  profileName?: string;
  email?: string;
  password?: string;
  recoveryEmail?: string;
  twoFa?: string;
  mcc?: string;
  uid?: string;
  appealPlatform?: string;
  appealedBy?: string;
  usedBy?: string;
  note?: string;
  note2?: string;
  rarityLevel?: string;
};

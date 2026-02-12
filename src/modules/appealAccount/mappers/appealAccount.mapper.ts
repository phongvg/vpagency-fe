import type { AppealAccountFormType } from "@/modules/appealAccount/schemas/appeal-account-form.schema";
import type { AppealAccount } from "@/modules/appealAccount/types/appealAccount.type";

export const transformAppealAccountToForm = (appealAccount?: AppealAccount): AppealAccountFormType => ({
  profileName: appealAccount?.profileName || "",
  email: appealAccount?.email || "",
  password: appealAccount?.password || "",
  recoveryEmail: appealAccount?.recoveryEmail || "",
  twoFa: appealAccount?.twoFa || "",
  mcc: appealAccount?.mcc || "",
  uid: appealAccount?.uid || "",
  appealPlatform: appealAccount?.appealPlatform || "",
  appealedBy: appealAccount?.appealedBy || "",
  usedBy: appealAccount?.usedBy || "",
  note: appealAccount?.note || "",
  note2: appealAccount?.note2 || "",
  rarityLevel: appealAccount?.rarityLevel || "",
});

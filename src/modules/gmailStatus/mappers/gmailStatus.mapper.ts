import type { GmailStatusFormType } from "@/modules/gmailStatus/schemas/gmail-status-form.schema";
import type { GmailStatus } from "@/modules/gmailStatus/types/gmailStatus.type";

export const transformGmailStatusToForm = (gmailStatus?: GmailStatus): GmailStatusFormType => ({
  name: gmailStatus?.name || "",
  description: gmailStatus?.description || "",
});

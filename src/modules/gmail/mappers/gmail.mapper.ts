import type { GmailFormType } from "../schemas/gmail-form.schema";
import type { Gmail, UpdateGmailRequest } from "../types/gmail.type";

export const transformGmailToForm = (gmail?: Gmail | undefined): GmailFormType => {
  return {
    name: gmail?.name || "",
    password: gmail?.password || "",
    statusId: gmail?.status ? { value: gmail.status.id, label: gmail.status.name } : undefined,
    assignedUserIds: gmail?.assignedUsers.map((user) => ({ value: user.id, label: user.username })) || [],
    recoverMail: gmail?.recoverMail || "",
    recoverMailPassword: gmail?.recoverMailPassword || "",
    code2fa: gmail?.code2fa || "",
    phone: gmail?.phone || "",
    proxy: gmail?.proxy || "",
    price: gmail?.price ?? undefined,
    appPassword: gmail?.appPassword || "",
    createdYear: gmail?.createdYear ?? undefined,
    profileName: gmail?.profileName || "",
  };
};

export const transformTGmailFormToPayload = (data: GmailFormType): UpdateGmailRequest => ({
  name: data.name,
  password: data.password,
  statusId: data.statusId?.value,
  assignedUserIds: data.assignedUserIds?.map((user) => user.value),
  recoverMail: data.recoverMail,
  recoverMailPassword: data.recoverMailPassword,
  code2fa: data.code2fa,
  phone: data.phone,
  proxy: data.proxy,
  price: data.price,
  appPassword: data.appPassword,
  createdYear: data.createdYear,
  profileName: data.profileName,
});

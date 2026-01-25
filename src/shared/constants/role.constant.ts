export const Role = {
  ADMIN: "ADMIN",
  MANAGER_AFF: "MANAGER_AFF",
  MANAGER_AGENCY: "MANAGER_AGENCY",
  ACCOUNTING: "ACCOUNTING",
  MEMBER_AFF: "MEMBER_AFF",
  MEMBER_AGENCY: "MEMBER_AGENCY",
  USER: "USER",
} as const;

export type Role = (typeof Role)[keyof typeof Role];

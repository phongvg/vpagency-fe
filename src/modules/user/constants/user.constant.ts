export const UserStatus = {
  OnBoarding: "ONBOARDING",
  Active: "ACTIVE",
  Inactive: "INACTIVE",
} as const;

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

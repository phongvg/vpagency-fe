export type UpdateUserInfoRequest = {
  username?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  avatar?: string | null;
};

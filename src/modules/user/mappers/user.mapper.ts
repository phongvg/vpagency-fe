import type { UserFormType } from "@/modules/user/schemas/user-form.schema";
import type { User } from "@/modules/user/types/user.type";

export const transformUserToForm = (user?: User): UserFormType => ({
  username: user?.username || "",
  firstName: user?.firstName || "",
  lastName: user?.lastName || "",
  email: user?.email || "",
  roles: user?.roles || [],
});

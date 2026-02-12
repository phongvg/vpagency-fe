import type { UpdateProfileFormType } from "@/modules/me/schemas/update-profile-form.schema";
import type { User } from "@/modules/user/types/user.type";

export const transformUserToUpdateProfileForm = (user?: User | null): UpdateProfileFormType => ({
  username: user?.username || "",
  firstName: user?.firstName || "",
  lastName: user?.lastName || "",
  email: user?.email || "",
  password: "",
  avatar: null,
});

export const transformUpdateProfileFormToFormData = (values: UpdateProfileFormType): FormData => {
  const formData = new FormData();

  if (values.username) {
    formData.append("username", values.username);
  }

  formData.append("firstName", values.firstName);
  formData.append("lastName", values.lastName);
  formData.append("email", values.email);

  if (values.password) {
    formData.append("password", values.password);
  }

  if (values.avatar instanceof File) {
    formData.append("avatar", values.avatar);
  }

  return formData;
};

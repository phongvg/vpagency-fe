import { http } from "@/shared/libs/http";

export const meApi = {
  updateProfile: (data: FormData) => {
    return http.put("/me", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

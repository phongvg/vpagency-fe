import type { User } from "@/modules/user/types/user.type";
import { http } from "@/shared/libs/http";
import type { ApiBaseResponse } from "@/shared/types/common/apiResponse.type";

export const meApi = {
  updateProfile: (data: FormData): Promise<ApiBaseResponse<User>> => {
    return http.put("/me", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

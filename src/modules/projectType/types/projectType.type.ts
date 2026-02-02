import type { BaseParam } from "@/shared/types/common/param.type";

export type ProjectTypeListParams = BaseParam & {
  search?: string;
};

export type ProjectType = {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateProjectTypeRequest = {
  name?: string;
  description?: string | null;
};

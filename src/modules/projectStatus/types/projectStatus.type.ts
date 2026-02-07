import type { BaseParams } from "@/shared/types/common/param.type";

export type ProjectStatusListParams = BaseParams & {
  search?: string;
};

export type ProjectStatus = {
  id: string;
  name: string;
  description: string | null;
  active: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
};

export type UpdateProjectStatusRequest = {
  name?: string;
  description?: string | null;
  active?: boolean;
};

export type CreateProjectStatusRequest = {
  name: string;
  description?: string | null;
};

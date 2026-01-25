export type Meta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type ApiBaseResponse<T> = {
  success: boolean;
  code?: string;
  message: string;
  data: T;
};

export type ApiBaseListResponse<T> = {
  success: boolean;
  code?: string;
  message?: string;
  data: {
    items: T[];
    meta: Meta;
  };
};

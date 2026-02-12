import type { Meta } from "@/shared/types/common/apiResponse.type";

type ApiResponse<T> = {
  data: {
    items: T[];
    meta: Meta;
  };
};

type ApiFunction<T> = (params: { page: number; limit?: number; search?: string }) => Promise<ApiResponse<T>>;

export const createAsyncSelectFetcher = <T>(apiFunc: ApiFunction<T>, limit = 10) => {
  return async ({ search, page }: { search: string; page: number }) => {
    const res = await apiFunc({
      page,
      limit,
      search,
    });

    return {
      items: res.data.items,
      meta: res.data.meta,
    };
  };
};

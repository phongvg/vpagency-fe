import type { TaskListParams } from "@/modules/task/types/task.type";
import { normalizeParams } from "@/shared/utils/common.util";

export const taskQueryKeys = {
  all: ["tasks"] as const,

  lists: () => [...taskQueryKeys.all, "list"] as const,

  list: (params: TaskListParams) => [...taskQueryKeys.lists(), normalizeParams(params)] as const,

  detail: (id: string) => [...taskQueryKeys.all, "detail", id] as const,
};

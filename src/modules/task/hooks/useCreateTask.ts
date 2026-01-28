import { taskApi } from "@/modules/task/api/task.api";
import type { UpdateTaskRequest } from "@/modules/task/types/task.type";
import { useMutation } from "@tanstack/react-query";

export const useCreateTask = () => {
  return useMutation({
    mutationFn: (data: UpdateTaskRequest) => taskApi.createTask(data),
  });
};

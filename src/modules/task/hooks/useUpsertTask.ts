import { taskApi } from "@/modules/task/api/task.api";
import type { UpdateTaskRequest } from "@/modules/task/types/task.type";
import { useMutation } from "@tanstack/react-query";

type UpsertTaskPayload = { id: string; data: UpdateTaskRequest } | { data: UpdateTaskRequest };

export const useUpsertTask = () => {
  return useMutation({
    mutationFn: (payload: UpsertTaskPayload) => {
      if ("id" in payload) {
        return taskApi.editTask(payload.id, payload.data);
      }

      return taskApi.createTask(payload.data);
    },
  });
};

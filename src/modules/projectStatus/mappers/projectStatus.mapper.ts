import type { ProjectStatusFormType } from "@/modules/projectStatus/schemas/project-status-form.schema";
import type { ProjectStatus } from "@/modules/projectStatus/types/projectStatus.type";

export const transformProjectStatusToForm = (projectStatus?: ProjectStatus): ProjectStatusFormType => ({
  name: projectStatus?.name || "",
  description: projectStatus?.description || "",
});

import type { ProjectTypeFormType } from "@/modules/projectType/schemas/project-type-form.schema";
import type { ProjectType } from "@/modules/projectType/types/projectType.type";

export const transformProjectTypeToForm = (projectType?: ProjectType): ProjectTypeFormType => ({
  name: projectType?.name || "",
  description: projectType?.description || "",
});

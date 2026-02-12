import type { ProjectFormType } from "@/modules/project/schemas/project-form.schema";
import type { Project, UpdateProjectRequest } from "@/modules/project/types/project.type";

export const transformProjectToForm = (project?: Project | undefined): ProjectFormType => ({
  name: project?.name ?? "",
  typeId: project?.type ? { label: project.type.name, value: project.typeId } : null,
  statusId: project?.status ? { label: project.status.name, value: project.statusId } : null,
  totalBudget: project?.totalBudget ?? null,
  ageRange: project?.ageRange ? project.ageRange.map((age) => ({ label: age, value: age })) : [],
  gender: project?.gender ?? null,
  title: project?.title ?? null,
  description: project?.description ?? null,
  note: project?.note ?? null,
  content: project?.content ?? null,
  deadline: project?.deadline ? new Date(project.deadline) : null,
  startedAt: project?.startedAt ? new Date(project.startedAt) : null,
});

export const transformFormToProject = (form: ProjectFormType): UpdateProjectRequest => ({
  name: form.name,
  typeId: form.typeId?.value ?? "",
  statusId: form.statusId?.value ?? "",
  totalBudget: form.totalBudget,
  ageRange: form.ageRange?.map((age) => age.value) ?? [],
  gender: form.gender,
  title: form.title,
  description: form.description,
  note: form.note,
  content: form.content,
  deadline: form.deadline,
  startedAt: form.startedAt,
});

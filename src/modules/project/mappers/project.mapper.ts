import type { ProjectFormType } from "@/modules/project/schemas/project-form.schema";
import type { Project } from "@/modules/project/types/project.type";

export const transformProjectToForm = (project?: Project | undefined): ProjectFormType => ({
  name: project?.name ?? "",
  typeId: project?.typeId ? { label: project.type.name, value: project.typeId } : null,
  statusId: project?.statusId ? { label: project.status.name, value: project.statusId } : null,
  totalBudget: project?.totalBudget ?? null,
  ageRange: project?.ageRange ?? null,
  gender: project?.gender ?? null,
  title: project?.title ?? null,
  description: project?.description ?? null,
  note: project?.note ?? null,
  content: project?.content ?? null,
  deadline: project?.deadline ?? null,
  startedAt: project?.startedAt ?? null,
  finalUrls:
    project?.finalUrls?.map((url) => ({
      name: url.name,
      finalURL: url.finalURL,
      countriesTier1: url.countriesTier1 ?? null,
      countriesTier2: url.countriesTier2 ?? null,
      countriesTier3: url.countriesTier3 ?? null,
      excludeCountries: url.excludeCountries ?? null,
    })) ?? null,
});

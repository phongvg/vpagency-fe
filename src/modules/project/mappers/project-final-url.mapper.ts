import type { FinalUrl, UpdateFinalUrlRequest } from "@/modules/finalUrl/types/finalUrl.type";
import type { ProjectFinalUrlFormType } from "@/modules/project/schemas/project-final-url-form.schema";

export const transformProjectToFinalUrlForm = (projectFinalUrl?: FinalUrl | undefined): ProjectFinalUrlFormType => ({
  name: projectFinalUrl?.name ?? "",
  finalURL: projectFinalUrl?.finalURL ?? "",
  countriesTier1: projectFinalUrl?.countriesTier1 ? projectFinalUrl.countriesTier1.map((country) => country) : null,
  countriesTier2: projectFinalUrl?.countriesTier2 ? projectFinalUrl.countriesTier2.map((country) => country) : null,
  countriesTier3: projectFinalUrl?.countriesTier3 ? projectFinalUrl.countriesTier3.map((country) => country) : null,
  excludeCountries: projectFinalUrl?.excludeCountries ? projectFinalUrl.excludeCountries.map((country) => country) : null,
  title: projectFinalUrl?.title ?? null,
  content: projectFinalUrl?.content ?? null,
  targetRef: projectFinalUrl?.targetRef ?? null,
  targetCostPerRef: projectFinalUrl?.targetCostPerRef ?? null,
  targetFtd: projectFinalUrl?.targetFtd ?? null,
  targetCostPerFtd: projectFinalUrl?.targetCostPerFtd ?? null,
  targetDailyKeyVolume: projectFinalUrl?.targetDailyKeyVolume ?? null,
  targetCpc: projectFinalUrl?.targetCpc ?? null,
  budget: projectFinalUrl?.budget ?? null,
  suggestedBid: projectFinalUrl?.suggestedBid ?? null,
});

export const transformFormToFinalUrl = (formData: ProjectFinalUrlFormType, projectId: string): UpdateFinalUrlRequest => ({
  projectId,
  name: formData.name,
  finalURL: formData.finalURL,
  countriesTier1: formData.countriesTier1 ? formData.countriesTier1.map((country) => country) : [],
  countriesTier2: formData.countriesTier2 ? formData.countriesTier2.map((country) => country) : [],
  countriesTier3: formData.countriesTier3 ? formData.countriesTier3.map((country) => country) : [],
  excludeCountries: formData.excludeCountries ? formData.excludeCountries.map((country) => country) : [],
  title: formData.title,
  content: formData.content,
  targetRef: formData.targetRef,
  targetCostPerRef: formData.targetCostPerRef,
  targetFtd: formData.targetFtd,
  targetCostPerFtd: formData.targetCostPerFtd,
  targetDailyKeyVolume: formData.targetDailyKeyVolume,
  targetCpc: formData.targetCpc,
  budget: formData.budget,
  suggestedBid: formData.suggestedBid,
});

import type { FinalUrl } from "@/modules/finalUrl/types/finalUrl.type";
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

import type { FinalUrl } from "@/modules/finalUrl/types/finalUrl.type";
import type { User } from "@/modules/user/types/user.type";
import type { BaseParams } from "@/shared/types/common/param.type";
import type { MasterData } from "@/shared/types/masterData.type";

export type ProjectListParams = BaseParams & {
  search?: string;
};

export type Project = {
  id: string;
  name: string;
  typeId: string;
  type: MasterData;
  typeName: string;
  statusId: string;
  status: MasterData;
  statusName: string;
  ownerId: string;
  owner: User;
  totalBudget: number | null;
  spentBudget: number | null;
  cpc: number | null;
  exclusiveKeywords: string[];
  rejectedKeywords: string[];
  domainStatus: string;
  originalDomain: string;
  originalLadipage: string;
  finalURL: string;
  trackingURL: string;
  targetCountries: string[];
  rejectedCountries: string[];
  startedAt: Date | null;
  devices: string[];
  ageRange: string[];
  gender: string | null;
  content: string | null;
  title: string | null;
  note: string | null;
  deadline: Date | null;
  description: string | null;
  finalUrls: FinalUrl[];
  createdAt: string | Date | null;
  updatedAt: string | Date | null;
};

export type UpdateProjectRequest = {
  name: string;
  typeId: string;
  statusId: string;
  totalBudget: number | null;
  ageRange: string[] | null;
  gender: string | null;
  title: string | null;
  description: string | null;
  note: string | null;
  content: string | null;
  deadline: Date | null;
  startedAt: Date | null;
  finalUrls: Array<{
    name: string;
    finalURL: string;
    countries: string[] | null;
  }> | null;
};

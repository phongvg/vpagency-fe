import type { ProjectDailyReportStep1Type } from "@/modules/projectDailyStats/schemas/project-daily-report-step-1.schema";
import type { ProjectDailyReportStep2Type } from "@/modules/projectDailyStats/schemas/project-daily-report-step-2.schema";
import type {
  GenerateProjectDailyStatRequest,
  ProjectDailyStats,
  UpdateProjectDailyStatRequest,
} from "@/modules/projectDailyStats/types/projectDailyStats.type";
import { fixedNumber } from "@/shared/utils/common.util";
import { format } from "date-fns";

export const transformProjectDailyReportToFormStep1 = (): ProjectDailyReportStep1Type => ({
  date: undefined,
  projectId: null,
});

export const transformFormToProjectDailyReportStep1 = (formData: ProjectDailyReportStep1Type): GenerateProjectDailyStatRequest => ({
  date: formData.date ? format(formData.date, "yyyy-MM-dd") : "",
  projectId: formData.projectId ? formData.projectId.value : "",
});

export const transformProjectDailyReportToFormStep2 = (report?: ProjectDailyStats | undefined): ProjectDailyReportStep2Type => ({
  totalTargetDailyKeyVolume: report?.totalTargetDailyKeyVolume ?? 0,
  totalClicks: report?.totalClicks ?? 0,
  totalTargetCpc: report?.totalTargetCpc ?? 0,
  totalCost: report?.totalCost ?? 0,

  totalRef: report?.totalRef ?? 0,
  totalFtd: report?.totalFtd ?? 0,
  totalTargetRef: report?.totalTargetRef ?? 0,
  receivedRevenue: report?.receivedRevenue ?? 0,
  holdRevenue: report?.holdRevenue ?? 0,

  costPerRef: fixedNumber(report?.costPerRef),
  rateRefPerClick: fixedNumber(report?.rateRefPerClick),
  costPerFtd: fixedNumber(report?.costPerFtd),
  costFtdPerRef: fixedNumber(report?.costFtdPerRef),
  totalClickPerVolume: fixedNumber(report?.totalClickPerVolume),
  totalRefPerVolume: fixedNumber(report?.totalRefPerVolume),
  profit: fixedNumber(report?.profit),
  roi: fixedNumber(report?.roi),
});

export const transformProjectDailyReportToPayloadStep2 = (formData: ProjectDailyReportStep2Type): UpdateProjectDailyStatRequest => ({
  totalRef: formData.totalRef ?? 0,
  totalFtd: formData.totalFtd ?? 0,
  totalTargetDailyKeyVolume: formData.totalTargetDailyKeyVolume ?? 0,
  totalTargetRef: formData.totalTargetRef ?? 0,
  receivedRevenue: formData.receivedRevenue ?? 0,
  holdRevenue: formData.holdRevenue ?? 0,
  costFtdPerRef: formData.costFtdPerRef ?? 0,
  costPerFtd: formData.costPerFtd ?? 0,
  costPerRef: formData.costPerRef ?? 0,
  rateRefPerClick: formData.rateRefPerClick ?? 0,
  totalClickPerVolume: formData.totalClickPerVolume ?? 0,
  totalRefPerVolume: formData.totalRefPerVolume ?? 0,
  profit: formData.profit ?? 0,
  roi: formData.roi ?? 0,
});

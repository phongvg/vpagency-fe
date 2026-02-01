import type { UpdateCampaignRequest } from "@/modules/campaign/types/campaign.type";
import * as XLSX from "xlsx";

export const excelDateToJSDate = (serial: number): string => {
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400;
  const date_info = new Date(utc_value * 1000);
  return date_info.toISOString().slice(0, 10);
};

export const getSheetData = (workbook: XLSX.WorkBook, sheetName: string): Record<string, any>[] => {
  if (!workbook.SheetNames.includes(sheetName)) {
    throw new Error(`Không tìm thấy sheet "${sheetName}" trong file`);
  }
  return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: "" });
};

export const safeChangeValue = (value: number | null | undefined, rate: number | undefined) => {
  try {
    return value ? Number(value) * Number(rate) : 0;
  } catch {
    return 0;
  }
};

export const applyExchangeRate = (data: UpdateCampaignRequest[], rateMap: Record<string, number>): UpdateCampaignRequest[] => {
  return data.map((campaign) => {
    let rate = campaign.uid ? rateMap[Number(campaign.uid)] : undefined;

    if (!rate) rate = 1;

    return {
      ...campaign,
      cost: safeChangeValue(campaign.cost, rate),
      avgCpc: safeChangeValue(campaign.avgCpc, rate),
      targetCpc: safeChangeValue(campaign.targetCpc, rate),
      campaignBudget: safeChangeValue(campaign.campaignBudget, rate),

      keywords:
        campaign.keywords?.map((keyword) => ({
          ...keyword,
          cpc: safeChangeValue(keyword.cpc, rate),
          cpm: safeChangeValue(keyword.cpm, rate),
          cost: safeChangeValue(keyword.cost, rate),
          bid: safeChangeValue(keyword.bid, rate),
        })) || [],

      topSearchTerms:
        campaign.topSearchTerms?.map((term) => ({
          ...term,
          cpc: safeChangeValue(term.cpc, rate),
          cost: safeChangeValue(term.cost, rate),
        })) || [],

      locationStats:
        campaign.locationStats?.map((stat) => ({
          ...stat,
          cpc: safeChangeValue(stat.cpc, rate),
          cost: safeChangeValue(stat.cost, rate),
        })) || [],
    };
  });
};

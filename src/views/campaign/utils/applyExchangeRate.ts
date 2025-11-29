import { UpdateCampaignRequest } from '@/views/campaign/types/campaign.type'

const safeChangeValue = (value: number | null | undefined, rate: number | undefined) => {
  try {
    return value ? Number(value) * Number(rate) : 0
  } catch {
    return 0
  }
}

export const applyExchangeRate = (
  data: UpdateCampaignRequest[],
  rateMap: Record<string, number>,
): UpdateCampaignRequest[] => {
  return data.map((campaign) => {
    let rate = campaign.uid ? rateMap[Number(campaign.uid)] : undefined

    if (!rate) rate = 1

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
          spent: safeChangeValue(term.spent, rate),
        })) || [],

      locationStats:
        campaign.locationStats?.map((stat) => ({
          ...stat,
          cpc: safeChangeValue(stat.cpc, rate),
          spent: safeChangeValue(stat.spent, rate),
        })) || [],
    }
  })
}

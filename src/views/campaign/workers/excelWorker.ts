import { Campaign, UpdateCampaignRequest } from '@/views/campaign/types/campaign.type'
import { removeDash } from '@/helpers/removeDash'
import * as XLSX from 'xlsx'

interface WorkerMessage {
  type: 'process'
  file: ArrayBuffer
}

interface WorkerResponse {
  type: 'success' | 'error' | 'progress'
  data?: Campaign[]
  error?: string
  progress?: number
}

const excelDateToJSDate = (serial: number): string => {
  const utc_days = Math.floor(serial - 25569)
  const utc_value = utc_days * 86400
  const date_info = new Date(utc_value * 1000)
  return date_info.toISOString().slice(0, 10)
}

const getSheetData = (workbook: XLSX.WorkBook, sheetName: string): Record<string, any>[] => {
  if (!workbook.SheetNames.includes(sheetName)) {
    throw new Error(`Không tìm thấy sheet "${sheetName}" trong file`)
  }
  return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' })
}

self.onmessage = async (e: MessageEvent<WorkerMessage>) => {
  const { type, file } = e.data

  if (type !== 'process') return

  try {
    self.postMessage({ type: 'progress', progress: 10 } as WorkerResponse)

    const fileData = new Uint8Array(file)
    const workbook = XLSX.read(fileData, { type: 'array' })

    self.postMessage({ type: 'progress', progress: 30 } as WorkerResponse)

    const campaignPfmYesterdaySheet = getSheetData(workbook, 'Campaign_Performance_Yesterday')
    const campaignSheet = getSheetData(workbook, 'Campaign')
    const campaignCriterionSheet = getSheetData(workbook, 'Campaign_Criterion')
    const adGroupCriterion = getSheetData(workbook, 'AdGroupCriterion')
    const adGroupAdSheet = getSheetData(workbook, 'AdGroupAd')
    const searchTermYesterdaySheet = getSheetData(workbook, 'Search_Term_Yesterday')
    const geographicViewYesterdaySheet = getSheetData(workbook, 'Geographic_View_Yesterday')
    const mccCustomerListSheet = getSheetData(workbook, 'MCC_Customer_List')
    const locationTableSheet = getSheetData(workbook, 'Location_Table')

    self.postMessage({ type: 'progress', progress: 50 } as WorkerResponse)

    const importAt = excelDateToJSDate(campaignPfmYesterdaySheet[campaignPfmYesterdaySheet.length - 1]['Date Pulled'])
    const date = excelDateToJSDate(campaignPfmYesterdaySheet[campaignPfmYesterdaySheet.length - 1]['Data Date'])

    const campaignMap = new Map<any, any[]>()
    const campaignPfmMap = new Map<any, any[]>()
    const adGroupCriterionMap = new Map<any, any[]>()
    const searchTermMap = new Map<any, any[]>()
    const adGroupAdMap = new Map<any, any[]>()
    const campaignCriterionMap = new Map<any, any[]>()
    const geographicViewMap = new Map<any, any[]>()
    const mccMap = new Map<any, any>()
    const locationTableMap = new Map<any, any>()

    campaignSheet.forEach((row) => {
      const id = row['Campaign ID']
      if (!campaignMap.has(id)) campaignMap.set(id, [])
      campaignMap.get(id)!.push(row)
    })

    campaignPfmYesterdaySheet.forEach((row) => {
      const id = row['Campaign ID']
      if (!campaignPfmMap.has(id)) campaignPfmMap.set(id, [])
      campaignPfmMap.get(id)!.push(row)
    })

    adGroupCriterion.forEach((row) => {
      const id = row['Campaign ID']
      if (!adGroupCriterionMap.has(id)) adGroupCriterionMap.set(id, [])
      adGroupCriterionMap.get(id)!.push(row)
    })

    searchTermYesterdaySheet.forEach((row) => {
      const id = row['Campaign ID']
      if (!searchTermMap.has(id)) searchTermMap.set(id, [])
      searchTermMap.get(id)!.push(row)
    })

    adGroupAdSheet.forEach((row) => {
      const id = row['Campaign ID']
      if (!adGroupAdMap.has(id)) adGroupAdMap.set(id, [])
      adGroupAdMap.get(id)!.push(row)
    })

    campaignCriterionSheet.forEach((row) => {
      const id = row['Campaign ID']
      if (!campaignCriterionMap.has(id)) campaignCriterionMap.set(id, [])
      campaignCriterionMap.get(id)!.push(row)
    })

    geographicViewYesterdaySheet.forEach((row) => {
      const id = row['Campaign ID']
      if (!geographicViewMap.has(id)) geographicViewMap.set(id, [])
      geographicViewMap.get(id)!.push(row)
    })

    mccCustomerListSheet.forEach((row) => {
      const customerId = removeDash(String(row['Customer ID']))
      const mccId = removeDash(String(row['MCC ID']))
      mccMap.set(customerId, mccId)
    })

    locationTableSheet.forEach((row) => {
      const locationId = row['Criterion ID']
      const locationName = row['Country Name']
      locationTableMap.set(locationId, locationName)
    })

    self.postMessage({ type: 'progress', progress: 70 } as WorkerResponse)

    const campaignName = campaignSheet.map((item) => item['Name'])
    const campaignId = campaignSheet.map((item) => item['Campaign ID'])
    const uniqueCampaignIds = [...new Set(campaignId)]

    const campaigns: UpdateCampaignRequest[] = uniqueCampaignIds.map((id, index) => {
      if (index % 100 === 0) {
        const progress = 70 + Math.floor((index / uniqueCampaignIds.length) * 25)
        self.postMessage({ type: 'progress', progress } as WorkerResponse)
      }

      const adGroupCriterionRows = adGroupCriterionMap.get(id) || []
      const searchTermRows = searchTermMap.get(id) || []
      const campaignRows = campaignMap.get(id) || []
      const campaignPfmRows = campaignPfmMap.get(id) || []
      const adGroupAdRows = adGroupAdMap.get(id) || []
      const campaignCriterionRows = campaignCriterionMap.get(id) || []
      const geographicViewYesterdayRows = geographicViewMap.get(id) || []

      const uid = campaignRows.map((row) => row['Customer ID'])
      const uidValue = uid[uid.length - 1]
      let uidString =
        typeof uidValue === 'string' && uidValue.startsWith('customers/') ? uidValue.split('/')[1] : String(uidValue)
      uidString = removeDash(uidString)
      const mcc = mccMap.get(uidString) || null

      const finalUrlAds = adGroupAdRows.map((row) => row['Final URL'])
      const finalUrlKey = adGroupCriterionRows.map((row) => row['Final URL'])
      const keywordsRaw = adGroupCriterionRows.map((row) => {
        return {
          keyword: row['Keyword Text'],
          match: row['Keyword Match Type'],
        }
      })
      const keywords = Array.from(new Map(keywordsRaw.map((k) => [`${k.keyword}|${k.match}`, k])).values())
      const topSearchTermsRaw = searchTermRows.map((row) => {
        return {
          term: row['Search Term'],
          cpc: row['CPC'],
          spent: row['Cost'],
        }
      })
      const topSearchTerms = Array.from(
        new Map(topSearchTermsRaw.map((s) => [`${s.term}|${s.cpc}|${s.spent}`, s])).values(),
      )
      const statusCampaign = campaignRows.map((item) => item['Status'])
      const avgCpc = campaignPfmRows.map((item) => item['CPC'])
      const targetCpc = campaignRows.map((item) => item['Target CPC (micros)'])
      const cpcBidMicros = adGroupCriterionRows.map((item) => item['CPC Bid Micros'])
      const microsCalc =
        (cpcBidMicros[cpcBidMicros.length - 1] ? cpcBidMicros[cpcBidMicros.length - 1] / 1000000 : null) ||
        (targetCpc[targetCpc.length - 1] ? targetCpc[targetCpc.length - 1] / 1000000 : null)
      const click = campaignPfmRows.map((item) => item['Clicks'])
      const ctr = campaignPfmRows.map((item) => item['CTR'])
      const cpm = campaignPfmRows.map((item) => item['CPM'])
      const cost = campaignPfmRows.map((item) => item['Cost'])
      const targetLocations = campaignCriterionRows
        .filter((row) => row['Negative (Excluded)'] === 'No')
        .map((row) => row['Location Geo Target Constant'])
        .filter(Boolean)
      const locationStatsRaw = geographicViewYesterdayRows.map((row) => ({
        location: locationTableMap.get(row['Country ID']) || 'Unknown',
        clicks: row['Clicks'],
        ctr: row['CTR'],
        cpc: row['CPC'],
        spent: row['Cost'],
      }))
      const locationStats = Array.from(
        new Map(
          locationStatsRaw.map((loc) => [`${loc.location}|${loc.clicks}|${loc.ctr}|${loc.cpc}|${loc.spent}`, loc]),
        ).values(),
      )

      return {
        importAt,
        date,
        uid: uidString,
        mcc,
        name: campaignName[index] || null,
        externalId: id ? String(id) : null,
        finalUrl: finalUrlKey[finalUrlKey.length - 1]
          ? finalUrlKey[finalUrlKey.length - 1]
          : finalUrlAds[finalUrlAds.length - 1],
        keywords,
        topSearchTerms,
        status: statusCampaign[statusCampaign.length - 1] ?? null,
        avgCpc: avgCpc[avgCpc.length - 1] ?? null,
        micros: microsCalc,
        click: click[click.length - 1] ?? null,
        ctr: ctr[ctr.length - 1] ?? null,
        cpm: cpm[cpm.length - 1] ?? null,
        cost: cost[cost.length - 1] ?? null,
        targetLocations,
        locationStats,
      }
    })

    self.postMessage({ type: 'progress', progress: 100 } as WorkerResponse)

    self.postMessage({ type: 'success', data: campaigns } as WorkerResponse)
  } catch (error) {
    self.postMessage({
      type: 'error',
      error: error instanceof Error ? error.message : 'Lỗi xử lý file',
    } as WorkerResponse)
  }
}

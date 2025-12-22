import { removeDash } from '@/helpers/removeDash'
import { Campaign, CurrencyRate, UpdateCampaignRequest } from '@/views/campaign/types/campaign.type'
import * as XLSX from 'xlsx'

interface WorkerMessage {
  type: 'get-dates' | 'process'
  file: ArrayBuffer
  selectedDate?: string
}

interface WorkerResponse {
  type: 'success' | 'error' | 'progress' | 'debug' | 'dates'
  data?: Campaign[]
  currencyRates?: CurrencyRate[]
  availableDates?: string[]
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
  const { type, file, selectedDate } = e.data

  if (type !== 'process' && type !== 'get-dates') return

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
    const campaignBudgetSheet = getSheetData(workbook, 'Campaign_Budget')
    const keywordPfmYesterdaySheet = getSheetData(workbook, 'Keyword_Performance_Yesterday')

    if (type === 'get-dates') {
      const dates = campaignPfmYesterdaySheet.map((row) => row['Data Date']).filter(Boolean)
      const uniqueDates = [...new Set(dates)]
        .map((date) => (typeof date === 'number' ? excelDateToJSDate(date) : String(date)))
        .sort()
        .reverse()

      self.postMessage({ type: 'dates', availableDates: uniqueDates } as WorkerResponse)
      return
    }

    self.postMessage({ type: 'progress', progress: 50 } as WorkerResponse)

    const campaignMap = new Map<number, any[]>()
    const campaignPfmMap = new Map<number, any[]>()
    const adGroupCriterionMap = new Map<number, any[]>()
    const searchTermMap = new Map<string, any[]>()
    const adGroupAdMap = new Map<number, any[]>()
    const campaignCriterionMap = new Map<number, any[]>()
    const geographicViewMap = new Map<string, any[]>()
    const mccMap = new Map<string, any>()
    const locationTableMap = new Map<number, any>()
    const campaignBudgetMap = new Map<number, any[]>()
    const keywordPfmYesterdayMap = new Map<number, any[]>()

    const currencyRates: CurrencyRate[] = []

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
      const dataDate = row['Data Date']
      const key = `${id}|${dataDate}`
      if (!searchTermMap.has(key)) searchTermMap.set(key, [])
      searchTermMap.get(key)!.push(row)
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
      const dataDate = row['Data Date']
      const key = `${id}|${dataDate}`
      if (!geographicViewMap.has(key)) geographicViewMap.set(key, [])
      geographicViewMap.get(key)!.push(row)
    })

    mccCustomerListSheet.forEach((row) => {
      const customerId = removeDash(String(row['Customer ID']))
      const mccId = removeDash(String(row['MCC ID']))
      mccMap.set(customerId, mccId)

      const currencyCode = row['Currency']
      if (currencyCode && currencyCode !== 'USD') {
        currencyRates.push({ uid: customerId, code: currencyCode, rateToUSD: null })
      }
    })

    locationTableSheet.forEach((row) => {
      const locationId = row['Criterion ID']
      const locationName = row['Country Name']
      locationTableMap.set(locationId, locationName)
    })

    campaignBudgetSheet.forEach((row) => {
      const id = row['Campaign ID']
      if (!campaignBudgetMap.has(id)) campaignBudgetMap.set(id, [])
      campaignBudgetMap.get(id)!.push(row)
    })

    keywordPfmYesterdaySheet.forEach((row) => {
      const id = row['Campaign ID']
      if (!keywordPfmYesterdayMap.has(id)) keywordPfmYesterdayMap.set(id, [])
      keywordPfmYesterdayMap.get(id)!.push(row)
    })

    self.postMessage({ type: 'progress', progress: 70 } as WorkerResponse)

    const campaignId = campaignSheet.map((item) => item['Campaign ID'])
    const uniqueCampaignIds = [...new Set(campaignId)]

    const campaigns: UpdateCampaignRequest[] = uniqueCampaignIds.map((id, index) => {
      if (index % 100 === 0) {
        const progress = 70 + Math.floor((index / uniqueCampaignIds.length) * 25)
        self.postMessage({ type: 'progress', progress } as WorkerResponse)
      }

      const adGroupCriterionRows = adGroupCriterionMap.get(id) || []
      const campaignRows = campaignMap.get(id) || []
      const campaignPfmRows = campaignPfmMap.get(id) || []
      const adGroupAdRows = adGroupAdMap.get(id) || []
      const campaignCriterionRows = campaignCriterionMap.get(id) || []
      const campaignBudgetRows = campaignBudgetMap.get(id) || []
      const keywordPfmYesterdayRows = keywordPfmYesterdayMap.get(id) || []

      const importAt = campaignPfmRows.map((row) => row['Date Pulled'])
      const date = campaignPfmRows.map((row) => row['Data Date'])

      // Filter by selectedDate if provided
      let filteredCampaignPfmRows = campaignPfmRows
      let currentDataDate = date[date.length - 1]

      if (selectedDate) {
        filteredCampaignPfmRows = campaignPfmRows.filter((row) => {
          const rowDate = row['Data Date']
          const normalizedRowDate = typeof rowDate === 'number' ? excelDateToJSDate(rowDate) : String(rowDate)
          return normalizedRowDate === selectedDate
        })

        if (filteredCampaignPfmRows.length === 0) {
          filteredCampaignPfmRows = campaignPfmRows
        } else {
          currentDataDate = selectedDate
        }
      }

      const searchTermRows = searchTermMap.get(`${id}|${currentDataDate}`) || []
      const geographicViewYesterdayRows = geographicViewMap.get(`${id}|${currentDataDate}`) || []

      const uids = campaignRows.map((row) => row['Customer ID'])
      const lastUid = uids[uids.length - 1]
      let uidString =
        typeof lastUid === 'string' && lastUid.startsWith('customers/') ? lastUid.split('/')[1] : String(lastUid)
      uidString = removeDash(uidString)
      const mcc = mccMap.get(uidString) || null
      const finalUrlAds = adGroupAdRows.map((row) => row['Final URL'])
      const finalUrlKey = adGroupCriterionRows.map((row) => row['Final URL'])
      const criterionMap = new Map(
        adGroupCriterionRows.map((row) => [`${row['Keyword Text']}|${row['Keyword Match Type'].toLowerCase()}`, row]),
      )
      const keywordsRaw = keywordPfmYesterdayRows.map((row) => {
        const key = `${row['Keyword Text']}|${row['Keyword Match Type'].toLowerCase()}`
        const criterion = criterionMap.get(key)

        return {
          keyword: row['Keyword Text'],
          match: row['Keyword Match Type'],
          clicks: row['Clicks'],
          ctr: row['CTR'],
          cpc: row['CPC'],
          cpm: row['CPM'],
          cost: row['Cost'],
          impression: row['Impressions'],
          bid: criterion ? criterion['CPC Bid Micros'] / 1000000 : 0,
        }
      })
      const keywords = Array.from(new Map(keywordsRaw.map((k) => [`${k.keyword}|${k.match}`, k])).values())
      const negativeKeywordsRaw = adGroupCriterionRows
        .filter((row) => row['Is Negative Keyword'] === 'Yes')
        .map((row) => {
          return {
            keyword: row['Keyword Text'],
            match: row['Keyword Match Type'],
            clicks: 0,
            ctr: 0,
            cpc: 0,
            cpm: 0,
            cost: 0,
            impression: 0,
            bid: 0,
          }
        })
      const negativeKeywords = Array.from(
        new Map(negativeKeywordsRaw.map((k) => [`${k.keyword}|${k.match}`, k])).values(),
      )
      const topSearchTermsRaw = searchTermRows.map((row) => {
        return {
          term: row['Search Term'],
          cpc: row['CPC'],
          cost: row['Cost'],
          clicks: row['Clicks'],
          ctr: row['CTR'],
          cpm: row['CPM'],
          impression: row['Impressions'],
        }
      })
      const topSearchTerms = Array.from(
        new Map(
          topSearchTermsRaw.map((s) => [
            `${s.term}|${s.cpc}|${s.cost}|${s.clicks}|${s.ctr}|${s.cpm}|${s.impression}`,
            s,
          ]),
        ).values(),
      )
      const statusCampaign = campaignRows.map((row) => row['Status'])
      const avgCpc = filteredCampaignPfmRows.map((row) => row['CPC'])
      const targetCpc = campaignRows.map((row) => row['Target CPC (micros)'])
      const cpcBidMicros = adGroupCriterionRows.map((row) => row['CPC Bid Micros'])
      const microsCalc =
        (cpcBidMicros[cpcBidMicros.length - 1] ? cpcBidMicros[cpcBidMicros.length - 1] / 1000000 : null) ||
        (targetCpc[targetCpc.length - 1] ? targetCpc[targetCpc.length - 1] / 1000000 : null)
      const clicks = filteredCampaignPfmRows.map((row) => row['Clicks'])
      const ctr = filteredCampaignPfmRows.map((row) => row['CTR'])
      const cpm = filteredCampaignPfmRows.map((row) => row['CPM'])
      const cost = filteredCampaignPfmRows.map((row) => row['Cost'])
      const targetLocations = [
        ...new Set(
          campaignCriterionRows
            .filter((row) => row['Negative (Excluded)'] === 'No')
            .map((row) => row['Location Geo Target Constant'])
            .filter(Boolean),
        ),
      ]
      const locationStatsRaw = geographicViewYesterdayRows.map((row) => ({
        location: locationTableMap.get(row['Country ID']) || '',
        clicks: row['Clicks'],
        ctr: row['CTR'],
        cpc: row['CPC'],
        cost: row['Cost'],
        cpm: row['CPM'],
        impression: row['Impressions'],
      }))
      const locationStats = Array.from(
        new Map(
          locationStatsRaw.map((loc) => [`${loc.location}|${loc.clicks}|${loc.ctr}|${loc.cpc}|${loc.cost}`, loc]),
        ).values(),
      )
      const locationExcluded = [
        ...new Set(
          campaignCriterionRows
            .filter((row) => row['Negative (Excluded)'] === 'Yes')
            .map((row) => row['Location Geo Target Constant'])
            .filter(Boolean),
        ),
      ]
      const campaignBudget = campaignBudgetRows.map((row) => row['Amount (Micros)'])
      const impression = filteredCampaignPfmRows.map((row) => row['Impressions'])

      return {
        // Nếu không có dữ liệu ngày nhập hoặc ngày dữ liệu thì gán ngày hiện tại
        importAt: filteredCampaignPfmRows[filteredCampaignPfmRows.length - 1]?.['Date Pulled']
          ? excelDateToJSDate(filteredCampaignPfmRows[filteredCampaignPfmRows.length - 1]['Date Pulled'])
          : new Date().toISOString().slice(0, 10),
        // Use selectedDate or last available date
        date:
          selectedDate ||
          (date[date.length - 1]
            ? excelDateToJSDate(date[date.length - 1])
            : (() => {
                const d = new Date()
                d.setDate(d.getDate() - 1)
                return d.toISOString().slice(0, 10)
              })()),
        uid: uidString,
        mcc,
        name: campaignRows[campaignRows.length - 1]?.['Name'] || null,
        externalId: id ? String(id) : null,
        finalUrl: finalUrlKey[finalUrlKey.length - 1]
          ? finalUrlKey[finalUrlKey.length - 1]
          : finalUrlAds[finalUrlAds.length - 1],
        keywords,
        topSearchTerms,
        status: statusCampaign[statusCampaign.length - 1] ?? null,
        avgCpc: avgCpc[avgCpc.length - 1] ?? 0,
        targetCpc: microsCalc,
        clicks: clicks[clicks.length - 1] ?? 0,
        ctr: ctr[ctr.length - 1] ?? 0,
        cpm: cpm[cpm.length - 1] ?? 0,
        cost: cost[cost.length - 1] ?? 0,
        targetLocations,
        locationStats,
        campaignBudget: campaignBudget[campaignBudget.length - 1]
          ? campaignBudget[campaignBudget.length - 1] / 1000000
          : 0,
        negativeKeywords,
        locationExcluded,
        impression: impression[impression.length - 1] ?? 0,
        gmail: '',
      }
    })

    const currencyRatesUnique = Array.from(new Map(currencyRates.map((c) => [c.uid, c])).values())

    self.postMessage({ type: 'progress', progress: 100 } as WorkerResponse)

    self.postMessage({ type: 'success', data: campaigns, currencyRates: currencyRatesUnique } as WorkerResponse)
  } catch (error) {
    self.postMessage({
      type: 'error',
      error: error instanceof Error ? error.message : 'Lỗi xử lý file',
    } as WorkerResponse)
  }
}

import { Campaign } from '@/@types/campaign'
import * as XLSX from 'xlsx'

interface SheetData {
  sheetName: string
  data: Record<string, any>[]
}

export const handleGetAllSheetExcelFile = (file: File): Promise<SheetData[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event: ProgressEvent<FileReader>) => {
      try {
        const result = event.target?.result
        if (!result) return reject('Không đọc được file')

        const data = new Uint8Array(result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })

        const allSheets: SheetData[] = workbook.SheetNames.map((sheetName) => ({
          sheetName,
          data: XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' }),
        }))

        resolve(allSheets)
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => reject('Lỗi đọc file')
    reader.readAsArrayBuffer(file)
  })
}

export const handleGetSheetDataByName = (file: File, sheetName: string): Promise<Record<string, any>[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event: ProgressEvent<FileReader>) => {
      try {
        const result = event.target?.result
        if (!result) return reject('Không đọc được file')

        const data = new Uint8Array(result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })

        if (!workbook.SheetNames.includes(sheetName)) {
          return reject(`Không tìm thấy sheet "${sheetName}" trong file`)
        }

        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' })
        resolve(sheetData as Record<string, any>[])
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => reject('Lỗi đọc file')
    reader.readAsArrayBuffer(file)
  })
}

export const excelDateToJSDate = (serial: number): string => {
  const utc_days = Math.floor(serial - 25569)
  const utc_value = utc_days * 86400
  const date_info = new Date(utc_value * 1000)
  return date_info.toISOString().slice(0, 10)
}

export const convertExcelData = async (file: File): Promise<Campaign[]> => {
  const campaignPfmYesterdaySheet = await handleGetSheetDataByName(file, 'Campaign_Performance_Yesterday')
  const campaignSheet = await handleGetSheetDataByName(file, 'Campaign')
  const campaignCriterionSheet = await handleGetSheetDataByName(file, 'Campaign_Criterion')
  const adGroupCriterion = await handleGetSheetDataByName(file, 'AdGroupCriterion')
  const adGroupAdSheet = await handleGetSheetDataByName(file, 'AdGroupAd')
  const searchTermYesterdaySheet = await handleGetSheetDataByName(file, 'Search_Term_Yesterday')
  const geographicViewYesterdaySheet = await handleGetSheetDataByName(file, 'Geographic_View_Yesterday')

  const datePull = excelDateToJSDate(campaignPfmYesterdaySheet[campaignPfmYesterdaySheet.length - 1]['Date Pulled'])
  const dateData = excelDateToJSDate(campaignPfmYesterdaySheet[campaignPfmYesterdaySheet.length - 1]['Data Date'])
  const campaignName = campaignSheet.map((item) => item['Name'])
  const campaignId = campaignSheet.map((item) => item['Campaign ID'])

  const uniqueCampaignIds = [...new Set(campaignId)]

  const data: Campaign[] = uniqueCampaignIds.map((id, index) => {
    const adGroupCriterionRows = adGroupCriterion.filter((row) => row['Campaign ID'] === id)
    const searchTermRows = searchTermYesterdaySheet.filter((row) => row['Campaign ID'] === id)
    const campaignRows = campaignSheet.filter((row) => row['Campaign ID'] === id)
    const campaignPfmRows = campaignPfmYesterdaySheet.filter((row) => row['Campaign ID'] === id)
    const adGroupAdRows = adGroupAdSheet.filter((row) => row['Campaign ID'] === id)
    const campaignCriterionRows = campaignCriterionSheet.filter((row) => row['Campaign ID'] === id)
    const geographicViewYesterdayRows = geographicViewYesterdaySheet.filter((row) => row['Campaign ID'] === id)

    const uid = campaignRows.map((row) => row['Customer ID'])
    const finalUrlAds = adGroupAdRows.map((row) => row['Final URL'])
    const finalUrlKey = adGroupCriterionRows.map((row) => row['Final URL'])
    const keyword = [...new Set(adGroupCriterionRows.map((row) => row['Keyword Text']))]
    const match = [...new Set(adGroupCriterionRows.map((row) => row['Keyword Match Type']))]
    const searchTerm = [...new Set(searchTermRows.map((row) => row['Search Term']))]
    const cpcSearchTerm = [...new Set(searchTermRows.map((row) => row['CPC']))].sort(
      (a, b) => (b as number) - (a as number),
    )
    const costSearchTerm = [...new Set(searchTermRows.map((row) => row['Cost']))].sort(
      (a, b) => (b as number) - (a as number),
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
    const locationTarget = campaignCriterionRows
      .filter((row) => row['Negative (Excluded)'] === 'No')
      .map((row) => row['Location Geo Target Constant'])
      .filter(Boolean)
    const spendingCountry = geographicViewYesterdayRows.map((row) => row['Country ID'])
    const cpcCountry = geographicViewYesterdayRows.map((row) => row['CPC'])
    const ctrCountry = geographicViewYesterdayRows.map((row) => row['CTR'])
    const clickCountry = geographicViewYesterdayRows.map((row) => row['Clicks'])
    const costCountry = geographicViewYesterdayRows.map((row) => row['Cost'])

    return {
      datePull,
      dateData,
      uid:
        typeof uid[uid.length - 1] === 'string' && uid[uid.length - 1].startsWith('customers/')
          ? Number(uid[uid.length - 1].split('/')[1])
          : uid[uid.length - 1],
      campaignName: campaignName[index] || null,
      campaignId: id || null,
      finalUrl: finalUrlKey[finalUrlKey.length - 1]
        ? finalUrlKey[finalUrlKey.length - 1]
        : finalUrlAds[finalUrlAds.length - 1],
      keyword,
      match,
      searchTerm,
      cpcSearchTerm,
      costSearchTerm,
      statusCampaign: statusCampaign[statusCampaign.length - 1] ?? null,
      avgCpc: avgCpc[avgCpc.length - 1] ?? null,
      micros: microsCalc,
      click: click[click.length - 1] ?? null,
      ctr: ctr[ctr.length - 1] ?? null,
      cpm: cpm[cpm.length - 1] ?? null,
      cost: cost[cost.length - 1] ?? null,
      locationTarget,
      spendingCountry: spendingCountry[spendingCountry.length - 1] ?? null,
      cpcCountry: cpcCountry[cpcCountry.length - 1] ?? null,
      ctrCountry: ctrCountry[ctrCountry.length - 1] ?? null,
      clickCountry: clickCountry[clickCountry.length - 1] ?? null,
      costCountry: costCountry[costCountry.length - 1] ?? null,
    }
  })

  return data
}

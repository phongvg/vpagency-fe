import { UpdateAppealAccountRequest } from '@/views/appealAccount/types/appealAccount.type'
import { UpdateGmailAccountRequest } from '@/views/gmailAccounts/types/gmailAccount.type'
import * as XLSX from 'xlsx'

interface WorkerMessage {
  type: 'process'
  file: ArrayBuffer
}

interface WorkerResponse {
  type: 'success' | 'error' | 'progress'
  data?: UpdateGmailAccountRequest[]
  error?: string
  progress?: number
}

self.onmessage = async (e: MessageEvent<WorkerMessage>) => {
  const { type, file } = e.data

  if (type !== 'process') return

  try {
    self.postMessage({ type: 'progress', progress: 10 } as WorkerResponse)

    const fileData = new Uint8Array(file)
    const workbook = XLSX.read(fileData, { type: 'array' })

    self.postMessage({ type: 'progress', progress: 30 } as WorkerResponse)

    const sheetName = workbook.SheetNames[0]
    if (!sheetName) {
      throw new Error('File Excel không có sheet nào')
    }

    const sheet = workbook.Sheets[sheetName]
    const rows: Record<string, any>[] = XLSX.utils.sheet_to_json(sheet, { defval: '' })

    self.postMessage({ type: 'progress', progress: 50 } as WorkerResponse)

    if (rows.length === 0) {
      throw new Error('File Excel không có dữ liệu')
    }

    const appealAccounts: UpdateAppealAccountRequest[] = rows.map((row, index) => {
      if (index % 100 === 0) {
        const progress = 50 + Math.floor((index / rows.length) * 45)
        self.postMessage({ type: 'progress', progress } as WorkerResponse)
      }

      const profileName = row['profile_name'] || null
      const email = row['email'] || null
      const password = row['password'] || null
      const recoveryEmail = row['mail khôi phục'] || null
      const twoFa = row['2fa'] || null
      const mcc = row['mcc'] || null
      const uid = row['UID TK'] || null
      const appealPlatform = row['SÀN KHÁNG ĐƯỢC'] || null
      const appealedBy = row['NGƯỜI KHÁNG'] || null
      const usedBy = row['Người sử dụng'] || null
      const note = row['note'] || null
      const note2 = row['note 2'] || null
      const rarityLevel = row['cấp độ hiếm'] || null

      return {
        profileName,
        email,
        password,
        recoveryEmail,
        twoFa,
        mcc,
        uid,
        appealPlatform,
        appealedBy,
        usedBy,
        note,
        note2,
        rarityLevel,
      }
    })

    self.postMessage({ type: 'progress', progress: 100 } as WorkerResponse)

    self.postMessage({ type: 'success', data: appealAccounts } as WorkerResponse)
  } catch (error) {
    self.postMessage({
      type: 'error',
      error: error instanceof Error ? error.message : 'Lỗi xử lý file',
    } as WorkerResponse)
  }
}

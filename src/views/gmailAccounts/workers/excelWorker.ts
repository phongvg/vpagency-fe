import * as XLSX from 'xlsx'
import { UpdateGmailAccountRequest } from '@/views/gmailAccounts/types/gmailAccount.type'

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

    const gmailAccounts: UpdateGmailAccountRequest[] = rows.map((row, index) => {
      if (index % 100 === 0) {
        const progress = 50 + Math.floor((index / rows.length) * 45)
        self.postMessage({ type: 'progress', progress } as WorkerResponse)
      }

      const profileName = row['profile name'] || null
      const email = row['email'] || null
      const password = row['password'] || null
      const recoverMail = row['recovery email'] || null
      const phone = row['number phone'] || null
      const code2fa = row['2fa secret'] || null
      const appPassword = row['app password'] || null
      const createdYear = row['create year'] || null
      const proxy = row['proxy'] || null
      const price = row['price'] || null

      return {
        profileName: profileName || null,
        name: email || null,
        password: password || null,
        recoverMail: recoverMail || null,
        recoverMailPassword: null,
        phone: phone || null,
        code2fa: code2fa || null,
        appPassword: appPassword || null,
        createdYear: createdYear ? parseInt(String(createdYear)) : null,
        proxy: proxy || null,
        price: price ? parseFloat(String(price)) : 0,
      }
    })

    self.postMessage({ type: 'progress', progress: 100 } as WorkerResponse)

    self.postMessage({ type: 'success', data: gmailAccounts } as WorkerResponse)
  } catch (error) {
    self.postMessage({
      type: 'error',
      error: error instanceof Error ? error.message : 'Lỗi xử lý file',
    } as WorkerResponse)
  }
}

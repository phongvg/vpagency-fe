import { CurrencyRate, UpdateCampaignRequest } from '@/views/campaign/types/campaign.type'
import { useCallback, useRef, useState } from 'react'

interface UseExcelWorkerReturn {
  getAvailableDates: (file: File) => Promise<string[]>
  processFile: (
    file: File,
    selectedDate?: string,
  ) => Promise<{ data: UpdateCampaignRequest[]; currencyRates: CurrencyRate[] }>
  isProcessing: boolean
  progress: number
  error: string | null
}

export const useExcelWorker = (): UseExcelWorkerReturn => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const workerRef = useRef<Worker | null>(null)

  const getAvailableDates = useCallback((file: File): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      const worker = new Worker(new URL('../workers/excelWorker.ts', import.meta.url), {
        type: 'module',
      })

      worker.onmessage = (e: MessageEvent) => {
        const { type, availableDates, error: workerError } = e.data

        if (type === 'dates') {
          worker.terminate()
          resolve(availableDates || [])
        } else if (type === 'error') {
          worker.terminate()
          reject(new Error(workerError || 'Lỗi xử lý file'))
        }
      }

      worker.onerror = (err) => {
        worker.terminate()
        reject(err)
      }

      const reader = new FileReader()
      reader.onload = () => {
        worker.postMessage({
          type: 'get-dates',
          file: reader.result,
        })
      }
      reader.onerror = () => {
        worker.terminate()
        reject(new Error('Lỗi đọc file'))
      }
      reader.readAsArrayBuffer(file)
    })
  }, [])

  const processFile = useCallback(
    (file: File, selectedDate?: string): Promise<{ data: UpdateCampaignRequest[]; currencyRates: CurrencyRate[] }> => {
      return new Promise((resolve, reject) => {
        setIsProcessing(true)
        setProgress(0)
        setError(null)

        const worker = new Worker(new URL('../workers/excelWorker.ts', import.meta.url), {
          type: 'module',
        })

        workerRef.current = worker

        worker.onmessage = (e: MessageEvent) => {
          const { type, data, error: workerError, progress: workerProgress, currencyRates } = e.data

          if (type === 'progress') {
            setProgress(workerProgress || 0)
          } else if (type === 'success') {
            setIsProcessing(false)
            setProgress(100)
            worker.terminate()
            workerRef.current = null
            resolve({ data, currencyRates })
          } else if (type === 'error') {
            setIsProcessing(false)
            setError(workerError || 'Lỗi xử lý file')
            worker.terminate()
            workerRef.current = null
            reject(new Error(workerError || 'Lỗi xử lý file'))
          } else if (type === 'debug') {
            console.log('debug', data)
            setIsProcessing(false)
            worker.terminate()
            workerRef.current = null
          }
        }

        worker.onerror = (err) => {
          setIsProcessing(false)
          setError('Lỗi khởi tạo worker')
          worker.terminate()
          workerRef.current = null
          reject(err)
        }

        const reader = new FileReader()
        reader.onload = () => {
          worker.postMessage({
            type: 'process',
            file: reader.result,
            selectedDate,
          })
        }
        reader.onerror = () => {
          setIsProcessing(false)
          setError('Lỗi đọc file')
          worker.terminate()
          workerRef.current = null
          reject(new Error('Lỗi đọc file'))
        }
        reader.readAsArrayBuffer(file)
      })
    },
    [],
  )

  return {
    getAvailableDates,
    processFile,
    isProcessing,
    progress,
    error,
  }
}

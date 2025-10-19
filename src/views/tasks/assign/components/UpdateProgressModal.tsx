import { useState } from 'react'
import { Button, Dialog, Input } from '@/components/ui'
import { HiOutlineCheckCircle } from 'react-icons/hi'

interface UpdateProgressModalProps {
  isOpen: boolean
  currentProgress: number
  taskName: string
  onClose: () => void
  onConfirm: (progress: number) => void
  isLoading?: boolean
}

export default function UpdateProgressModal({
  isOpen,
  currentProgress,
  taskName,
  onClose,
  onConfirm,
  isLoading = false,
}: UpdateProgressModalProps) {
  const [progress, setProgress] = useState(currentProgress)
  const [error, setError] = useState('')

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setError('')

    if (value === '') {
      setProgress(0)
      return
    }

    const numValue = parseInt(value)
    if (isNaN(numValue)) {
      setError('Vui lòng nhập số hợp lệ')
      return
    }

    if (numValue < 0) {
      setError('Tiến độ không thể nhỏ hơn 0%')
      return
    }

    if (numValue > 100) {
      setError('Tiến độ không thể lớn hơn 100%')
      return
    }

    setProgress(numValue)
  }

  const handleConfirm = () => {
    if (error) return
    onConfirm(progress)
  }

  const handleClose = () => {
    setProgress(currentProgress)
    setError('')
    onClose()
  }

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} onRequestClose={handleClose} width={500}>
      <div className="p-2">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex justify-center items-center bg-blue-100 rounded-full w-12 h-12">
            <HiOutlineCheckCircle className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">Cập nhật tiến độ</h3>
            <p className="text-gray-500 text-sm line-clamp-1">{taskName}</p>
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700 text-sm">Tiến độ hoàn thành (%)</label>
          <Input
            type="number"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            placeholder="Nhập tiến độ từ 0-100"
            suffix={<span className="text-gray-500">%</span>}
          />
          {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}

          <div className="flex gap-2 mt-3">
            {[0, 25, 50, 75, 100].map((value) => (
              <Button
                key={value}
                size="xs"
                variant={progress === value ? 'solid' : 'plain'}
                onClick={() => {
                  setProgress(value)
                  setError('')
                }}
              >
                {value}%
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="default" onClick={handleClose} disabled={isLoading}>
            Hủy
          </Button>
          <Button variant="solid" onClick={handleConfirm} disabled={error !== '' || isLoading} loading={isLoading}>
            Cập nhật
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

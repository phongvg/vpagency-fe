import { Button, Dialog, Input } from '@/components/ui'
import UpdateFinalUrlMetric from '@/views/tasks/assign/components/UpdateFinalUrlMetric'
import { useGetTaskProgress, useUpdateTaskProgress } from '@/views/tasks/assign/hooks/useTask'
import { FinalURLGroup } from '@/views/tasks/assign/types/task.type'
import { useEffect, useState } from 'react'
import { HiOutlineCheckCircle } from 'react-icons/hi'

type Props = {
  isOpen: boolean
  taskId: string
  onClose: () => void
}

export default function UpdateProgressModal({ isOpen, taskId, onClose }: Props) {
  const [progress, setProgress] = useState(0)
  const [finalUrls, setFinalUrls] = useState<FinalURLGroup[]>([])

  const { data: taskProgressData } = useGetTaskProgress(taskId, isOpen)
  const updateProgressMutation = useUpdateTaskProgress()

  useEffect(() => {
    if (isOpen && taskProgressData) {
      setProgress(taskProgressData.progress)
      setFinalUrls(taskProgressData.finalUrls)
    }
  }, [isOpen, taskProgressData])

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const numValue = parseInt(value)
    setProgress(numValue)
  }

  const handleClose = () => {
    setProgress(0)
    onClose()
  }

  return (
    <>
      <Dialog isOpen={isOpen} width={800} onClose={handleClose} onRequestClose={handleClose}>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex justify-center items-center bg-blue-100 rounded-full w-12 h-12">
            <HiOutlineCheckCircle className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">Cập nhật tiến độ</h3>
            <p className="text-gray-500 text-sm line-clamp-1">{taskProgressData?.name}</p>
          </div>
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700 text-sm">Tiến độ hoàn thành (%)</label>
          <Input
            type="number"
            min={0}
            max={100}
            value={progress}
            placeholder="Nhập tiến độ từ 0-100"
            suffix={<span className="text-gray-500">%</span>}
            onChange={handleProgressChange}
          />

          <div className="flex gap-2 mt-3">
            {[0, 25, 50, 75, 100].map((value) => (
              <Button
                key={value}
                size="xs"
                variant={progress === value ? 'solid' : 'plain'}
                onClick={() => setProgress(value)}
              >
                {value}%
              </Button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <UpdateFinalUrlMetric taskId={taskId} finalUrls={finalUrls} projectId={taskProgressData?.projectId} />
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="default" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="solid" loading={updateProgressMutation.isPending}>
            Cập nhật tiến độ
          </Button>
        </div>
      </Dialog>
    </>
  )
}

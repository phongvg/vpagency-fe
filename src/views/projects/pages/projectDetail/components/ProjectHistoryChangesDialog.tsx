import { Button, Dialog, Timeline } from '@/components/ui'

export default function ProjectHistoryChangesDialog() {
  return (
    <Dialog isOpen={false} width={1400}>
      <h5 className="mb-4">Lịch sử thay đổi</h5>
      <div>
        <Timeline></Timeline>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button type="button">Đóng</Button>
      </div>
    </Dialog>
  )
}

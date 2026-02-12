import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/shared/components/ui/empty";
import { ClipboardList } from "lucide-react";

export default function EmptyTaskDetailPanel() {
  return (
    <div className='flex-1'>
      <div className='flex justify-center items-center p-4 border border-border w-full h-full'>
        <Empty>
          <EmptyHeader className='max-w-full'>
            <EmptyMedia variant='icon'>
              <ClipboardList />
            </EmptyMedia>
            <EmptyTitle>Không tìm thấy công việc</EmptyTitle>
            <EmptyDescription>Công việc bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    </div>
  );
}

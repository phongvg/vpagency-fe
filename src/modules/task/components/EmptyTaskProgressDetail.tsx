import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/shared/components/ui/empty";
import { ClipboardList } from "lucide-react";

export default function EmptyTaskProgressDetail() {
  return (
    <div className='flex-1'>
      <div className='flex justify-center items-center p-4 border border-border w-full h-full'>
        <Empty>
          <EmptyHeader className='max-w-full'>
            <EmptyMedia variant='icon'>
              <ClipboardList />
            </EmptyMedia>
            <EmptyTitle>Không tìm thấy dữ liệu</EmptyTitle>
            <EmptyDescription>Công việc này chưa cập nhật tiến độ.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    </div>
  );
}

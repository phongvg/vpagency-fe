import AppButton from "@/shared/components/common/AppButton";
import type { Role } from "@/shared/constants/role.constant";
import { isAdminOrManager } from "@/shared/utils/permission.util";
import { Eye, SquarePen, Trash2 } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

interface TaskActionButtonProps {
  isCampaignTask: boolean;
  isAppealTask: boolean;
  isDocumentAppealTask: boolean;
  isResearchTask: boolean;
  userRoles: Role[];
  onEdit: () => void;
  onDelete: () => void;
  onViewProgressDetail: () => void;
  onUpdateProgress: () => void;
  onUpdateAppealMetrics: () => void;
  onUpdateDocumentAppealMetrics: () => void;
  onUpdateResearchMetrics: () => void;
}

export default function TaskActionButton({
  isCampaignTask,
  isAppealTask,
  isDocumentAppealTask,
  isResearchTask,
  userRoles,
  onEdit,
  onDelete,
  onViewProgressDetail,
  onUpdateProgress,
  onUpdateAppealMetrics,
  onUpdateDocumentAppealMetrics,
  onUpdateResearchMetrics,
}: TaskActionButtonProps) {
  return (
    <div className='flex items-center gap-2'>
      {isAdminOrManager(userRoles) && (
        <Fragment>
          <AppButton variant='outline' size='sm' onClick={onEdit}>
            <SquarePen />
            Chỉnh sửa
          </AppButton>

          <AppButton variant='outline' size='sm' onClick={onDelete}>
            <Trash2 />
            Xóa
          </AppButton>
        </Fragment>
      )}

      {isCampaignTask && (
        <Fragment>
          <AppButton variant='outline' size='sm' onClick={onViewProgressDetail}>
            <Eye />
            Xem tiến độ
          </AppButton>

          <AppButton variant='outline' size='sm' onClick={onUpdateProgress}>
            <SquarePen />
            Cập nhật tiến độ
          </AppButton>
        </Fragment>
      )}

      {isAppealTask && (
        <AppButton variant='outline' size='sm' onClick={onUpdateAppealMetrics}>
          <SquarePen />
          Thêm mới tiến độ kháng
        </AppButton>
      )}

      {isDocumentAppealTask && (
        <AppButton variant='outline' size='sm' onClick={onUpdateDocumentAppealMetrics}>
          <SquarePen />
          Thêm mới tiến độ kháng giấy
        </AppButton>
      )}

      {isResearchTask && (
        <AppButton variant='outline' size='sm' onClick={onUpdateResearchMetrics}>
          <SquarePen />
          Thêm mới kết quả nghiên cứu
        </AppButton>
      )}
    </div>
  );
}

import { AppButton } from "@/shared/components/common/AppButton";
import type { Role } from "@/shared/constants/role.constant";
import { isAdminOrManager } from "@/shared/utils/permission.util";
import { Icon } from "@iconify/react";
import { Fragment } from "react/jsx-runtime";

interface TaskActionButtonProps {
  isCampaignTask: boolean;
  isAppealTask: boolean;
  isDocumentAppealTask: boolean;
  isResearchTask: boolean;
  userRoles: Role[];
  onEdit: () => void;
}

export default function TaskActionButton({
  isCampaignTask,
  isAppealTask,
  isDocumentAppealTask,
  isResearchTask,
  userRoles,
  onEdit,
}: TaskActionButtonProps) {
  return (
    <div className='flex items-center gap-2'>
      {isAdminOrManager(userRoles) && (
        <Fragment>
          <AppButton variant='outline' size='sm' onClick={onEdit}>
            <Icon icon='solar:pen-linear' />
            Chỉnh sửa
          </AppButton>

          <AppButton variant='outline' size='sm'>
            <Icon icon='tabler:trash' />
            Xóa
          </AppButton>
        </Fragment>
      )}

      {isCampaignTask && (
        <Fragment>
          <AppButton variant='outline' size='sm'>
            <Icon icon='lets-icons:view' />
            Xem tiến độ
          </AppButton>

          <AppButton variant='outline' size='sm'>
            <Icon icon='solar:pen-linear' />
            Cập nhật tiến độ
          </AppButton>
        </Fragment>
      )}

      {isAppealTask && (
        <AppButton variant='outline' size='sm'>
          <Icon icon='solar:pen-linear' />
          Cập nhật tiến độ kháng
        </AppButton>
      )}

      {isDocumentAppealTask && (
        <AppButton variant='outline' size='sm'>
          <Icon icon='solar:pen-linear' />
          Cập nhật tiến độ kháng giấy
        </AppButton>
      )}

      {isResearchTask && (
        <AppButton variant='outline' size='sm'>
          <Icon icon='solar:pen-linear' />
          Cập nhật kết quả nghiên cứu
        </AppButton>
      )}
    </div>
  );
}

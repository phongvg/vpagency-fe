import { AppButton } from "@/shared/components/common/AppButton";
import type { Role } from "@/shared/constants/role.constant";
import { isAdminOrManager } from "@/shared/utils/permission.util";
import { Fragment } from "react/jsx-runtime";

interface TaskActionButtonProps {
  isCampaignTask: boolean;
  isAppealTask: boolean;
  isDocumentAppealTask: boolean;
  isResearchTask: boolean;
  userRoles: Role[];
}

export default function TaskActionButton({ isCampaignTask, isAppealTask, isDocumentAppealTask, isResearchTask, userRoles }: TaskActionButtonProps) {
  return (
    <div className='flex items-center gap-2'>
      {isAdminOrManager(userRoles) && (
        <Fragment>
          <AppButton variant='outline' size='sm'>
            Chỉnh sửa
          </AppButton>

          <AppButton variant='outline' size='sm'>
            Xóa
          </AppButton>
        </Fragment>
      )}

      {isCampaignTask && (
        <Fragment>
          <AppButton variant='outline' size='sm'>
            Xem tiến độ
          </AppButton>

          <AppButton variant='outline' size='sm'>
            Cập nhật tiến độ
          </AppButton>
        </Fragment>
      )}

      {isAppealTask && (
        <AppButton variant='outline' size='sm'>
          Cập nhật tiến độ kháng
        </AppButton>
      )}

      {isDocumentAppealTask && (
        <AppButton variant='outline' size='sm'>
          Cập nhật tiến độ kháng giấy
        </AppButton>
      )}

      {isResearchTask && (
        <AppButton variant='outline' size='sm'>
          Cập nhật kết quả nghiên cứu
        </AppButton>
      )}
    </div>
  );
}

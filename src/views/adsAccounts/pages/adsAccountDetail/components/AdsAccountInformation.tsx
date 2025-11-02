import { AdsAccount } from '@/@types/adsAccount'
import { Breadcrumb, BreadcrumbItem } from '@/components/shared'
import { Avatar, Card } from '@/components/ui'
import { urlConfig } from '@/configs/urls.config'
import { AdsAccountStatusLabels } from '@/enums/adsAccount.enum'
import { formatDate } from '@/helpers/formatDate'
import { formatVietnameseMoney } from '@/helpers/formatVietnameseMoney'

type Props = {
  data: AdsAccount
}

export default function AdsAccountInformation({ data }: Props) {
  const items: BreadcrumbItem[] = [
    { label: 'Danh sách tài khoản Ads', path: urlConfig.adsAccounts },
    { label: (data.uuid || data.gmail || 'Chi tiết') as string },
  ]

  return (
    <>
      <div className="space-y-4">
        <Breadcrumb items={items} showHome={false} />

        <h3 className="font-bold">{data.uuid + ` (#${data.id})`}</h3>

        <div className="gap-4 grid grid-cols-2">
          <Card>
            <div className="flex flex-col xl:justify-between mx-auto 2xl:min-w-[360px] h-full">
              <div className="gap-x-4 gap-y-7 grid grid-cols-1 xl:grid-cols-2">
                <AdsAccountInfoField title="UUID" value={data.uuid} />
                <AdsAccountInfoField title="Gmail" value={data.gmail} />
                <AdsAccountInfoField title="Profile Gen Login" value={data.profileGenLogin} />
                <AdsAccountInfoField title="Mã xác thực 2 bước" value={data.twoFactorCode} />
                <AdsAccountInfoField title="Mật khẩu khôi phục" value={data.recoverPassword} />
                <AdsAccountInfoField title="Trạng thái" value={AdsAccountStatusLabels[data.status]} />
                <AdsAccountInfoField title="Tổng chi tiêu" value={formatVietnameseMoney(data.totalSpent)} />
                <AdsAccountInfoField
                  title="Ngày tạo tài khoản"
                  value={data.createdDate ? formatDate(data.createdDate, 'DD/MM/YYYY') : undefined}
                />
                <AdsAccountInfoField title="Ngày tạo" value={formatDate(data.createdAt, 'DD/MM/YYYY HH:mm')} />
                <AdsAccountInfoField title="Ngày cập nhật" value={formatDate(data.updatedAt, 'DD/MM/YYYY HH:mm')} />
              </div>
            </div>
          </Card>

          {data.manager && (
            <Card>
              <div className="flex flex-col xl:justify-between mx-auto 2xl:min-w-[360px] h-full">
                <div className="flex xl:flex-col items-center gap-4">
                  <Avatar size={120} shape="circle" src={data.manager.avatar || ''} />
                </div>
                <div className="gap-x-4 gap-y-7 grid grid-cols-1 xl:grid-cols-2 mt-8">
                  <AdsAccountInfoField
                    title="Người quản lý"
                    value={`${data.manager?.firstName || ''} ${data.manager?.lastName || ''}`}
                  />
                  <AdsAccountInfoField title="Tên đăng nhập" value={data.manager?.username} />
                  <AdsAccountInfoField title="Email" value={data.manager?.email} />
                </div>
              </div>
            </Card>
          )}

          {data.adsGroup && (
            <Card>
              <div className="flex flex-col xl:justify-between mx-auto 2xl:min-w-[360px] h-full">
                <h4 className="mb-4 font-semibold text-lg">Thông tin nhóm Ads</h4>
                <div className="gap-x-4 gap-y-7 grid grid-cols-1 xl:grid-cols-2">
                  <AdsAccountInfoField title="Tên nhóm" value={data.adsGroup.name} />
                  <AdsAccountInfoField title="Mô tả" value={data.adsGroup.description} />
                  <AdsAccountInfoField title="Ngày tạo" value={formatDate(data.adsGroup.createdAt, 'DD/MM/YYYY')} />
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  )
}

function AdsAccountInfoField({ title, value }: { title: string; value: string | number | undefined | null }) {
  return (
    <div>
      <span>{title}</span>
      <p className="font-semibold text-gray-700">{value || `<${title}>`}</p>
    </div>
  )
}

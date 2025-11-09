import { AdsGroup } from '@/@types/adsGroup'
import { Breadcrumb, BreadcrumbItem } from '@/components/shared'
import { Avatar, Card } from '@/components/ui'
import { urlConfig } from '@/configs/urls.config'
import { formatDate } from '@/helpers/formatDate'
import AdsAccountTable from '@/views/adsGroups/pages/adsGroupDetail/components/AdsAccountTable'

type Props = {
  data: AdsGroup
}

export default function AdsGroupInformation({ data }: Props) {
  const items: BreadcrumbItem[] = [
    { label: 'Danh sách nhóm tài khoản', path: urlConfig.adsGroups },
    { label: data.name },
  ]

  return (
    <>
      <div className="space-y-4">
        <Breadcrumb items={items} showHome={false} />

        <h3 className="font-bold">{data.name + ` (#${data.id})`}</h3>

        <div className="gap-4 grid grid-cols-2">
          <Card>
            <div className="flex flex-col xl:justify-between mx-auto 2xl:min-w-[360px] h-full">
              <div className="gap-x-4 gap-y-7 grid grid-cols-1 xl:grid-cols-2">
                <AdsGroupInfoField title="Tên nhóm" value={data.name} />
                <AdsGroupInfoField title="Mô tả" value={data.description} />
                <AdsGroupInfoField title="Ngày tạo" value={formatDate(data.createdAt, 'DD/MM/YYYY HH:mm')} />
                <AdsGroupInfoField title="Ngày cập nhật" value={formatDate(data.updatedAt, 'DD/MM/YYYY HH:mm')} />
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
                  <AdsGroupInfoField
                    title="Người quản lý"
                    value={`${data.manager?.firstName || ''} ${data.manager?.lastName || ''}`}
                  />
                  <AdsGroupInfoField title="Tên đăng nhập" value={data.manager?.username} />
                  <AdsGroupInfoField title="Email" value={data.manager?.email} />
                </div>
              </div>
            </Card>
          )}

          {data.project && (
            <Card>
              <div className="flex flex-col xl:justify-between mx-auto 2xl:min-w-[360px] h-full">
                <h4 className="mb-4 font-semibold text-lg">Thông tin Dự án</h4>
                <div className="gap-x-4 gap-y-7 grid grid-cols-1 xl:grid-cols-2">
                  <AdsGroupInfoField title="Tên dự án" value={data.project.name} />
                  <AdsGroupInfoField title="Mô tả" value={data.project.description} />
                  <AdsGroupInfoField title="Ngày bắt đầu" value={formatDate(data.project.startedAt, 'DD/MM/YYYY')} />
                  <AdsGroupInfoField title="Deadline" value={formatDate(data.project.deadline, 'DD/MM/YYYY')} />
                </div>
              </div>
            </Card>
          )}
        </div>

        <AdsAccountTable data={data.adsAccounts} />
      </div>
    </>
  )
}

function AdsGroupInfoField({ title, value }: { title: string; value: string | number | undefined | null }) {
  return (
    <div>
      <span>{title}</span>
      <p className="font-semibold text-gray-700">{value || `<${title}>`}</p>
    </div>
  )
}

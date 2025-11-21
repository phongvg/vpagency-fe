import { Breadcrumb, BreadcrumbItem } from '@/components/shared'
import { Avatar, Button, Card } from '@/components/ui'
import { urlConfig } from '@/configs/urls.config'
import { formatDate } from '@/helpers/formatDate'
import ProjectDailyReportsSection from '@/views/projects/pages/projectDetail/components/ProjectDailyReportsSection'
import { Project } from '@/views/projects/types/project.type'
import { HiOutlineDocumentText } from 'react-icons/hi'

type Props = {
  data: Project
}

export default function ProjectInformation({ data }: Props) {
  const items: BreadcrumbItem[] = [{ label: 'Danh sách dự án', path: urlConfig.projects }, { label: data.name }]

  return (
    <>
      <div className="space-y-4">
        <Breadcrumb items={items} showHome={false} />

        <div className="flex justify-between items-center">
          <h3 className="font-bold">{data.name + ` (#${data.id})`}</h3>

          <Button variant="twoTone" icon={<HiOutlineDocumentText />}>
            Lịch sử thay đổi
          </Button>
        </div>

        <div className="gap-4 grid grid-cols-2">
          <Card>
            <div className="flex flex-col xl:justify-between mx-auto 2xl:min-w-[360px] h-full">
              <div className="gap-x-4 gap-y-7 grid grid-cols-1 xl:grid-cols-2">
                <ProjectInfoField title="Loại dự án" value={data.type.name} />
                <ProjectInfoField title="Trạng thái" value={data.status.name} />
                <ProjectInfoField title="Ngày tạo dự án" value={formatDate(data.createdAt, 'DD/MM/YYYY HH:mm')} />
                <ProjectInfoField title="Ngày cập nhật" value={formatDate(data.updatedAt, 'DD/MM/YYYY HH:mm')} />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex flex-col xl:justify-between mx-auto 2xl:min-w-[360px] h-full">
              <div className="flex xl:flex-col items-center gap-4">
                <Avatar size={120} shape="circle" src={data.owner.avatar || ''} />
              </div>
              <div className="gap-x-4 gap-y-7 grid grid-cols-1 xl:grid-cols-2 mt-8">
                <ProjectInfoField
                  title="Tên người phụ trách"
                  value={`${data.owner?.firstName || ''} ${data.owner?.lastName || ''}`}
                />
                <ProjectInfoField title="Tên đăng nhập" value={data.owner?.username} />
                <ProjectInfoField title="Email" value={data.owner?.email} />
              </div>
            </div>
          </Card>
        </div>
        <ProjectDailyReportsSection projectId={data.id} />
      </div>
    </>
  )
}

function ProjectInfoField({ title, value }: { title: string; value: string | number | undefined | null }) {
  return (
    <div>
      <span>{title}</span>
      <p className="font-semibold text-gray-700">{value || `<${title}>`}</p>
    </div>
  )
}

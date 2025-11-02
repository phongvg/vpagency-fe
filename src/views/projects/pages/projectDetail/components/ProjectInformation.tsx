import { Project } from '@/@types/project'
import { Breadcrumb, BreadcrumbItem } from '@/components/shared'
import { Avatar, Card } from '@/components/ui'
import { urlConfig } from '@/configs/urls.config'
import { ProjectStatusLabels, ProjectTypeLabels } from '@/enums/project.enum'
import { formatDate } from '@/helpers/formatDate'
import { formatVietnameseMoney } from '@/helpers/formatVietnameseMoney'
import AdsGroupTable from '@/views/projects/pages/projectDetail/components/AdsGroupTable'
import ProjectDailyReportsSection from '@/views/projects/pages/projectDetail/components/ProjectDailyReportsSection'

type Props = {
  data: Project
}

export default function ProjectInformation({ data }: Props) {
  const items: BreadcrumbItem[] = [{ label: 'Danh sách dự án', path: urlConfig.projects }, { label: data.name }]

  return (
    <>
      <div className="space-y-4">
        <Breadcrumb items={items} showHome={false} />

        <h3 className="font-bold">{data.name + ` (#${data.id})`}</h3>

        <div className="gap-4 grid grid-cols-2">
          <Card>
            <div className="flex flex-col xl:justify-between mx-auto 2xl:min-w-[360px] h-full">
              <div className="gap-x-4 gap-y-7 grid grid-cols-1 xl:grid-cols-2">
                <ProjectInfoField title="Loại dự án" value={ProjectTypeLabels[data.type]} />
                <ProjectInfoField title="Tiêu đề" value={data.title} />
                <ProjectInfoField title="Trạng thái" value={ProjectStatusLabels[data.status]} />
                <ProjectInfoField title="CPC" value={data.cpc} />
                <ProjectInfoField title="Ngày bắt đầu" value={formatDate(data.startedAt, 'DD/MM/YYYY')} />
                <ProjectInfoField title="Deadline" value={formatDate(data.deadline, 'DD/MM/YYYY')} />
                <ProjectInfoField title="Ngày tạo dự án" value={formatDate(data.createdAt, 'DD/MM/YYYY HH:mm')} />
                <ProjectInfoField title="Ngày cập nhật" value={formatDate(data.updatedAt, 'DD/MM/YYYY HH:mm')} />
                <ProjectInfoField title="Tổng ngân sách" value={formatVietnameseMoney(data.totalBudget)} />
                <ProjectInfoField title="Ngân sách còn lại" value={formatVietnameseMoney(data.spentBudget)} />
                <ProjectInfoField title="Nội dung" value={data.content} />
                <ProjectInfoField title="Ghi chú" value={data.note} />
                <ProjectInfoField title="Mô tả" value={data.description} />
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

          <Card>
            <div className="flex flex-col xl:justify-between mx-auto 2xl:min-w-[360px] h-full">
              <div className="gap-x-4 gap-y-7 grid grid-cols-1">
                <ProjectInfoField title="Tình trạng domain" value={data.domainStatus} />
                <ProjectInfoLinkField title="Domain gốc" value={data.originalDomain} />
                <ProjectInfoLinkField title="Ladipage" value={data.originalLadipage} />
                <ProjectInfoLinkField title="URL cuối cùng" value={data.finalURL} />
                <ProjectInfoLinkField title="URL theo dõi" value={data.trackingURL} />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex flex-col xl:justify-between mx-auto 2xl:min-w-[360px] h-full">
              <div className="gap-x-4 gap-y-7 grid grid-cols-1">
                <ProjectInfoListField title="Từ khóa độc quyền" value={data.exclusiveKeywords} />
                <ProjectInfoListField title="Từ khóa bị hạn chế" value={data.rejectedKeywords} />
                <ProjectInfoListField title="Quốc gia" value={data.targetCountries} />
                <ProjectInfoListField title="Quốc gia bị hạn chế" value={data.rejectedCountries} />
                <ProjectInfoListField title="Thiết bị" value={data.devices} />
                <ProjectInfoListField title="Độ tuổi" value={data.ageRanges} />
                <ProjectInfoListField title="Giới tính" value={data.genders} />
              </div>
            </div>
          </Card>
        </div>

        <AdsGroupTable data={data.adsGroups} />

        {/* Project Daily Reports Section */}
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

function ProjectInfoLinkField({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <span>{title}</span>
      <a
        href={value || '#'}
        target="_blank"
        className="block max-w-full font-semibold text-gray-700 hover:text-blue-600 hover:underline truncate"
        rel="noreferrer"
        aria-disabled={!value}
      >
        {value || `<${title}>`}
      </a>
    </div>
  )
}

function ProjectInfoListField({ title, value }: { title: string; value: string[] | undefined | null }) {
  return (
    <div>
      <span>{title}</span>
      <p className="font-semibold text-gray-700">{value?.join(', ') || `<${title}>`}</p>
    </div>
  )
}

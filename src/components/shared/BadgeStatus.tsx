import { Badge } from '@/components/ui'

type Props = {
  content: string
}

const STATUS_COLOR: Record<string, string> = {
  'Đang hoạt động': 'bg-green-50 text-green-500',
  'Ngừng hoạt động': 'bg-red-50 text-red-500',
}

export default function BadgeStatus({ content }: Props) {
  return (
    <Badge className="font-semibold" content={content} innerClass={STATUS_COLOR[content] || 'bg-red-50 text-red-500'} />
  )
}

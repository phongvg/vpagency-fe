import { Badge } from '@/components/ui'

type Props = {
  content: string
}

export default function BadgeStatus({ content }: Props) {
  return <Badge className="font-semibold" content={content} innerClass="bg-red-50 text-red-500" />
}

import { Input } from '@/components/ui'
import { HiOutlineSearch } from 'react-icons/hi'

export default function CampaignSearch() {
  return <Input size="sm" placeholder="Tìm kiếm theo tên..." prefix={<HiOutlineSearch className="text-lg" />} />
}

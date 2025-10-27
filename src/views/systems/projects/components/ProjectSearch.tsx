import { Input } from '@/components/ui'
import { useProjectStore } from '@/views/systems/projects/store/useProjectStore'
import { HiOutlineSearch } from 'react-icons/hi'

export default function ProjectSearch() {
  const { filter, setSearch } = useProjectStore()

  return (
    <Input
      placeholder="Tìm kiếm dự án..."
      size="sm"
      prefix={<HiOutlineSearch className="text-lg" />}
      value={filter.search}
      onChange={(e) => setSearch(e.target.value)}
    />
  )
}

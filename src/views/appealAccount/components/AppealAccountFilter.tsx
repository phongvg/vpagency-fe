import { Button, Input } from '@/components/ui'
import { useDebounce } from '@/hooks/useDebounce'
import { useAppealAccountStore } from '@/views/appealAccount/store/useAppealAccountStore'
import { useEffect, useState } from 'react'
import { HiOutlineFilter } from 'react-icons/hi'

export function AppealAccountFilterPanel() {
  const { filter, setFilter } = useAppealAccountStore()
  const [search, setSearch] = useState(filter.search || '')
  const [email, setEmail] = useState(filter.email || '')
  const [uid, setUid] = useState(filter.uid || '')
  const [appealedBy, setAppealedBy] = useState(filter.appealedBy || '')
  const [usedBy, setUsedBy] = useState(filter.usedBy || '')
  const [appealPlatform, setAppealPlatform] = useState(filter.appealPlatform || '')
  const [rarityLevel, setRarityLevel] = useState(filter.rarityLevel || '')

  const debounceSearch = useDebounce(search, 500)
  const debouncedEmail = useDebounce(email, 500)
  const debouncedUid = useDebounce(uid, 500)
  const debouncedAppealedBy = useDebounce(appealedBy, 500)
  const debouncedUsedBy = useDebounce(usedBy, 500)
  const debouncedAppealPlatform = useDebounce(appealPlatform, 500)
  const debouncedRarityLevel = useDebounce(rarityLevel, 500)

  useEffect(() => {
    setFilter({
      ...filter,
      search: debounceSearch,
      page: 1,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch])

  useEffect(() => {
    setFilter({
      ...filter,
      email: debouncedEmail || undefined,
      page: 1,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedEmail])

  useEffect(() => {
    setFilter({
      ...filter,
      uid: debouncedUid || undefined,
      page: 1,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedUid])

  useEffect(() => {
    setFilter({
      ...filter,
      appealedBy: debouncedAppealedBy || undefined,
      page: 1,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedAppealedBy])

  useEffect(() => {
    setFilter({
      ...filter,
      usedBy: debouncedUsedBy || undefined,
      page: 1,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedUsedBy])

  useEffect(() => {
    setFilter({
      ...filter,
      appealPlatform: debouncedAppealPlatform || undefined,
      page: 1,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedAppealPlatform])

  useEffect(() => {
    setFilter({
      ...filter,
      rarityLevel: debouncedRarityLevel || undefined,
      page: 1,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedRarityLevel])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleUidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUid(e.target.value)
  }

  const handleAppealedByChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppealedBy(e.target.value)
  }

  const handleUsedByChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsedBy(e.target.value)
  }

  const handleAppealPlatformChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppealPlatform(e.target.value)
  }

  const handleRarityLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRarityLevel(e.target.value)
  }

  return (
    <div className="space-y-3 rounded-lg">
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="block mb-1 font-semibold text-sm">Từ khóa</label>
          <Input size="sm" placeholder="Nhập từ khóa..." value={search} onChange={handleSearchChange} />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-sm">Email</label>
          <Input size="sm" placeholder="Nhập email..." value={email} onChange={handleEmailChange} />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-sm">UID</label>
          <Input size="sm" placeholder="Nhập UID..." value={uid} onChange={handleUidChange} />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-sm">Người kháng</label>
          <Input size="sm" placeholder="Nhập người kháng..." value={appealedBy} onChange={handleAppealedByChange} />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-sm">Người sử dụng</label>
          <Input size="sm" placeholder="Nhập người sử dụng..." value={usedBy} onChange={handleUsedByChange} />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-sm">Sàn kháng được</label>
          <Input
            size="sm"
            placeholder="Nhập sàn kháng được..."
            value={appealPlatform}
            onChange={handleAppealPlatformChange}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-sm">Cấp độ hiếm</label>
          <Input size="sm" placeholder="Nhập cấp độ hiếm..." value={rarityLevel} onChange={handleRarityLevelChange} />
        </div>
      </div>
    </div>
  )
}

export default function AppealAccountFilter() {
  const { filter, setFilter } = useAppealAccountStore()
  const [showFilters, setShowFilters] = useState(true)

  const handleClearFilters = () => {
    setFilter({
      ...filter,
      email: undefined,
      uid: undefined,
      appealedBy: undefined,
      usedBy: undefined,
      appealPlatform: undefined,
      rarityLevel: undefined,
      page: 1,
    })
  }

  const hasActiveFilters =
    filter.email || filter.uid || filter.appealedBy || filter.usedBy || filter.appealPlatform || filter.rarityLevel

  return {
    showFilters,
    setShowFilters,
    hasActiveFilters,
    filterButton: (
      <>
        <Button
          size="sm"
          variant={showFilters ? 'solid' : 'twoTone'}
          icon={<HiOutlineFilter />}
          onClick={() => setShowFilters(!showFilters)}
        >
          Bộ lọc
        </Button>
      </>
    ),
  }
}

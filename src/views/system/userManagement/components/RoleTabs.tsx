import { useState } from 'react'
import { Tabs } from '@/components/ui'
import { useUserStore } from '@/views/system/userManagement/store/useUserStore'
import { Role, getRoleLabel, getAllRoles } from '@/enums/role.enum'

interface RoleTabsProps {
  availableRoles?: (Role | 'all')[]
}

export default function RoleTabs({
  availableRoles = ['all', ...getAllRoles()],
}: RoleTabsProps) {
  const { filter, setFilter } = useUserStore()
  const [activeTab, setActiveTab] = useState('all')

  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue)

    const newFilter = {
      ...filter,
      role: tabValue === 'all' ? undefined : (tabValue as Role),
      page: 1,
    }
    setFilter(newFilter)
  }

  const getTabLabel = (role: Role | 'all'): string => {
    if (role === 'all') return 'Tất cả'
    return getRoleLabel(role)
  }

  return (
    <div className="mb-4">
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tabs.TabList>
          {availableRoles.map((role) => (
            <Tabs.TabNav key={role} value={role}>
              {getTabLabel(role)}
            </Tabs.TabNav>
          ))}
        </Tabs.TabList>
      </Tabs>
    </div>
  )
}

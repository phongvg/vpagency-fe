import { Tabs } from '@/components/ui'
import TabList from '@/components/ui/Tabs/TabList'
import TabNav from '@/components/ui/Tabs/TabNav'
import { TaskViewType, TaskViewLabels } from '@/enums/taskView.enum'

interface TaskViewTabsProps {
  activeView: TaskViewType
  onViewChange: (view: TaskViewType) => void
}

export default function TaskViewTabs({ activeView, onViewChange }: TaskViewTabsProps) {
  return (
    <Tabs value={activeView} variant="pill" onChange={(val) => onViewChange(val as TaskViewType)}>
      <TabList>
        {Object.values(TaskViewType).map((view) => (
          <TabNav key={view} value={view}>
            {TaskViewLabels[view]}
          </TabNav>
        ))}
      </TabList>
    </Tabs>
  )
}

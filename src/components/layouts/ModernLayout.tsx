import Header from '@/components/template/Header'
import UserDropdown from '@/components/template/UserDropdown'
import Notification from '@/components/template/Notification'
import SideNavToggle from '@/components/template/SideNavToggle'
import MobileNav from '@/components/template/MobileNav'
import SideNav from '@/components/template/SideNav'
import View from '@/views'

const HeaderActionsStart = () => {
  return (
    <>
      <MobileNav />
      <SideNavToggle />
    </>
  )
}

const HeaderActionsEnd = () => {
  return (
    <>
      <Notification />
      <UserDropdown hoverable={false} />
    </>
  )
}

const ModernLayout = () => {
  return (
    <div className="flex flex-col flex-auto app-layout-modern">
      <div className="flex flex-auto min-w-0">
        <SideNav />
        <div className="relative flex flex-col flex-auto bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 border-l w-full min-w-0 min-h-screen">
          <Header
            className="border-gray-200 dark:border-gray-700 border-b"
            headerEnd={<HeaderActionsEnd />}
            headerStart={<HeaderActionsStart />}
          />
          <View />
        </div>
      </div>
    </div>
  )
}

export default ModernLayout

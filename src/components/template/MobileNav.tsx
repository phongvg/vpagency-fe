import NavToggle from '@/components/shared/NavToggle'
import Logo from '@/components/template/Logo'
import Drawer from '@/components/ui/Drawer'
import ScrollBar from '@/components/ui/ScrollBar'
import navigationConfig from '@/configs/navigation.config'
import {
  DIR_RTL,
  LOGO_X_GUTTER,
  NAV_MODE_DARK,
  NAV_MODE_THEMED,
  NAV_MODE_TRANSPARENT,
} from '@/constants/theme.constant'
import { useAppSelector } from '@/store'
import { useAuthStore } from '@/store/auth/useAuthStore'
import withHeaderItem, { WithHeaderItemProps } from '@/utils/hoc/withHeaderItem'
import useResponsive from '@/utils/hooks/useResponsive'
import classNames from 'classnames'
import { Suspense, lazy, useState } from 'react'

const VerticalMenuContent = lazy(() => import('@/components/template/VerticalMenuContent'))

type MobileNavToggleProps = {
  toggled?: boolean
}

const MobileNavToggle = withHeaderItem<MobileNavToggleProps & WithHeaderItemProps>(NavToggle)

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openDrawer = () => {
    setIsOpen(true)
  }

  const onDrawerClose = () => {
    setIsOpen(false)
  }

  const themeColor = useAppSelector((state) => state.theme.themeColor)
  const primaryColorLevel = useAppSelector((state) => state.theme.primaryColorLevel)
  const navMode = useAppSelector((state) => state.theme.navMode)
  const mode = useAppSelector((state) => state.theme.mode)
  const direction = useAppSelector((state) => state.theme.direction)
  const currentRouteKey = useAppSelector((state) => state.base.common.currentRouteKey)
  const userAuthority = useAuthStore((state) => state.user?.roles) || []

  const { smaller } = useResponsive()

  const navColor = () => {
    if (navMode === NAV_MODE_THEMED) {
      return `bg-${themeColor}-${primaryColorLevel} side-nav-${navMode}`
    }

    if (navMode === NAV_MODE_TRANSPARENT) {
      return `side-nav-${mode}`
    }

    return `side-nav-${navMode}`
  }

  const logoMode = () => {
    if (navMode === NAV_MODE_THEMED) {
      return NAV_MODE_DARK
    }

    if (navMode === NAV_MODE_TRANSPARENT) {
      return mode
    }

    return navMode
  }

  const menuContent = (
    <VerticalMenuContent
      navMode={navMode}
      collapsed={false}
      navigationTree={navigationConfig}
      routeKey={currentRouteKey}
      userAuthority={userAuthority as string[]}
      direction={direction}
      onMenuItemClick={onDrawerClose}
    />
  )

  return (
    <>
      {smaller.md && (
        <>
          <div className="text-2xl" onClick={openDrawer}>
            <MobileNavToggle toggled={isOpen} />
          </div>
          <Drawer
            title=""
            isOpen={isOpen}
            bodyClass={classNames(navColor(), 'p-0')}
            width={330}
            placement={direction === DIR_RTL ? 'right' : 'left'}
            onClose={onDrawerClose}
            onRequestClose={onDrawerClose}
          >
            <div className="flex flex-col pt-4 h-full">
              <div className="hidden lg:block side-nav-header">
                <Logo mode={logoMode()} type="full" className={LOGO_X_GUTTER} />
              </div>

              <div className="flex-1 side-nav-content">
                <ScrollBar autoHide direction={direction}>
                  <Suspense fallback={<></>}>{isOpen && menuContent}</Suspense>
                </ScrollBar>
              </div>
            </div>
          </Drawer>
        </>
      )}
    </>
  )
}

export default MobileNav

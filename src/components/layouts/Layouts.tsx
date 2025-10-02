import { useMemo, lazy, Suspense } from 'react'
import Loading from '@/components/shared/Loading'
import { useAppSelector } from '@/store'
import {
  LAYOUT_TYPE_MODERN,
  LAYOUT_TYPE_BLANK,
} from '@/constants/theme.constant'
import useAuth from '@/utils/hooks/useAuth'
import useDirection from '@/utils/hooks/useDirection'
import useLocale from '@/utils/hooks/useLocale'

const layouts = {
  [LAYOUT_TYPE_MODERN]: lazy(() => import('./ModernLayout')),
  [LAYOUT_TYPE_BLANK]: lazy(() => import('./BlankLayout')),
}

const Layout = () => {
  const layoutType = useAppSelector((state) => state.theme.layout.type)

  const { authenticated } = useAuth()

  useDirection()

  useLocale()

  const AppLayout = useMemo(() => {
    if (authenticated) {
      return layouts[layoutType]
    }
    return lazy(() => import('./AuthLayout'))
  }, [layoutType, authenticated])

  return (
    <Suspense
      fallback={
        <div className="flex flex-col flex-auto h-[100vh]">
          <Loading loading={true} />
        </div>
      }
    >
      <AppLayout />
    </Suspense>
  )
}

export default Layout

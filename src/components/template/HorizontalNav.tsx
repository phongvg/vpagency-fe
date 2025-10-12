import HorizontalMenuContent from './HorizontalMenuContent'
import useResponsive from '@/utils/hooks/useResponsive'
import { useAppSelector } from '@/store'
import { useAuthStore } from '@/store/auth/useAuthStore'

const HorizontalNav = () => {
  const mode = useAppSelector((state) => state.theme.mode)
  const userAuthority = useAuthStore((state) => state.user?.roles) || []

  const { larger } = useResponsive()

  return (
    <>
      {larger.md && (
        <HorizontalMenuContent
          manuVariant={mode}
          userAuthority={userAuthority}
        />
      )}
    </>
  )
}

export default HorizontalNav

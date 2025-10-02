import Side from './Side'
// import Cover from './Cover'
// import Simple from './Simple'
import View from '@/views'
import { useAppSelector } from '@/store'
import { LAYOUT_TYPE_BLANK } from '@/constants/theme.constant'

const AuthLayout = () => {
  const layoutType = useAppSelector((state) => state.theme.layout.type)

  return (
    <div className="flex flex-col flex-auto h-[100vh] app-layout-blank">
      {layoutType === LAYOUT_TYPE_BLANK ? (
        <View />
      ) : (
        <Side>
          <View />
        </Side>
      )}
    </div>
  )
}

export default AuthLayout

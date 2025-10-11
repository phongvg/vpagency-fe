import View from '@/views'

const BlankLayout = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh] app-layout-blank">
      <div className="px-8 w-full max-w-[680px] xl:max-w-[750px]">
        <View />
      </div>
    </div>
  )
}

export default BlankLayout

import { cloneElement } from 'react'
import type { CommonProps } from '@/@types/common'

interface SideProps extends CommonProps {
  content?: React.ReactNode
}

const Side = ({ children, content, ...rest }: SideProps) => {
  return (
    <div className="grid grid-cols-1 h-full">
      <div className="flex flex-col justify-center items-center col-span-1 bg-white dark:bg-gray-800">
        <div className="px-8 w-full max-w-[380px] xl:max-w-[450px]">
          <div className="mb-8">{content}</div>
          {children
            ? cloneElement(children as React.ReactElement, {
                ...rest,
              })
            : null}
        </div>
      </div>
    </div>
  )
}

export default Side

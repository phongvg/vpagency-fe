import { Suspense } from 'react'
import classNames from 'classnames'
import Container from '@/components/shared/Container'
import { PAGE_CONTAINER_GUTTER_X, PAGE_CONTAINER_GUTTER_Y } from '@/constants/theme.constant'
import type { CommonProps } from '@/@types/common'
import type { Meta } from '@/@types/routes'
import type { ElementType, ComponentPropsWithRef } from 'react'
import { HiOutlineViewGrid } from 'react-icons/hi'

export interface PageContainerProps extends CommonProps, Meta {
  contained?: boolean
}

const CustomHeader = <T extends ElementType>({
  header,
  ...props
}: {
  header: T
} & ComponentPropsWithRef<T>) => {
  const Header = header
  return <Header {...props} />
}

const PageContainer = (props: PageContainerProps) => {
  const { pageContainerType = 'default', children, header, contained = false, extraHeader } = props

  return (
    <div className="flex flex-col flex-auto justify-between bg-white mt-4 rounded-[8px] h-full">
      <main className="h-full">
        <div
          className={classNames(
            'page-container relative h-full flex flex-auto flex-col',
            pageContainerType !== 'gutterless' && `${PAGE_CONTAINER_GUTTER_X} ${PAGE_CONTAINER_GUTTER_Y}`,
            pageContainerType === 'contained' && 'container mx-auto',
          )}
        >
          {(header || extraHeader) && (
            <div className={classNames(contained && 'container mx-auto', 'flex items-center justify-between mb-4')}>
              <div>
                {header && typeof header === 'string' && (
                  <div className="flex items-center gap-2">
                    <HiOutlineViewGrid size={28} color="#4F46B5" />
                    <h3 className="font-semibold text-[#2C2C2C] text-[24px]">{header}</h3>
                  </div>
                )}
                <Suspense fallback={<div></div>}>
                  {header && typeof header !== 'string' && <CustomHeader header={header} />}
                </Suspense>
              </div>
              <Suspense fallback={<div></div>}>
                {extraHeader && typeof extraHeader !== 'string' && <CustomHeader header={extraHeader} />}
              </Suspense>
            </div>
          )}
          {pageContainerType === 'contained' ? (
            <Container className="h-full">
              <>{children}</>
            </Container>
          ) : (
            <>{children}</>
          )}
        </div>
      </main>
    </div>
  )
}

export default PageContainer

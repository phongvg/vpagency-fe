import { forwardRef } from 'react'
import classNames from 'classnames'
import type { ComponentPropsWithRef, ElementType } from 'react'

export interface ThProps extends ComponentPropsWithRef<'th'> {
  asElement?: ElementType
  index: number
}

const Th = forwardRef<HTMLTableCellElement, ThProps>((props, ref) => {
  const { asElement: Component = 'th', children, className, index, ...rest } = props

  const thClass = classNames(Component !== 'th' && 'th', 'whitespace-nowrap', index !== 0 && 'min-w-[200px]', className)

  return (
    <Component className={thClass} {...rest} ref={ref}>
      {children}
    </Component>
  )
})

Th.displayName = 'Th'

export default Th

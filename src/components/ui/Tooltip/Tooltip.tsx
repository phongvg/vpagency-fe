import { useState } from 'react'
import classNames from 'classnames'
import { motion, AnimatePresence } from 'framer-motion'
import Arrow from './Arrow'
import type { CommonProps } from '../@types/common'
import type { ArrowPlacement } from './Arrow'
import type { ReactNode } from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  useClick,
} from '@floating-ui/react'

export interface TooltipProps extends CommonProps {
  isOpen?: boolean
  placement?: ArrowPlacement
  title: string | ReactNode
  wrapperClass?: string
  trigger?: 'hover' | 'click'
  maxHeight?: string | number
  scrollable?: boolean
}

const Tooltip = (props: TooltipProps) => {
  const {
    className,
    children,
    isOpen = false,
    placement = 'top',
    title,
    wrapperClass,
    trigger = 'hover',
    maxHeight,
    scrollable = false,
  } = props

  const [tooltipOpen, setTooltipOpen] = useState<boolean>(isOpen)

  const tooltipBackground = 'gray-800'
  const tooltipDarkBackground = 'black'

  const defaultTooltipClass = `tooltip bg-${tooltipBackground} dark:bg-${tooltipDarkBackground}`

  const { refs, floatingStyles, context } = useFloating({
    open: tooltipOpen,
    onOpenChange: setTooltipOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(7),
      flip({
        fallbackAxisSideDirection: 'start',
      }),
      shift(),
    ],
  })

  const hover = useHover(context, { move: false, enabled: trigger === 'hover' })
  const click = useClick(context, { enabled: trigger === 'click' })
  const focus = useFocus(context, { enabled: trigger === 'hover' })
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'tooltip' })

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, click, focus, dismiss, role])

  const contentStyle = {
    ...(maxHeight && { maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight }),
    ...(scrollable && { overflowY: 'auto' as const }),
  }

  return (
    <>
      <span ref={refs.setReference} {...getReferenceProps()} className={classNames('tooltip-wrapper', wrapperClass)}>
        {children}
      </span>
      <FloatingPortal>
        {tooltipOpen && (
          <AnimatePresence>
            <motion.div
              ref={refs.setFloating}
              className={classNames(defaultTooltipClass, className)}
              initial={{
                opacity: 0,
                visibility: 'hidden',
              }}
              animate={
                tooltipOpen
                  ? {
                      opacity: 1,
                      visibility: 'visible',
                    }
                  : {
                      opacity: 0,
                      visibility: 'hidden',
                    }
              }
              transition={{
                duration: 0.15,
                type: 'tween',
              }}
              style={{ ...floatingStyles, ...contentStyle }}
              {...getFloatingProps()}
            >
              <span>{title}</span>
              <Arrow placement={context.placement} color={tooltipBackground} colorDark={tooltipDarkBackground} />
            </motion.div>
          </AnimatePresence>
        )}
      </FloatingPortal>
    </>
  )
}

Tooltip.displayName = 'Tooltip'

export default Tooltip

import { useState, ReactNode, Children, cloneElement, isValidElement } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChevronUp } from 'react-icons/hi'
import classNames from 'classnames'

export interface AccordionItemProps {
  /**
   * Unique key for the accordion item (used in items array)
   */
  key?: string
  /**
   * Item key (used when rendering as children)
   */
  itemKey?: string
  /**
   * Header/title of the accordion item
   */
  title: ReactNode
  /**
   * Content of the accordion item
   */
  children: ReactNode
  /**
   * Custom class name for the item
   */
  className?: string
  /**
   * Custom class name for the header
   */
  headerClassName?: string
  /**
   * Custom class name for the content
   */
  contentClassName?: string
  /**
   * Disable the accordion item
   */
  disabled?: boolean
}

export interface AccordionProps {
  /**
   * Array of accordion items
   */
  items?: AccordionItemProps[]
  /**
   * Children accordion items
   */
  children?: ReactNode
  /**
   * Default active key(s)
   */
  defaultActiveKey?: string | string[]
  /**
   * Controlled active key(s)
   */
  activeKey?: string | string[]
  /**
   * Callback when accordion item is toggled
   */
  onChange?: (key: string | string[]) => void
  /**
   * Allow multiple items to be open at once
   */
  accordion?: boolean
  /**
   * Custom class name
   */
  className?: string
  /**
   * Show border
   */
  bordered?: boolean
  /**
   * Custom expand icon
   */
  expandIcon?: (isActive: boolean) => ReactNode
}

const AccordionItem = ({
  itemKey,
  title,
  children,
  isActive = true,
  onToggle,
  className,
  headerClassName,
  contentClassName,
  disabled,
  expandIcon,
}: AccordionItemProps & {
  itemKey: string
  isActive?: boolean
  onToggle?: (key: string) => void
  expandIcon?: (isActive: boolean) => ReactNode
}) => {
  const handleToggle = () => {
    if (!disabled) {
      onToggle?.(itemKey)
    }
  }

  return (
    <div className={classNames('accordion-item', className)}>
      <button
        type="button"
        className={classNames(
          'accordion-header w-full flex items-center justify-between pb-4 text-left transition-colors',
          {
            'cursor-not-allowed opacity-50': disabled,
          },
          headerClassName,
        )}
        onClick={handleToggle}
        disabled={disabled}
      >
        <span className="font-bold text-md">{title}</span>
        <span
          className={classNames('accordion-icon transition-transform duration-200', {
            'rotate-180': isActive,
          })}
        >
          {expandIcon ? expandIcon(isActive) : <HiChevronUp size={20} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className={classNames('accordion-content pb-4', contentClassName)}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Accordion({
  items = [],
  children,
  defaultActiveKey,
  activeKey: controlledActiveKey,
  onChange,
  accordion = true,
  className,
  bordered = true,
  expandIcon,
}: AccordionProps) {
  const [internalActiveKey, setInternalActiveKey] = useState<string | string[]>(() => {
    if (defaultActiveKey !== undefined) {
      return defaultActiveKey
    }
    return accordion ? '' : []
  })

  const activeKey = controlledActiveKey !== undefined ? controlledActiveKey : internalActiveKey

  const handleToggle = (key: string) => {
    let newActiveKey: string | string[]

    if (accordion) {
      newActiveKey = activeKey === key ? '' : key
    } else {
      const activeKeys = Array.isArray(activeKey) ? activeKey : []
      if (activeKeys.includes(key)) {
        newActiveKey = activeKeys.filter((k) => k !== key)
      } else {
        newActiveKey = [...activeKeys, key]
      }
    }

    if (controlledActiveKey === undefined) {
      setInternalActiveKey(newActiveKey)
    }

    onChange?.(newActiveKey)
  }

  const isActive = (key: string): boolean => {
    if (accordion) {
      return activeKey === key
    }
    return Array.isArray(activeKey) && activeKey.includes(key)
  }

  const renderItems = () => {
    if (items.length > 0) {
      return items.map((item) => {
        const itemKey = item.key || item.itemKey

        if (!itemKey) return null

        return (
          <AccordionItem
            key={itemKey}
            itemKey={itemKey}
            title={item.title}
            isActive={isActive(itemKey)}
            onToggle={handleToggle}
            className={item.className}
            headerClassName={item.headerClassName}
            contentClassName={item.contentClassName}
            disabled={item.disabled}
            expandIcon={expandIcon}
          >
            {item.children}
          </AccordionItem>
        )
      })
    }

    // Support children API
    return Children.map(children, (child) => {
      if (isValidElement(child) && child.props.itemKey) {
        return cloneElement(child as any, {
          isActive: isActive(child.props.itemKey),
          onToggle: handleToggle,
          expandIcon,
        })
      }
      return child
    })
  }

  return (
    <div
      className={classNames(
        'accordion',
        {
          'overflow-hidden': bordered,
        },
        className,
      )}
    >
      {renderItems()}
    </div>
  )
}

Accordion.Item = AccordionItem

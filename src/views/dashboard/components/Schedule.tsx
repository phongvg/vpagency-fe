import { useState } from 'react'
import classNames from 'classnames'
import Card from '@/components/ui/Card'
import Calendar from '@/components/ui/Calendar'
import Badge from '@/components/ui/Badge'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { HiVideoCamera, HiDocumentText, HiChatAlt2 } from 'react-icons/hi'
import 'dayjs/locale/vi'

const isToday = (someDate: Date) => {
  const today = new Date()
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  )
}

const EventIcon = ({ type }: { type: string }) => {
  const baseClass = 'rounded-lg h-10 w-10 text-lg flex items-center justify-center'

  switch (type) {
    case 'meeting':
      return (
        <div
          className={classNames(baseClass, 'text-indigo-600 bg-indigo-100 dark:text-indigo-100 dark:bg-indigo-500/20')}
        >
          <HiVideoCamera />
        </div>
      )
    case 'task':
      return (
        <div
          className={classNames(
            baseClass,
            'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100',
          )}
        >
          <HiDocumentText />
        </div>
      )
    case 'workshop':
      return (
        <div className={classNames(baseClass, 'text-amber-600 bg-amber-100 dark:text-amber-100 dark:bg-amber-500/20')}>
          <HiChatAlt2 />
        </div>
      )
    default:
      return null
  }
}

const Schedule = () => {
  const [value, setValue] = useState<Date | null>()

  const { textTheme } = useThemeClass()

  return (
    <Card className="mb-4">
      <div className="mx-auto max-w-[420px]">
        <Calendar
          value={value}
          locale="vi"
          dayClassName={(date, { selected }) => {
            const defaultClass = 'text-base'

            if (isToday(date) && !selected) {
              return classNames(defaultClass, textTheme)
            }

            if (selected) {
              return classNames(defaultClass, 'text-white')
            }

            return defaultClass
          }}
          dayStyle={() => {
            return { height: 48 }
          }}
          renderDay={(date) => {
            const day = date.getDate()

            if (!isToday(date)) {
              return <span>{day}</span>
            }

            return (
              <span className="relative flex justify-center items-center w-full h-full">
                {day}
                <Badge className="bottom-1 absolute" innerClass="h-1 w-1" />
              </span>
            )
          }}
          onChange={(val) => {
            setValue(val)
          }}
        />
      </div>
    </Card>
  )
}

export default Schedule

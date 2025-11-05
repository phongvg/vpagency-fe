import { useState } from 'react'
import classNames from 'classnames'
import Card from '@/components/ui/Card'
import Calendar from '@/components/ui/Calendar'
import Badge from '@/components/ui/Badge'
import useThemeClass from '@/utils/hooks/useThemeClass'
import 'dayjs/locale/vi'

const isToday = (someDate: Date) => {
  const today = new Date()
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  )
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

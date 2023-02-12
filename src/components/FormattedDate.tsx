import type { DetailedHTMLProps, TimeHTMLAttributes } from 'react'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

export function FormattedDate({
  date,
  ...props
}: DetailedHTMLProps<TimeHTMLAttributes<HTMLTimeElement>, HTMLTimeElement> & {
  date: Date
}) {
  return (
    <time dateTime={date.toISOString()} {...props}>
      {dateFormatter.format(date)}
    </time>
  )
}

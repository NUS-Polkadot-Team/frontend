import type { DetailedHTMLProps, TimeHTMLAttributes } from 'react';

export const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

interface FormattedDateProps
  extends DetailedHTMLProps<
    TimeHTMLAttributes<HTMLTimeElement>,
    HTMLTimeElement
  > {
  date: Date;
  text: string;
}

export function FormattedDate({ date, text, ...props }: FormattedDateProps) {
  return (
    <time dateTime={date.toISOString()} {...props}>
      <span>{text}</span>
      {dateFormatter.format(date)}
    </time>
  );
}

import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { buildTimeString, hoursMinutesFromString } from '../util/time'

const DateTimeWidget: FC<any> = ({ className }) => {
  const [date, setDate] = useState(new Date().toDateString())
  const [time, setTime] = useState(buildTimeString(new Date().getHours(), new Date().getMinutes()))

  useEffect(() => {
    setInterval(() => {
      const newDate = new Date()
      const [, minutes] = hoursMinutesFromString(time)
      if (newDate.getMinutes() === minutes) return

      setDate(newDate.toDateString())
      setTime(buildTimeString(newDate.getHours(), newDate.getMinutes()))
    }, 1000)
  })

  return (
    <Wrapper className={className}>
      <div>{ date }</div>
      <div>{ time }</div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

export default DateTimeWidget

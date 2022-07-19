import { FC } from 'react'
import styled from 'styled-components'

import DateTimeWidget from './DateTimeWidget'

const TaskBar: FC<any> = () => {
  return (
    <TaskBarWrapper>
      <div>Start</div>
      <div>ActiveApps</div>
      <StyledDateTimeWidget />
    </TaskBarWrapper>
  )
}

const StyledDateTimeWidget = styled(DateTimeWidget)`
  flex-shrink: 0;
`

const TaskBarWrapper = styled.div`
  height: 50px;
  background-color: #333;
  width: 100vw;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 10px;
  color: white;
`

export default TaskBar

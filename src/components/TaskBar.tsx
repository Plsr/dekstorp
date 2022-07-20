import { FC } from 'react'
import styled from 'styled-components'

import DateTimeWidget from './DateTimeWidget'
import ActiveTaskBarApp from './ActiveTaskBarApp'

const TaskBar: FC<TaksBarProps> = ({ activeApps }) => {
  return (
    <TaskBarWrapper>
      <StartButton><span>Start</span></StartButton>
      <ActiveAppsWrapper>
        <StyledActiveTaksBarApp name="test" />
      </ActiveAppsWrapper>
      <StyledDateTimeWidget />
    </TaskBarWrapper>
  )
}

const StyledActiveTaksBarApp = styled(ActiveTaskBarApp)`
  flex-basis: 150px;
`

const StartButton = styled.div`
  padding: 0rem 1rem;
  display: flex;
  align-items: center;
  background-color: #6daa84;
  cursor: pointer;
`

const ActiveAppsWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  background-color: #d5e5db;
  color: #333;
`

const StyledDateTimeWidget = styled(DateTimeWidget)`
  flex-shrink: 0;
  font-size: 0.8rem;
  background-color: #1c2620;
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
  color: white;
`

interface TaksBarProps {
  activeApps?: string[]
}


export default TaskBar

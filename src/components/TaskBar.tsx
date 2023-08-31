import styled from 'styled-components'
import DateTimeWidget from './DateTimeWidget'
import { OsApplication } from '../hooks/useApplicationManager'
import { useApplicationManager } from '../hooks/useApplicationManager'
import clsx from 'clsx'

const TaskBar = () => {
  const { appConfigs, maximizeApp, openApps } = useApplicationManager()

  const handleAppClick = (candidateApp: OsApplication) => {
    maximizeApp(candidateApp.name)
  }

  return (
    <TaskBarWrapper>
      <StartButton>
        <span>Start</span>
      </StartButton>
      <div className="flex flex-1 bg-gray-200 gap-x-2 px-2 py-1">
        {Object.values(appConfigs).map((app) => (
          <div
            className={clsx(
              ' flex basis-[150px] text-gray-800 items-center justify-start bg-gray-50 text-sm px-2 rounded-lg',
              openApps[0] === app.name && 'shadow-inner font-bold',
              openApps[0] !== app.name && 'shadow',
            )}
            onClick={() => handleAppClick(app)}>
            {app.name}
          </div>
        ))}
      </div>
      <StyledDateTimeWidget />
    </TaskBarWrapper>
  )
}

const StartButton = styled.div`
  padding: 0rem 1rem;
  display: flex;
  align-items: center;
  background-color: #616ae8;
  cursor: pointer;
`

const StyledDateTimeWidget = styled(DateTimeWidget)`
  flex-shrink: 0;
  font-size: 0.8rem;
  color: #131d3d;
  background-color: #cae1e3;
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
  cursor: pointer;
`

export default TaskBar

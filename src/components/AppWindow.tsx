import { FC, useContext, DragEvent } from 'react'
import styled from 'styled-components'
import { MdMinimize, MdClose } from "react-icons/md";
import Draggable from 'react-draggable';

import { App, AppsContext } from '../context/AppsContext'

const AppWindow: FC<AppWindowProps> = ({ app, className }) => {
  const { name, dimensions, component } = app
  const { apps, setApps } = useContext(AppsContext)

  const handleCloseClick = () => {
    const appsWithoutCurrent = apps.filter(app => app.name !== name)
    setApps(appsWithoutCurrent)
  }

  const handleMimimizeClick = () => {
    const appIndex = apps.findIndex(app => app.name === name)
    const appsCopy = [...apps]
    appsCopy[appIndex].minimized = true
    setApps(appsCopy)
  }

  const disableDrag = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <Draggable bounds="parent">
      <Window width={dimensions.width} height={dimensions.height} className={className}>
        <TitleBar>
          <TitleBarButton onClick={handleMimimizeClick}><MdMinimize /></TitleBarButton>
          <TitleBarButton onClick={handleCloseClick}><MdClose /></TitleBarButton>
        </TitleBar>
        <Content
          draggable
          onDragStart={disableDrag}
        >
        {component}
        </Content>
      </Window>
    </Draggable>
  )
}
const TitleBar = styled.div`
  height: 30px;
  width: 100%;
  background-color: #999;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0 .5rem;
`

const Content = styled.div`
  width: 100%;
  height: 100%;
`

const TitleBarButton = styled.div`
  cursor: pointer;
`

const Window = styled.div<{ width: number, height: number }>`
  width: ${props => props.width + 'px'};
  height: ${props => props.height + 'px'};
  background-color: white;
  position: absolute;
  pointer-events: auto;
`

interface AppWindowProps {
  app: App
  className?: string
}

export default AppWindow

import { FC, useContext, DragEvent } from 'react'
import styled from 'styled-components'
import { useDrag } from 'react-dnd'
import { MdMinimize, MdClose } from "react-icons/md";

import { App, AppsContext } from '../context/AppsContext'

const AppWindow: FC<AppWindowProps> = ({ app }) => {
  const { id, left, top, name, dimensions, component } = app
  const { apps, setApps } = useContext(AppsContext)

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'foo',
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top],
  )

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

  if (isDragging) {
    return <div ref={drag} />
  }

  return (
    <Window width={dimensions.width} height={dimensions.height} left={left} top={top} ref={drag} >
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

const Window = styled.div<{ width: number, height: number, left: number, top: number }>`
  width: ${props => props.width + 'px'};
  height: ${props => props.height + 'px'};
  background-color: white;
  position: absolute;
  pointer-events: auto;
  left: ${props => props.left + 'px'};
  top: ${props => props.top + 'px'};
`

interface AppWindowProps {
  app: App
}

export default AppWindow

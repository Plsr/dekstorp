import { DragEvent, useRef, useState } from 'react'
import styled from 'styled-components'
import { MdMinimize, MdClose } from 'react-icons/md'
import Draggable from 'react-draggable'

import React from 'react'
import { useAtom } from 'jotai'
import { OsApplication, appsAtom } from '../App'

const AppWindow = ({ app, className }: AppWindowProps) => {
  const { left, top, name, dimensions, component } = app
  const [apps, setApps] = useAtom(appsAtom)
  const windowRef = useRef(null)
  const [shouldClose, setShouldClose] = useState(false)

  // TODO: Implement later with better soltuion for window storage state
  const handleTitleBarClick = () => {
    console.log('title bar clicked')
    // console.log(apps)
    // console.log(app)
    // if (apps[0].name === name) {
    //   return
    // }

    // const appIndex = apps.findIndex((app) => app.name === name)
    // const appsCopy = [...apps]
    // appsCopy.splice(appIndex, 1)
    // setApps([app, ...appsCopy])
    // console.log(apps)
  }

  const handleCloseClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    setShouldClose(true)
  }

  const handleMimimizeClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    const dimensions = (
      windowRef.current! as HTMLElement
    ).getBoundingClientRect()
    const appIndex = apps.findIndex((app) => app.name === name)
    const appsCopy = [...apps]
    appsCopy[appIndex] = {
      ...appsCopy[appIndex],
      minimized: true,
      left: dimensions.x,
      top: dimensions.y,
    }
    setApps(appsCopy)
  }

  const disableDrag = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleCloseConfirm = () => {
    const appsWithoutCurrent = apps.filter((app) => app.name !== name)
    setApps(appsWithoutCurrent)
  }

  return (
    <Draggable
      bounds="parent"
      defaultPosition={{ x: left, y: top }}
      handle=".handle">
      <Window
        width={dimensions.width}
        height={dimensions.height}
        index={apps.findIndex((app) => app.name === name)}
        className={className}
        ref={windowRef}>
        <TitleBar className="handle" onClick={handleTitleBarClick}>
          <TitleBarTitle>{name}</TitleBarTitle>
          <TitleBarControls>
            <TitleBarButton onClick={handleMimimizeClick}>
              <MdMinimize />
            </TitleBarButton>
            <TitleBarButton onClick={handleCloseClick}>
              <MdClose />
            </TitleBarButton>
          </TitleBarControls>
        </TitleBar>
        <Content draggable onDragStart={disableDrag}>
          {React.createElement(component, {
            shouldClose: shouldClose,
            onCloseConfirm: handleCloseConfirm,
          })}
        </Content>
      </Window>
    </Draggable>
  )
}

// TODO: Convert to tailwind
const TitleBar = styled.div`
  height: 40px;
  width: 100%;
  background-color: #2d383d;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
  border-radius: 8px 8px 0px 0px;
  color: #e6f0f5;
`

const TitleBarControls = styled.div`
  display: flex;
  flex-direction: row;
  width: 40px;
  justify-content: space-between;
`

const TitleBarTitle = styled.p`
  flex-grow: 1;
  text-align: center;
  margin-left: 40px; // Make up for controls
  color: #e6f0f5;
  font-size: 0.875rem;
  cursor: default;
`

const Content = styled.div`
  width: 100%;
  height: 100%;
`

const TitleBarButton = styled.div`
  cursor: pointer;
`

const Window = styled.div<{ width: number; height: number; index: number }>`
  width: ${(props) => props.width + 'px'};
  height: ${(props) => props.height + 'px'};
  z-index: ${(props) => props.index};
  background-color: white;
  border-radius: 8px;
  position: absolute;
  pointer-events: auto;
  box-shadow: 0.9px 1px 5.4px rgba(0, 0, 0, 0.02),
    2.1px 2.3px 12.9px rgba(0, 0, 0, 0.028),
    3.9px 4.4px 24.3px rgba(0, 0, 0, 0.035),
    6.9px 7.8px 43.3px rgba(0, 0, 0, 0.042),
    13px 14.6px 81px rgba(0, 0, 0, 0.05), 31px 35px 194px rgba(0, 0, 0, 0.07);
  overflow: hidden;
`

type AppWindowProps = {
  app: OsApplication
  className?: string
}

export default AppWindow

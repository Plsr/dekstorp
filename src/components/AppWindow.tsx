import { DragEvent, useRef, useState } from 'react'
import styled from 'styled-components'
import { MdMinimize, MdClose } from 'react-icons/md'
import Draggable from 'react-draggable'

import React from 'react'
import {
  OsApplication,
  useApplicationManager,
} from '../hooks/useApplicationManager'

const AppWindow = ({ app, className }: AppWindowProps) => {
  const { left, top, name, dimensions, component } = app
  const { setAppActive, minimizeApp, closeApp, openApps } =
    useApplicationManager()
  const windowRef = useRef(null)
  const [shouldClose, setShouldClose] = useState(false)

  const isActive = openApps[0] === name

  const handleTitleBarClick = () => {
    if (isActive) {
      return
    }

    setAppActive(name)
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

    minimizeApp({ name, dimensions })
  }

  const disableDrag = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleCloseConfirm = () => {
    closeApp(name)
  }

  const handleAppWindowClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isActive) {
      return
    }

    setAppActive(name)
  }

  return (
    <Draggable
      bounds="parent"
      defaultPosition={{ x: left, y: top }}
      handle=".handle">
      <Window
        width={dimensions.width}
        height={dimensions.height}
        index={
          openApps.length - openApps.findIndex((appName) => appName === name)
        }
        className={className}
        ref={windowRef}>
        <TitleBar className="handle" onMouseDown={handleTitleBarClick}>
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
        <Content
          draggable
          onDragStart={disableDrag}
          onClick={handleAppWindowClick}>
          {!isActive && (
            <div
              className="absolute"
              style={{
                width: `${dimensions.width}px`,
                height: `${dimensions.height}px`,
              }}
            />
          )}
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

const Content = styled.div`
  width: 100%;
  height: 100%;
`

const TitleBarTitle = styled.p`
  flex-grow: 1;
  text-align: center;
  margin-left: 40px; // Make up for controls
  color: #e6f0f5;
  font-size: 0.875rem;
  cursor: default;
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

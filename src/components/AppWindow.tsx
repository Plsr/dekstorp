import { FC, useContext } from 'react'
import styled from 'styled-components'
import { useDrag } from 'react-dnd'

import { AppsContext } from '../context/AppsContext'

const AppWindow: FC<AppWindowProps> = ({ name, dimensions, id, left, top }) => {
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

  if (isDragging) {
    return <div ref={drag} />
  }

  return (
    <Window width={dimensions.width} height={dimensions.height} left={left} top={top} ref={drag} >
      <TitleBar><CloseButton onClick={handleCloseClick}>X</CloseButton></TitleBar>
      <Content>{ name }</Content>
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

`

const CloseButton = styled.div`
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
  name: string,
  dimensions: { width: number, height: number },
  id: string,
  left: number,
  top: number
}

export default AppWindow

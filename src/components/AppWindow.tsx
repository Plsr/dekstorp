import { FC, useContext } from 'react'
import styled from 'styled-components'

import { AppsContext } from '../context/AppsContext'

const AppWindow: FC<AppWindowProps> = ({ name, dimensions }) => {
  const { apps, setApps } = useContext(AppsContext)

  const handleCloseClick = () => {
    const appsWithoutCurrent = apps.filter(app => app.name !== name)
    setApps(appsWithoutCurrent)
  }

  return (
    <Window width={dimensions.width} height={dimensions.height}>
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

const Window = styled.div<{ width: number, height: number}>`
  width: ${props => props.width + 'px'};
  height: ${props => props.height + 'px'};
  background-color: white;
  position: absolute;
`

interface AppWindowProps {
  name: string,
  dimensions: { width: number, height: number}
}

export default AppWindow

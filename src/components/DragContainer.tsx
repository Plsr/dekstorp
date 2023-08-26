import { FC } from 'react'
import styled from 'styled-components'
import AppWindow from './AppWindow'
import { useApplicationManager } from '../hooks/useApplicationManager'

const DragContainer: FC<any> = ({ children }) => {
  const apps = useApplicationManager().activeApplications

  return (
    <Wrapper>
      {apps
        .filter((app) => !app.minimized)
        .map((app) => (
          <AppWindow key={app.id} app={app} />
        ))}
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: rgb(253, 235, 255);
  background: linear-gradient(
    167deg,
    rgba(253, 235, 255, 1) 0%,
    rgba(210, 247, 255, 1) 100%
  );
  width: 100vw;
  height: calc(100vh - 50px);
  position: absolute;
  top: 0;
`

export default DragContainer

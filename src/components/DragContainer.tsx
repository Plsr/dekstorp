import { FC, useCallback, useContext } from 'react'
import styled from 'styled-components'
import type { XYCoord } from 'react-dnd'
import { useDrop } from 'react-dnd'
import { AppsContext } from '../context/AppsContext'
import AppWindow from './AppWindow'

const DragContainer: FC<any> = ({ children }) => {
  const { apps, setApps } = useContext(AppsContext)

  const moveApp = useCallback((id: string, left: number, top: number) => {
    const updatedApps = [...apps]
    const updateIndex = updatedApps.findIndex(app => app.id === id)
    updatedApps[updateIndex] = {
      ...updatedApps[updateIndex],
      left,
      top
    }
    setApps(updatedApps)
  }, [apps, setApps])

  const [, drop] = useDrop(
    () => ({
      accept: 'foo',
      drop(item: any, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord
        const left = Math.round(item.left + delta.x)
        const top = Math.round(item.top + delta.y)
        moveApp(item.id, left, top)
        return undefined
      },
    }),
    [moveApp],
  )


  return (
    <Wrapper ref={drop}>
      { apps.filter(app => !app.minimized).map(app => (
        <AppWindow key={app.id} app={app} />
      ))}
      { children }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: rgba(31,211,100, 0.2);
  width: 100vw;
  height: calc(100vh - 50px);
  position: absolute;
  top: 0;
`

export default DragContainer

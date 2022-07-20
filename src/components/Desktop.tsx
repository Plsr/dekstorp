import { FC } from 'react'

import DesktopApps from './DesktopApps'
import TaskBar from './TaskBar'
import DragContainer from './DragContainer'

const Desktop: FC<any> = () => {
  return (
    <div>
      <DragContainer>
        <DesktopApps />
      </DragContainer>
      <TaskBar />
    </div>
  )
}

export default Desktop

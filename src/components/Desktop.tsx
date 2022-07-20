import { FC } from 'react'
import DesktopApps from './DesktopApps'
import TaskBar from './TaskBar'

const Desktop: FC<any> = () => {
  return (
    <div>
      <DesktopApps />
      <TaskBar />
    </div>
  )
}

export default Desktop

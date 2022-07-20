import { FC, useContext } from 'react'

import { AppsContext } from '../context/AppsContext'

import DesktopApps from './DesktopApps'
import TaskBar from './TaskBar'
import AppWindow from './AppWindow'

const Desktop: FC<any> = () => {
  const { apps } = useContext(AppsContext)

  return (
    <div>
      <DesktopApps />
      { apps.map(app => (
        <AppWindow name={app.name} dimensions={app.dimensions} />
      ))}
      <TaskBar />
    </div>
  )
}

export default Desktop

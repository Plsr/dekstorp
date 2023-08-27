import { FC } from 'react'

import { availableApps } from '../util/appDirectory'
import DesktopApp from './DesktopApp'
import { OsApplication } from '../hooks/useApplicationManager'
import { useApplicationManager } from '../hooks/useApplicationManager'

const DesktopApps: FC<any> = () => {
  const { launchApp } = useApplicationManager()

  const handleDoubleClick = (clickedApp: OsApplication) => {
    launchApp(clickedApp)
  }

  return (
    <div>
      {availableApps.map((app) => (
        <DesktopApp
          key={app.name}
          name={app.name}
          onAppDoubleClick={() => handleDoubleClick(app)}
          iconName={app.icon}
        />
      ))}
    </div>
  )
}

export default DesktopApps

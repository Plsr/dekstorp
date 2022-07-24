import { FC, useContext } from 'react'

import { AppsContext, App } from '../context/AppsContext'
import { availableApps } from '../util/appDirectory'
import DesktopApp from './DesktopApp'

const DesktopApps: FC<any> = () => {
  const { apps, setApps } = useContext(AppsContext)

  const handleDoubleClick = (clickedApp: App) => {
    if(apps.map(app => app.id).includes(clickedApp.id)) return

    setApps([
      ...apps,
      clickedApp
    ])
  }

  return (
    <div>
      { availableApps.map(app => <DesktopApp name={app.name} onAppDoubleClick={() => handleDoubleClick(app)} />)}
    </div>
  )
}

export default DesktopApps

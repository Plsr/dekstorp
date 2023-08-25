import { FC } from 'react'

import { availableApps } from '../util/appDirectory'
import DesktopApp from './DesktopApp'
import { useAtom } from 'jotai'
import { OsApplication, appsAtom } from '../App'

const DesktopApps: FC<any> = () => {
  const [apps, setApps] = useAtom(appsAtom)
  console.log(apps)

  const handleDoubleClick = (clickedApp: OsApplication) => {
    if (apps.map((app) => app.id).includes(clickedApp.id)) return

    setApps([...apps, clickedApp])
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

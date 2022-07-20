import { FC, useContext } from 'react'

import { AppsContext } from '../context/AppsContext'
import DesktopApp from './DesktopApp'

const DesktopApps: FC<any> = () => {
  const { apps, setApps } = useContext(AppsContext)

  const handleDoubleClick = (appName: string) => {
    if(apps.map(app => app.name).includes(appName)) return

    setApps([...apps, { name: appName} ])
  }

  return (
    <div>
      <DesktopApp name="calculator" onAppDoubleClick={() => handleDoubleClick('calculator')} />
    </div>
  )
}

export default DesktopApps

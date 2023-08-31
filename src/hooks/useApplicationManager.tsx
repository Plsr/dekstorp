import { atom, useAtom } from 'jotai'
import { FunctionComponent } from 'react'
import { GenericAppProps } from '../types/genericAppProps'

const openAppsAtom = atom<string[]>([])
const appConfigsAtom = atom<{ [key: string]: OsApplication }>({})

export const appsAtom = atom<OsApplication[]>([])

export const useApplicationManager = () => {
  const [appConfigs, setAppConfigs] = useAtom(appConfigsAtom)
  const [openApps, setOpenApps] = useAtom(openAppsAtom)

  const setAppActive = (name: string) => {
    const appIndex = openApps.findIndex((appName) => appName === name)
    const openAppsCopy = [...openApps]
    openAppsCopy.splice(appIndex, 1)
    openAppsCopy.unshift(openApps[appIndex])
    setOpenApps(openAppsCopy)
  }

  const minimizeApp = ({
    name,
    dimensions,
  }: {
    name: string
    dimensions: { x: number; y: number }
  }) => {
    setAppConfigs(
      _updateAppConfig({
        name,
        updateFields: {
          left: dimensions.x,
          top: dimensions.y,
          minimized: true,
        },
      }),
    )

    const appIndex = openApps.findIndex((appName) => appName === name)
    const openAppsCopy = [...openApps]
    openAppsCopy.splice(appIndex, 1)
    setOpenApps([...openAppsCopy, name])
  }

  const closeApp = (name: string) => {
    const appConfigsCopy = { ...appConfigs }
    delete appConfigsCopy[name]
    setAppConfigs(appConfigsCopy)
    const appIndex = openApps.findIndex((appName) => appName === name)
    const openAppsCopy = [...openApps]
    openAppsCopy.splice(appIndex, 1)
    setOpenApps(openAppsCopy)
  }

  const launchApp = (app: OsApplication) => {
    if (appConfigs[app.name]) {
      return
    }

    const appConfigsCopy = {
      ...appConfigs,
      [app.name]: app,
    }

    setAppConfigs(appConfigsCopy)
    setOpenApps([app.name, ...openApps])
  }

  const maximizeApp = (name: string) => {
    setAppConfigs(
      _updateAppConfig({ name, updateFields: { minimized: false } }),
    )
    const appIndex = openApps.findIndex((appName) => appName === name)
    const openAppsCopy = [...openApps]
    openAppsCopy.splice(appIndex, 1)
    setOpenApps([name, ...openAppsCopy])
  }

  const _updateAppConfig = ({
    name,
    updateFields,
  }: {
    name: string
    updateFields: Partial<OsApplication>
  }) => {
    return {
      ...appConfigs,
      [name]: {
        ...appConfigs[name],
        ...updateFields,
      },
    }
  }

  return {
    appConfigs,
    openApps,
    setAppActive,
    minimizeApp,
    closeApp,
    launchApp,
    maximizeApp,
  }
}

export type OsApplication = {
  name: string
  dimensions: { width: number; height: number }
  minimized: boolean
  left: number
  top: number
  id: string
  component: FunctionComponent<GenericAppProps>
  icon: string
}

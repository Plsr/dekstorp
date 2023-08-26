import { atom, useAtom } from 'jotai'

export const appsAtom = atom<OsApplication[]>([])

export const useApplicationManager = () => {
  const [activeApplications, setActiveApplications] = useAtom(appsAtom)

  const setAppActive = (name: string) => {
    const appIndex = activeApplications.findIndex((app) => app.name === name)
    const appsCopy = [...activeApplications]
    appsCopy.splice(appIndex, 1)
    appsCopy.unshift(activeApplications[appIndex])
    setActiveApplications(appsCopy)
  }

  const minimizeApp = ({
    name,
    dimensions,
  }: {
    name: string
    dimensions: { x: number; y: number }
  }) => {
    const appIndex = activeApplications.findIndex((app) => app.name === name)
    const appsCopy = [...activeApplications]
    appsCopy[appIndex] = {
      ...appsCopy[appIndex],
      minimized: true,
      left: dimensions.x,
      top: dimensions.y,
    }
    setActiveApplications(appsCopy)
  }

  const closeApp = (name: string) => {
    const appIndex = activeApplications.findIndex((app) => app.name === name)
    const appsCopy = [...activeApplications]
    appsCopy.splice(appIndex, 1)
    setActiveApplications(appsCopy)
  }

  const launchApp = (app: OsApplication) => {
    if (
      activeApplications.filter((activeApp) => activeApp.id === app.id).length
    ) {
      return
    }

    setActiveApplications([app, ...activeApplications])
  }

  const maximizeApp = (name: string) => {
    const appIndex = activeApplications.findIndex((app) => app.name === name)
    const appsCopy = [...activeApplications]
    appsCopy[appIndex] = {
      ...appsCopy[appIndex],
      minimized: false,
    }
    setActiveApplications(appsCopy)
  }

  return {
    activeApplications,
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
  component: any
  icon: string
}

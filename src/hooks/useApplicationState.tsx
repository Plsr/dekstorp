import { appConfigsAtom } from './useApplicationManager'
import { useAtomValue } from 'jotai'

export const useApplicationState = () => {
  const appConfigs = useAtomValue(appConfigsAtom)
  const getState = (applicationId: string) => {
    const app = appConfigs[applicationId]

    // TODO: Better error handling
    if (!app) {
      throw new Error(`No app found with id ${applicationId}`)
    }

    return app
  }

  const isMinimized = (applicationId: string) => {
    const appState = getState(applicationId)
    return appState.minimized
  }

  return { isMinimized }
}

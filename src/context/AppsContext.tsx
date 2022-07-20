import { createContext, useState, useEffect } from 'react'

export type AppContextType = {
  setApps(apps: App[]): void
  apps: App[] | []
}

export const AppsContext = createContext<AppContextType>({
  setApps: (apps: App[]) => {},
  apps: [],
})


export const AppsProvider = ({ children }: Props) => {
  const [apps, setApps] = useState<App[]>([])

  return (
    <AppsContext.Provider value={{ apps, setApps }}>
      {children}
    </AppsContext.Provider>
  )
}

interface Props {
  children: React.ReactNode
}

export interface App {
  name: string
  dimensions: { width: number, height: number }
  minimized: boolean
}

import AppWindow from './AppWindow'
import { useApplicationManager } from '../hooks/useApplicationManager'

type Props = {
  children: React.ReactNode
}

const DragContainer = ({ children }: Props) => {
  const apps = useApplicationManager().appConfigs

  return (
    <div className="w-screen h-[calc(100vh-50px)] bg-teal-500 absolute top-0">
      {Object.values(apps)
        .filter((app) => !app.minimized)
        .map((app) => (
          <AppWindow key={app.id} app={app} />
        ))}
      {children}
    </div>
  )
}

export default DragContainer

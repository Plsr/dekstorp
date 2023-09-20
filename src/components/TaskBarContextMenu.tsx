import { useApplicationManager } from '../hooks/useApplicationManager'
import { useApplicationState } from '../hooks/useApplicationState'

type TaskBarContextMenuProps = {
  appId: string
  close: (callback: () => void) => void
}

export const TaskBarContextMenu = ({
  appId,
  close,
}: TaskBarContextMenuProps) => {
  const { maximizeApp, minimizeApp, closeApp } = useApplicationManager()
  const applicationState = useApplicationState()

  const handleCloseClick = () => {
    closeApp(appId)
  }

  const handleMaximizeClick = () => {
    maximizeApp(appId)
  }

  const handleMinimizeClick = () => {
    minimizeApp({ name: appId })
  }

  const isMinimized = applicationState.isMinimized(appId)
  const isMaximized = !isMinimized

  return (
    <div className="bg-gray-300 rounded divide-y divide-gray-400 shadow">
      {isMaximized && (
        <TaskBarContextMenuItem onClick={() => close(handleMinimizeClick)}>
          Minimize
        </TaskBarContextMenuItem>
      )}
      {isMinimized && (
        <TaskBarContextMenuItem onClick={() => close(handleMaximizeClick)}>
          Maximize
        </TaskBarContextMenuItem>
      )}
      <TaskBarContextMenuItem onClick={() => close(handleCloseClick)}>
        Close
      </TaskBarContextMenuItem>
    </div>
  )
}

type TaskBarContextMenuItemProps = {
  children: React.ReactNode
  onClick: () => void
}

const TaskBarContextMenuItem = ({
  children,
  onClick,
}: TaskBarContextMenuItemProps) => {
  const handleItemClick = () => {
    onClick()
  }
  return (
    <div className="cursor-pointer text-sm p-2" onClick={handleItemClick}>
      {children}
    </div>
  )
}

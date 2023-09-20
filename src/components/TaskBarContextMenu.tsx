import {
  MinusSmallIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
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
    <div className="bg-gray-300 rounded divide-y divide-gray-400 overflow-hidden shadow">
      {isMaximized && (
        <TaskBarContextMenuItem onClick={() => close(handleMinimizeClick)}>
          <MinusSmallIcon className="w-4 h-4 mr-1" />
          Minimize
        </TaskBarContextMenuItem>
      )}
      {isMinimized && (
        <TaskBarContextMenuItem onClick={() => close(handleMaximizeClick)}>
          <SquaresPlusIcon className="w-4 h-4 mr-1" />
          Maximize
        </TaskBarContextMenuItem>
      )}
      <TaskBarContextMenuItem onClick={() => close(handleCloseClick)}>
        <XMarkIcon className="w-4 h-4 mr-1" />
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
    <div
      className="cursor-pointer text-sm p-2 hover:bg-blue-300 flex items-center"
      onClick={handleItemClick}>
      {children}
    </div>
  )
}

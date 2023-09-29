import { atom, useAtomValue, useSetAtom } from 'jotai'
import { useCallback, useEffect, useRef } from 'react'
import { useClickOutside } from './useClickOutside'

export const contextMenuAtom = atom<JSX.Element | null>(null)

export function useContextMenu() {
  const handleClickOutside = () => {
    setContextMenuNode(null)
  }

  const setContextMenuNode = useSetAtom(contextMenuAtom)
  const clickOutsideTargetRef = useClickOutside(handleClickOutside)

  const openContextMenu = useCallback(
    function open(
      contextMenuFactory: (close: (fn: () => void) => void) => React.ReactNode,
      position: { x: number; y: number },
    ) {
      return new Promise<void>((resolve) => {
        function close(callback: () => void) {
          callback()
          setContextMenuNode(null)
          resolve()
        }

        const contextMenuWithClickOutside = (close: any) => (
          <div ref={clickOutsideTargetRef}>
            <PositionedMenu position={position}>
              {contextMenuFactory(close)}
            </PositionedMenu>
          </div>
        )

        setContextMenuNode(contextMenuWithClickOutside(close))
      })
    },
    [setContextMenuNode, clickOutsideTargetRef],
  )

  return openContextMenu
}

const PositionedMenu = ({
  children,
  position,
}: {
  children: React.ReactNode
  position: { x: number; y: number }
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrapperRef.current) {
      return
    }

    // Calculate y axis positioning
    const menuHeight = wrapperRef.current.offsetHeight
    const windowHeight = window.innerHeight
    const shouldOpenToTop = position.y + menuHeight > windowHeight
    const positionY = shouldOpenToTop ? position.y - menuHeight : position.y

    // Calculate x axis positioning
    const menuWidth = wrapperRef.current.offsetWidth
    const windowWidth = window.innerWidth
    const shouldOpenToLeft = position.x + menuWidth > windowWidth
    const positionX = shouldOpenToLeft ? position.x - menuWidth : position.x

    wrapperRef.current.style.top = `${positionY}px`
    wrapperRef.current.style.left = `${positionX}px`
  }, [wrapperRef, position])

  return (
    <div ref={wrapperRef} className="absolute z-50">
      {children}
    </div>
  )
}

type ContextMenuProviderProps = {
  children: React.ReactNode
}

export const ContextMenuProvider = ({ children }: ContextMenuProviderProps) => {
  const contextMenuNode = useAtomValue(contextMenuAtom)
  return (
    <>
      {contextMenuNode}
      {children}
    </>
  )
}

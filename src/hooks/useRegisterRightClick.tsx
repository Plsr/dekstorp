import { useEffect, useRef } from 'react'

export const useRegisterRightClick = (callback: (event: any) => any) => {
  const ref = useRef<any>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const refCopy = ref.current

    refCopy.addEventListener('contextmenu', callback)

    return () => {
      refCopy.removeEventListener('contextmenu', callback)
    }
  }, [ref, callback])

  return ref
}

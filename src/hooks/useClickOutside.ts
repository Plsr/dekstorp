import { useEffect, useRef } from 'react'

export const useClickOutside = (callback: () => any) => {
  const ref = useRef<any>(null)

  useEffect(() => {
    const handleClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [ref, callback])

  return ref
}

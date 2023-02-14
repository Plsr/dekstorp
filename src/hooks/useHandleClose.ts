import { useEffect } from 'react'

export const useHandleClose = (
  shouldClose: boolean,
  onClose: () => void,
  doClose: () => void,
) => {
  useEffect(() => {
    if (shouldClose) {
      // TODO: Handle async at some point?
      onClose()
      doClose()
    }
  })
}

import { FormEvent, useRef, useState } from 'react'
import { GenericAppProps } from '../types/genericAppProps'
import { useHandleClose } from '../hooks/useHandleClose'

export const BrowserApp = ({
  shouldClose,
  onCloseConfirm,
}: GenericAppProps) => {
  const [address, setAddress] = useState('https://www.google.com/search?igu=1')
  const [addressInputVal, setAddressInputVal] = useState(
    'https://www.google.com/search?igu=1',
  )
  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  useHandleClose(shouldClose, () => {}, onCloseConfirm)

  const handleClick = async () => {
    updateAddress()
  }

  const updateAddress = () => {
    if (!addressInputVal) {
      return
    }

    let sanitizedAddress = addressInputVal
    if (addressInputVal.slice(0, 5) !== 'https') {
      sanitizedAddress = 'https://' + addressInputVal
    }

    setAddress(sanitizedAddress)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault() // Prevent page reload

    updateAddress()
    iframeRef.current?.contentWindow?.focus()
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-around bg-slate-400 py-2">
        <form onSubmit={(e) => handleSubmit(e)} className="w-3/4">
          <input
            value={addressInputVal}
            onChange={(event) => setAddressInputVal(event.target.value)}
            className="w-full"
          />
        </form>
        <button onClick={handleClick}>Go</button>
      </div>
      <iframe ref={iframeRef} title="google" src={address} className="h-full" />
    </div>
  )
}

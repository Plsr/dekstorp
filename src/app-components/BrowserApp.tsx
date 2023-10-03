import { FormEvent, useRef, useState } from 'react'
import { GenericAppProps } from '../types/genericAppProps'
import { useHandleClose } from '../hooks/useHandleClose'
import { useBrowserHistory } from '../hooks/useBrowserHistory'
import { QueueListIcon } from '@heroicons/react/24/outline'

type ViewState = 'browser' | 'history'

export const BrowserApp = ({
  shouldClose,
  onCloseConfirm,
}: GenericAppProps) => {
  const [address, setAddress] = useState('https://www.google.com/search?igu=1')
  // TODO: Should be handeled by tabs later on
  const [viewState, setViewState] = useState<ViewState>('browser')
  const [addressInputVal, setAddressInputVal] = useState(
    'https://www.google.com/search?igu=1',
  )
  const history = useBrowserHistory()

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
    history.addEntry(sanitizedAddress)
  }

  const handleHistoryButtonClick = () => {
    if (viewState !== 'history') {
      setViewState('history')
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault() // Prevent page reload

    updateAddress()
    iframeRef.current?.contentWindow?.focus()
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-around bg-slate-600 py-2">
        <form onSubmit={(e) => handleSubmit(e)} className="w-3/4">
          <input
            value={addressInputVal}
            onChange={(event) => setAddressInputVal(event.target.value)}
            className="w-full rounded-full p-2"
          />
        </form>
        <button onClick={handleClick}>Go</button>
        <button onClick={handleHistoryButtonClick}>
          <QueueListIcon className="w-6 h-6" />
        </button>
      </div>
      {viewState === 'history' && <div>Here be history</div>}
      {viewState === 'browser' && (
        <iframe
          ref={iframeRef}
          title="google"
          src={address}
          className="h-full"
        />
      )}
    </div>
  )
}

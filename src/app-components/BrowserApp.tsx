import { useState } from 'react'

export const BrowserApp = () => {
  const [address, setAddress] = useState('https://www.google.com/search?igu=1')
  const [addressInputVal, setAddressInputVal] = useState(
    'https://www.google.com/search?igu=1',
  )

  const handleClick = () => {
    if (!addressInputVal) {
      return
    }

    setAddress(addressInputVal)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-around bg-slate-400 py-2">
        <input
          value={addressInputVal}
          onChange={(event) => setAddressInputVal(event.target.value)}
          className="w-3/4"
        />
        <button onClick={handleClick}>Go</button>
      </div>
      <iframe title="google" src={address} className="flex-grow" />
    </div>
  )
}

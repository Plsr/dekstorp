import { useState } from 'react'
import { useHandleClose } from '../hooks/useHandleClose'

type CalculatorAppProps = {
  shouldClose: boolean
  onCloseConfirm: () => void
}

export const CalculatorApp = ({
  shouldClose,
  onCloseConfirm,
}: CalculatorAppProps) => {
  const [foo, setFoo] = useState('foo')
  useHandleClose(shouldClose, () => {}, onCloseConfirm)

  return (
    <div>
      <p>Calculator App: {foo}</p>
      <button onClick={() => setFoo('bar')}>Bar</button>
    </div>
  )
}

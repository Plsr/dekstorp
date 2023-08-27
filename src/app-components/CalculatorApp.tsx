import { useState } from 'react'
import { useHandleClose } from '../hooks/useHandleClose'
import { GenericAppProps } from '../types/genericAppProps'

type CalculatorAppProps = GenericAppProps

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

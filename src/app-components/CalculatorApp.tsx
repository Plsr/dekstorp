import { useEffect, useState } from 'react'

type CalculatorAppProps = {
  shouldClose: boolean
  onCloseConfirm: () => void
}

export const CalculatorApp = ({
  shouldClose,
  onCloseConfirm,
}: CalculatorAppProps) => {
  const [foo, setFoo] = useState('foo')

  useEffect(() => {
    if (!shouldClose) return
    onCloseConfirm()
  }, [shouldClose, onCloseConfirm])

  return (
    <div>
      <p>Calculator App: {foo}</p>
      <button onClick={() => setFoo('bar')}>Bar</button>
    </div>
  )
}

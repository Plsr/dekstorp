import { FC, useState } from 'react'

const CalculatorApp: FC<any> = () => {
  const [foo, setFoo] = useState('foo')
  return (
    <div>
      <p>Calculator App: { foo }</p>
      <button onClick={() => setFoo('bar')}>Bar</button>
    </div>
  )
}

export default CalculatorApp

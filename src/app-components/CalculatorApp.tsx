import { FC, useState } from 'react'

const AVAILABLE_OPERATORS = ['/', '*', '+', '-']

const CalculatorApp: FC<any> = () => {
  const [equationArray, setEquationArray] = useState<string[]>([])

  const handleButtonClick = (value: string) => {
    if (isOperator(value) && (!equationsInArray() || isOperator(lastEnteredEquation()))) return
    
    if (isNumber(value) && equationsInArray() && isNumber(lastEnteredEquation())) {
      const newNumber = lastEnteredEquation() + value
      const newEquationArr = replaceLastEquation(newNumber)
      setEquationArray(newEquationArr)
      return
    }

    setEquationArray([...equationArray, value])
  }

  const isOperator = (value: string): boolean => AVAILABLE_OPERATORS.includes(value)
  const isNumber = (value: string): boolean => !isOperator(value)
  const equationsInArray = (): boolean => equationArray.length > 0
  const lastEnteredEquation = (): string => equationArray[equationArray.length - 1]

  const replaceLastEquation = (replaceValue: string): string[] => {
    const eqArr = [...equationArray]
    eqArr.splice(equationArray.length -1, 1, replaceValue)
    return eqArr
  }

  console.log(equationArray)

  return (
    <div>
      { 
        [...Array(10)].map((_, i) => (
          <button key={i} onClick={() => handleButtonClick(i.toString())}>{ i }</button>
        ))
      }
      {
        AVAILABLE_OPERATORS.map(operator => (
          <button onClick={() => handleButtonClick(operator)}>{ operator }</button>
        ))
      }
      <button>=</button>
    </div>
  )
}

export default CalculatorApp

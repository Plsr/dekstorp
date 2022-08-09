import { App } from "../context/AppsContext"

import CalculatorApp from '../app-components/CalculatorApp'

export const availableApps: App[] = [
  {
    name: 'Calculator',
    dimensions: { width: 300, height: 500 },
    minimized: false,
    top: 0,
    left: 0,
    id: 'calculator',
    component: <CalculatorApp />
  }
]

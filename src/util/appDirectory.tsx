import { App } from '../context/AppsContext'

import { CalculatorApp } from '../app-components/CalculatorApp'
import { NotesApp } from '../app-components/NotesApp'

export const availableApps: App[] = [
  {
    name: 'Calculator',
    dimensions: { width: 300, height: 500 },
    minimized: false,
    top: 0,
    left: 0,
    id: 'calculator',
    component: CalculatorApp,
    icon: 'calculator-icon.svg',
  },
  {
    name: 'Notes',
    dimensions: { width: 800, height: 500 },
    minimized: false,
    top: 0,
    left: 0,
    id: 'notes',
    component: NotesApp,
    icon: 'notes-icon.svg',
  },
]

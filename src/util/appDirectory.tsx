import { OsApplication } from '../hooks/useApplicationManager'
import { CalculatorApp } from '../app-components/CalculatorApp'
import { NotesApp } from '../app-components/NotesApp'
import { BrowserApp } from '../app-components/BrowserApp'

export const availableApps: OsApplication[] = [
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
  {
    name: 'Browser',
    dimensions: { width: 800, height: 500 },
    minimized: false,
    top: 0,
    left: 0,
    id: 'browser',
    component: BrowserApp,
    icon: 'notes-icon.svg',
  },
]

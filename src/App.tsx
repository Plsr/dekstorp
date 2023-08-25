import styled from 'styled-components'
import Desktop from './components/Desktop'
import './index.css'
import { atom } from 'jotai'

export const appsAtom = atom<OsApplication[]>([])
function App() {
  return (
    <Wrapper>
      <Desktop />
    </Wrapper>
  )
}

export default App

const Wrapper = styled.div`
  background-color: #666;
  height: 100vh;
  width: 100vw;
`

export type OsApplication = {
  name: string
  dimensions: { width: number; height: number }
  minimized: boolean
  left: number
  top: number
  id: string
  component: any
  icon: string
}

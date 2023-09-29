import styled from 'styled-components'
import Desktop from './components/Desktop'
import './index.css'
import { ContextMenuProvider } from './hooks/useContextMenu'

function App() {
  return (
    <Wrapper>
      <ContextMenuProvider>
        <Desktop />
      </ContextMenuProvider>
    </Wrapper>
  )
}

export default App

const Wrapper = styled.div`
  background-color: #666;
  height: 100vh;
  width: 100vw;
`

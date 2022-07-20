import styled from 'styled-components'
import Desktop from './components/Desktop'
import { AppsProvider } from './context/AppsContext';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  return (
    <AppsProvider>
      <DndProvider backend={HTML5Backend} >
        <Wrapper>
          <Desktop />
        </Wrapper>
      </DndProvider>
    </AppsProvider>
  );
}

export default App;


const Wrapper = styled.div`
  background-color: #666;
  height: 100vh;
  width: 100vw;
`

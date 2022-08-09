import styled from 'styled-components'
import Desktop from './components/Desktop'
import { AppsProvider } from './context/AppsContext';

function App() {
  return (
    <AppsProvider>
      <Wrapper>
        <Desktop />
      </Wrapper>
    </AppsProvider>
  );
}

export default App;


const Wrapper = styled.div`
  background-color: #666;
  height: 100vh;
  width: 100vw;
`

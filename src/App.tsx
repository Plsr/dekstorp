import styled from 'styled-components'
import Desktop from './components/Desktop';

function App() {
  return (
    <Wrapper>
      <Desktop />
    </Wrapper>
  );
}

export default App;


const Wrapper = styled.div`
  background-color: #666;
  height: 100vh;
  width: 100vw;
`

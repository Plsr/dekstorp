import { FC, useState } from 'react'
import styled from 'styled-components'


const DesktopApp: FC<DesktopAppProps> = ({ name, onAppDoubleClick }) => {
  // TODO: Has to be handled with props later on to keep highlighted apps in sync
  const [selected, setSelected] = useState(false)

  const handleClick = (event: any) => {
    console.log('double click')
    onAppDoubleClick()
  }

  return(
    <Wrapper onDoubleClick={handleClick}>
      <Icon />
      <Name>{ name }</Name>
    </Wrapper>
  )
}

const Name = styled.div`
  text-overflow: ellipsis;
`

const Icon = styled.div`
  width: 32px;
  height: 32px;
  background-color: red;
`

const Wrapper = styled.div`
  width: 72px;
  height: 72px;
  font-size: 0.7rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: .5rem;
  cursor: pointer;
`

interface DesktopAppProps {
  name: string
  onAppDoubleClick(): void
}

export default DesktopApp

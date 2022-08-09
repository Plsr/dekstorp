import { FC, useState, lazy } from 'react'
import styled from 'styled-components'

const images = require.context('../images/app-icons', true);


const DesktopApp: FC<DesktopAppProps> = ({ name, onAppDoubleClick }) => {
  // TODO: Has to be handled with props later on to keep highlighted apps in sync
  const [selected, setSelected] = useState(false)

  const mockIconName = "calculator-icon.svg"
  const icon = images(`./${mockIconName}`);



  const handleClick = (event: any) => {
    console.log('double click')
    onAppDoubleClick()
  }

  return(
    <Wrapper onDoubleClick={handleClick}>
      <Icon src={icon} alt="Logo" />
      <Name>{ name }</Name>
    </Wrapper>
  )
}

const Name = styled.div`
  text-overflow: ellipsis;
`

const Icon = styled.img`
  width: 40px;
  height: 40px;
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

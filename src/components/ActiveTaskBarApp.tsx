import { FC } from 'react'
import styled from 'styled-components'

const ActiveTaskBarApp: FC<ActiveTaksBarAppProps> = ({ name, className }) => {
  return (
    <Wrapper className={className}>{ name }</Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 .5rem;
  background-color: #fff;
  border: 1px dotted #999;
`

interface ActiveTaksBarAppProps {
  name: string,
  className?: string
}

export default ActiveTaskBarApp

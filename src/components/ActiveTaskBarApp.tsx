import { FC } from 'react'
import styled from 'styled-components'

const ActiveTaskBarApp: FC<ActiveTaksBarAppProps> = ({ name, className, onAppClick }) => {
  return (
    <Wrapper className={className} onClick={onAppClick}>{ name }</Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 0.875rem;
  padding: 0 .5rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow:
    0.9px 0.9px 5.4px rgba(0, 0, 0, 0.02),
    2.1px 2.1px 12.9px rgba(0, 0, 0, 0.028),
    3.9px 4px 24.3px rgba(0, 0, 0, 0.035),
    6.9px 7.1px 43.3px rgba(0, 0, 0, 0.042),
    13px 13.4px 81px rgba(0, 0, 0, 0.05),
    31px 32px 194px rgba(0, 0, 0, 0.07)
  ;
`

interface ActiveTaksBarAppProps {
  name: string,
  className?: string,
  onAppClick(): void
}

export default ActiveTaskBarApp

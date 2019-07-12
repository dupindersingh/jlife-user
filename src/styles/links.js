import styled from 'styled-components'
import { Link } from 'react-router-dom'

import colors from './colors'

const InternalLink = styled(Link)`
  color: ${colors.blue};
  text-decoration: none;

  &:hover,
  &:active {
    text-decoration: underline;
  }
`
const HeaderLink = styled(Link)`
  color: ${colors.black};
  padding: 0px 5px;
  text-decoration: none;
`

export {
  InternalLink,
  HeaderLink,
}

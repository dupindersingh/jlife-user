import styled from 'styled-components'

const HeaderFooterWrapper = styled.div`
  margin: auto;
  grid-template-rows: max-content auto max-content;
  min-height: 100vh;
`

const Page = styled.div`
  padding: 1rem;
  display: flex;
  width: 100vw;
  min-height: 90vh;
  padding: 2vh 5vw;
  background-color: #fff;
  flex-direction: column;
  align-items: center;
`
const Footer = styled.div`
  padding: 1rem;
  text-align: center;
  opacity: .3;
  vertical-align: bottom;
`

export {
  HeaderFooterWrapper,
  Page,
  Footer,
}

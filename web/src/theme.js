import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}
const breakpoints = {
  base: '0px',
  xs: '395px',
  sm: '480px',
  md: '768px',
  lg: '992px',
  xl: '1280px',
  '2xl': '1536px',
}


const theme = extendTheme({ config, breakpoints })

export default theme;
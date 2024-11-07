import { CssBaseline, ThemeProvider } from '@mui/material'
import './Style.scss'
import { AppRoutes } from './Routes/AppRoute'
import theme from './Theme/Theme'


function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </>
  )
}

export default App
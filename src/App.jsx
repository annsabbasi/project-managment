import { CssBaseline, ThemeProvider } from '@mui/material'
import './App.css'
import Theme from './Theme/Theme'
import { AppRoutes } from './Routes/AppRoute'

function App() {

  return (
    <>
      <ThemeProvider theme={Theme()}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </>
  )
}

export default App

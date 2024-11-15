import { CssBaseline, ThemeProvider } from '@mui/material'
import './Style.scss'
import { AppRoutes } from './Routes/AppRoute'
import theme from './Theme/Theme'
// import AdminLayout from './adminLayout'

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes/>
        {/* <AdminLayout /> */}
      </ThemeProvider>
    </>
  )
}

export default App
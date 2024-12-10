import { CssBaseline, ThemeProvider } from '@mui/material'
import './Style.scss'
import { AppRoutes } from './Routes/AppRoute'
import theme from './Theme/Theme'
// import AdminLayout from './adminLayout'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes />
        {/* <AdminLayout /> */}
        <ToastContainer />
      </ThemeProvider>
    </>
  )
}

export default App
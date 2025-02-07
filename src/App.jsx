import { CssBaseline } from '@mui/material'
import './Style.scss'
import { AppRoutes } from './Routes/AppRoute'
// import theme from './Theme/Theme'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from '@emotion/react';
import { useAuth } from './context/AuthProvider';

function App() {
  const { mode, theme } = useAuth();
  return (
    <>
      <ThemeProvider theme={{ theme, mode }}>
        <CssBaseline />
        <AppRoutes />
        <ToastContainer />
      </ThemeProvider>
    </>
  )
}

export default App
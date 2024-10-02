import { createTheme } from '@mui/material'

export default function Theme() {
    return createTheme({
        palette: {
            primary: { main: '#1976d2' },
            secondary: { main: '#9c27b0' },
            grey: {
                'dark-grey': '#424242',
                'medium-grey': '#616161',
                'light-grey': '#757575',
                'hover-grey': '#f5f5f5',
            }
        }
    })
}

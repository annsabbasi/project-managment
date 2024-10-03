import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: { main: '#1976d2' },
        secondary: { main: '#9c27b0' },
        grey: {
            darkGrey: '#424242',
            mediumGrey: '#616161',
            lightGrey: '#757575',
            hoverGrey: '#f5f5f5',
        },
    },
});

export default theme;



// import { createTheme } from '@mui/material'

// export default function Theme() {
//     return createTheme({
//         palette: {
//             primary: { main: '#1976d2' },
//             secondary: { main: '#9c27b0' },
//             grey: {
//                 'darkGrey': '#424242',
//                 'mediumGrey': '#616161',
//                 'lightGrey': '#757575',
//                 'hoverGrey': '#f5f5f5',
//             }
//         }
//     })
// }

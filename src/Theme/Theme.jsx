import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//     palette: {
//         primary: { main: '#1976d2' },
//         secondary: { main: '#9c27b0' },
//         grey: {
//             darkGrey: '#424242',
//             mediumGrey: '#616161',
//             lightGrey: '#757575',
//             hoverGrey: '#f5f5f5',
//             purple: 'purple'
//         },
//     },
// });


export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#9c27b0',
        },
        background: {
            paper: '#FAF9F6',
            default: '#ffffff',
        },
        text: {
            primary: '#808080',
            secondary: '#899499',
        },
    },
});


export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#bb86fc',
        },
        secondary: {
            main: '#03dac6',
        },
        background: {
            paper: '#343434',
            default: '#28282B',
        },
        text: {
            primary: '#E2DFD2',
            secondary: '#D3D3D3',
        },
    },
});



// export default theme;
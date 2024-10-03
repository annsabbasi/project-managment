import { Skeleton, Stack } from '@mui/material'

export default function Spinner() {
    return (
        <Stack spacing={1} width='250px' alignItems='center' mx='auto'>
            <Skeleton variant='text' />
            <Skeleton variant='circular' width={40} height={40} />
            <Skeleton variant='rectangular' width={250} height={125} animation='wave' />
        </Stack>
    )
}








// import { CircularProgress, Box } from "@mui/material";

// const Spinner = () => {
//     return (
//         <Box
//             sx={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 height: '100vh', // full height
//                 backgroundColor: '#f0f0f0', // light background color
//             }}
//         >
//             <CircularProgress
//                 size={80} // larger size
//                 thickness={5} // thickness of the spinner
//                 sx={{
//                     color: '#4caf50', // customize color
//                     animationDuration: '550ms', // faster spin
//                     position: 'relative',
//                 }}
//             />
//         </Box>
//     );
// };

// export default Spinner;

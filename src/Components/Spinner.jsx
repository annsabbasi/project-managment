import GearGif from '../assets/Gears.gif'
import { Stack } from '@mui/material'

export default function Spinner() {
    return (
        <Stack sx={{ height: '100vh', opacity: 0.1 }} alignItems="center" justifyContent="center" mx="auto">
            <img src={GearGif} alt="Loading" />
        </Stack>
    )
}
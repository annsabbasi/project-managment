import { AppBar, Avatar, Stack, Toolbar, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useTheme } from "@mui/material/styles";
import styles from './styles.scss'

export default function TopBar() {
    const theme = useTheme();

    return (
        <AppBar
            position="static" sx={{
                backgroundColor: 'background.default',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
            }}>

            <Toolbar className={styles.navbarcontent}>
                <Typography variant="h5" sx={{ fontWeight: '600', color: theme.palette.grey['dark-grey'] }}>Route Title</Typography>

                <Stack direction='row' spacing={2} alignItems='center' sx={{
                    '& svg': {
                        cursor: 'pointer',
                        fontSize: '1.8rem',
                        color: theme.palette.grey['light-grey']
                    }
                }}>
                    <AddIcon aria-label="Add" />
                    <NotificationsNoneIcon aria-label="Notifications" />
                    <Avatar alt="User Avatar" />
                </Stack>

            </Toolbar>
        </AppBar>
    )
}

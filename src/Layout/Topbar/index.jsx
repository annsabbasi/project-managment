import { AppBar, Avatar, Stack, Toolbar, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useTheme } from "@mui/material/styles";
// import styles from './page.scss'
import styles from './page.module.scss'
import PropTypes from 'prop-types';

export default function TopBar({ title }) {
    const theme = useTheme();

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: 'background.default',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
            }}>
            <Toolbar className={styles.navbarcontent}>
                <Typography variant="h5" sx={{ fontWeight: '600', color: theme.palette.grey['darkGrey'] }}>{title}</Typography>
                <Stack direction='row' spacing={2} alignItems='center' sx={{
                    '& svg': {
                        cursor: 'pointer',
                        fontSize: '1.8rem',
                        color: theme.palette.grey['lightGrey']
                    }
                }}
                >
                    <AddIcon aria-label="Add" />
                    <NotificationsNoneIcon aria-label="Notifications" />
                    <Avatar alt="User Avatar" />
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

TopBar.propTypes = {
    title: PropTypes.string.isRequired
}
import PropTypes from 'prop-types';

import AddIcon from '@mui/icons-material/Add';
import styles from './page.module.scss'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useLogout } from "../../hooks/useAuth";
import {
    AppBar, Avatar,
    IconButton, Menu,
    MenuItem, Stack,
    Toolbar, Typography
} from "@mui/material";
// import { useNavigate } from "react-router-dom";

export default function TopBar({ title }) {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const { mutate: logout } = useLogout();
    // const navigate = useNavigate();


    const handleClick = (event) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    const handleLogout = () => {
        logout(null,
            //      {
            //     onSuccess: () => navigate('/login')
            // }
        );
        handleClose();
    }

    return (
        <AppBar position="static" sx={{
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
                }}>

                    <AddIcon aria-label="Add" />
                    <NotificationsNoneIcon aria-label="Notifications" />
                    <IconButton onClick={handleClick}>
                        <Avatar alt="User Avatar" />
                    </IconButton>
                </Stack>


                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My Account</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>

            </Toolbar>
        </AppBar>
    )
}

TopBar.propTypes = {
    title: PropTypes.string.isRequired
}
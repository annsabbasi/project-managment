import PropTypes from 'prop-types';

import styles from './page.module.scss'
// import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useLogout } from "../../hooks/useAuth";
// import audioClick from "../../assets/audio/click.mp3"
import audioClick from "../../assets/audio/click2.wav"

import {
    AppBar, Avatar,
    IconButton, Menu,
    MenuItem, Stack,
    Toolbar, Typography
} from "@mui/material";
import { useAuth } from '../../context/AuthProvider';
import { RouteNames } from '../../Constants/route';
import { Link } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";


export default function TopBar({ title }) {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const { mutate: logout } = useLogout();
    // const navigate = useNavigate();

    // Theme Setup
    const { mode, toggleTheme, user } = useAuth();
    // console.log("User data", user)

    const handleClick = (event) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    const handleLogout = () => {
        logout(null);
        handleClose();
    }

    const playSound = () => {
        const audio = new Audio(audioClick);
        audio.play();
    };
    const handleThemeToggle = () => {
        playSound();
        toggleTheme();
    };

    return (
        <AppBar position="static" sx={{
            backgroundColor: theme.palette.background.default,
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
        }}>
            <Toolbar className={styles.navbarcontent}>
                <Typography variant="h5" sx={{ fontWeight: '500', color: theme.palette.text.primary }}>{title}</Typography>


                <Stack direction='row' spacing={2} alignItems='center' sx={{
                    '& svg': {
                        cursor: 'pointer',
                        fontSize: '1.8rem',
                        color: theme.palette.text.primary
                    }
                }}>
                    <IconButton onClick={handleThemeToggle} color="inherit">
                        {mode === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
                    </IconButton>
                    {/* <NotificationsNoneIcon aria-label="Notifications" /> */}
                    <IconButton onClick={handleClick}>
                        <Avatar
                            src={user?.avatar || ""}
                            alt="User Avatar" />
                    </IconButton>
                </Stack>


                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}>
                    <Link to={`/${RouteNames.ADMINPROFILEPAGE}`} style={{ textDecoration: "none" }}>
                        <MenuItem onClick={handleClose} sx={{ color: mode === 'light' ? "text.primary" : "text.primary" }}>Profile</MenuItem>
                    </Link>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>

            </Toolbar>
        </AppBar>
    )
}

TopBar.propTypes = {
    title: PropTypes.string.isRequired
}
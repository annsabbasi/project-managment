import React from 'react';
import styles from './page.module.scss';
import logoimage from '../../assets/Hide-sidebar.svg';
import { RouteNames } from '../../Constants/route';
import { drawerWidth } from '../../Constants/app';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import DashboardIcon from '../../assets/dashboard.svg';
import ProjectsIcon from '../../assets/Project.svg';
import MessagesIcon from '../../assets/Message.png';

import DashboardIconWhite from '../../assets/Dashboard active.svg';
import ProjectsIconWhite from '../../assets/Project active.svg';
import MessagesIconWhite from '../../assets/Message active.svg';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const pages = [
        { name: 'Overview', path: `/${RouteNames.ADMINPAGE1}`, Icon: DashboardIcon, ActiveIcon: DashboardIconWhite },
        { name: 'Plan Request', path: `/${RouteNames.PLANREQUEST}`, Icon: ProjectsIcon, ActiveIcon: ProjectsIconWhite },
        { name: 'AdminPage3', path: `/${RouteNames.ADMINPAGE3}`, Icon: MessagesIcon, ActiveIcon: MessagesIconWhite },
    ];

    const handleClick = (path) => {
        navigate(path);
    };
    return (
        <Drawer
            variant="permanent"
            open
            sx={{
                width: drawerWidth,
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    alignItems: 'center',
                    overflow: 'hidden',
                },
            }}
        >
            <Box className={styles.sidebar}>
                <Box className={styles.upperRow}>
                    <Box className={styles.logo}>
                        <img className={styles.image} src={logoimage} alt="image" />
                    </Box>

                    <List className={styles.list}>
                        {pages.map(({ name, Icon, ActiveIcon, path }) => (
                            <React.Fragment key={name}>
                                <ListItem disablePadding className={`${styles.listItem} ${(name === 'AdminPage1' && currentPath.includes(RouteNames.ADDPRODUCTS)) || currentPath === path ? styles.activeItem : ''}`}>

                                    <ListItemButton onClick={() => handleClick(path)} className={styles.listItemBtn}>
                                        <ListItemIcon className={styles.listItemIcon}>
                                            <img
                                                src={(name === 'AdminPage1' && currentPath.includes(RouteNames.ADDPRODUCTS)) || currentPath === path ? ActiveIcon : Icon}
                                                alt={name}
                                                className={`${styles.icon} ${currentPath === path ? styles.activeIcon : ''}`} />
                                        </ListItemIcon>
                                        <ListItemText primary={name} className={styles.listItemText} />
                                    </ListItemButton>

                                </ListItem>
                            </React.Fragment>
                        ))}
                    </List>
                </Box>
            </Box>
        </Drawer>
    );
};

export default Sidebar;

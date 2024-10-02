import React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
// import Logo from '../../assets/react.svg';
import logoimage from '../../assets/Hide-sidebar.svg';
import { RouteNames } from '../../Constants/route';
import { drawerWidth } from '../../Constants/app';
import styles from './page.module.scss';



import DashboardIcon from '../../assets/DashboardSvg/Team.svg';
import ProjectsIcon from '../../assets/DashboardSvg/Team.svg';
import MessagesIcon from '../../assets/DashboardSvg/Team.svg';
import ClientsIcon from '../../assets/DashboardSvg/Team.svg';
import TeamsIcon from '../../assets/DashboardSvg/Team.svg';
import MeetingsIcon from '../../assets/DashboardSvg/Team.svg';
import ReferralsIcon from '../../assets/DashboardSvg/Team.svg';
import ServicesIcon from '../../assets/DashboardSvg/Team.svg';
import ContractsIcon from '../../assets/DashboardSvg/Team.svg';
import InvoicesIcon from '../../assets/DashboardSvg/Team.svg';
import FormsIcon from '../../assets/DashboardSvg/Team.svg';
import FinancesIcon from '../../assets/DashboardSvg/Team.svg';
import SettingsIcon from '../../assets/DashboardSvg/Team.svg';

import DashboardIconWhite from '../../assets/DashboardSvg/Team.svg';
import ProjectsIconWhite from '../../assets/DashboardSvg/Team.svg';
import MessagesIconWhite from '../../assets/DashboardSvg/Team.svg';
import ClientsIconWhite from '../../assets/DashboardSvg/Team.svg';
import TeamsIconWhite from '../../assets/DashboardSvg/Team.svg';
import MeetingsIconWhite from '../../assets/DashboardSvg/Team.svg';
import ReferralsIconWhite from '../../assets/DashboardSvg/Team.svg';
import ServicesIconWhite from '../../assets/DashboardSvg/Team.svg';
import ContractsIconWhite from '../../assets/DashboardSvg/Team.svg';
import InvoicesIconWhite from '../../assets/DashboardSvg/Team.svg';
import FormsIconWhite from '../../assets/DashboardSvg/Team.svg';
import FinancesIconWhite from '../../assets/DashboardSvg/Team.svg';
import SettingsIconWhite from '../../assets/DashboardSvg/Team.svg';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const pages = [
        { name: 'Dashboard', path: `/${RouteNames.DASHBOARD}`, Icon: DashboardIcon, ActiveIcon: DashboardIconWhite },
        { name: 'Projects', path: `/${RouteNames.PROJECTS}`, Icon: ProjectsIcon, ActiveIcon: ProjectsIconWhite },
        { name: 'Messages', path: `/${RouteNames.MESSAGES}`, Icon: MessagesIcon, ActiveIcon: MessagesIconWhite },
        { name: 'Clients', path: `/${RouteNames.CLIENTS}`, Icon: ClientsIcon, ActiveIcon: ClientsIconWhite },
        { name: 'Teams', path: `/${RouteNames.TEAMS}`, Icon: TeamsIcon, ActiveIcon: TeamsIconWhite },
        { name: 'Meetings', path: `/${RouteNames.MEETINGS}`, Icon: MeetingsIcon, ActiveIcon: MeetingsIconWhite },
        { name: 'Referrals', path: `/${RouteNames.REFERRALS}`, Icon: ReferralsIcon, ActiveIcon: ReferralsIconWhite },
        { name: 'Services', path: `/${RouteNames.SERVICES}`, Icon: ServicesIcon, ActiveIcon: ServicesIconWhite },
        { name: 'Contracts', path: `/${RouteNames.CONTRACTS}`, Icon: ContractsIcon, ActiveIcon: ContractsIconWhite },
        { name: 'Invoices', path: `/${RouteNames.INVOICES}`, Icon: InvoicesIcon, ActiveIcon: InvoicesIconWhite },
        { name: 'Forms', path: `/${RouteNames.FORMS}`, Icon: FormsIcon, ActiveIcon: FormsIconWhite },
        { name: 'Finances', path: `/${RouteNames.FINANCES}`, Icon: FinancesIcon, ActiveIcon: FinancesIconWhite },
    ];

    const lowerRowItems = [{ name: 'Settings', path: `/${RouteNames.SETTING}`, Icon: SettingsIcon, ActiveIcon: SettingsIconWhite }];

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
                        {/* <img src={Logo} alt="Logo" /> */}
                        <img className={styles.image} src={logoimage} alt="image" />
                    </Box>
                    <List className={styles.list}>
                        {pages.map(({ name, Icon, ActiveIcon, path }) => (
                            <React.Fragment key={name}>
                                {name === 'Clients' && <Typography className={styles.title}>Collaborate</Typography>}
                                {name === 'Services' && <Typography className={styles.title}>Tools</Typography>}
                                <ListItem disablePadding className={`${styles.listItem} ${currentPath === path ? styles.activeItem : ''}`}>
                                    <ListItemButton onClick={() => handleClick(path)} className={styles.listItemBtn}>
                                        <ListItemIcon className={styles.listItemIcon}>
                                            <img
                                                src={currentPath === path ? ActiveIcon : Icon}
                                                alt={name}
                                                className={`${styles.icon} ${currentPath === path ? styles.activeIcon : ''}`}
                                            />
                                        </ListItemIcon>
                                        <ListItemText primary={name} className={styles.listItemText} />
                                    </ListItemButton>
                                </ListItem>
                            </React.Fragment>
                        ))}
                    </List>
                </Box>
                <Box className={styles.lowerRow}>
                    <List className={styles.list}>
                        {lowerRowItems.map(({ name, path, Icon, ActiveIcon }) => (
                            <ListItem key={name} disablePadding className={`${styles.listItem} ${currentPath === path ? styles.activeItem : ''}`}>
                                <ListItemButton onClick={() => handleClick(path)}>
                                    <ListItemIcon className={styles.listItemIcon}>
                                        <img
                                            src={currentPath === path ? ActiveIcon : Icon}
                                            alt={name}
                                            className={`${styles.icon} ${currentPath === path ? styles.activeIcon : ''}`}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={name} className={styles.listItemText} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
        </Drawer>
    );
};

export default Sidebar;

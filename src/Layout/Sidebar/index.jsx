import React from 'react';
import styles from './page.module.scss';
import logoimage from '../../assets/Hide-sidebar.svg';
import { RouteNames } from '../../Constants/route';
import { drawerWidth } from '../../Constants/app';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

import DashboardIcon from '../../assets/dashboard.svg';
import ProjectsIcon from '../../assets/Project.svg';
import MessagesIcon from '../../assets/Message.png';
import ClientsIcon from '../../assets/Client.svg';
import TeamsIcon from '../../assets/Team.svg';
import MeetingsIcon from '../../assets/Meetings.svg';
import ReferralsIcon from '../../assets/Referrals.svg';
import ServicesIcon from '../../assets/Services.svg';
import ContractsIcon from '../../assets/Contracts.svg';
import InvoicesIcon from '../../assets/Invoices.svg';
import FormsIcon from '../../assets/Forms.svg';
import FinancesIcon from '../../assets/finances.svg';

import DashboardIconWhite from '../../assets/Dashboard active.svg';
import ProjectsIconWhite from '../../assets/Project active.svg';
import MessagesIconWhite from '../../assets/Message active.svg';
import ClientsIconWhite from '../../assets/Client active.svg';
import TeamsIconWhite from '../../assets/Team active.svg';
import MeetingsIconWhite from '../../assets/Meetings active.svg';
import ReferralsIconWhite from '../../assets/Referrals active.svg';
import ServicesIconWhite from '../../assets/Services active.svg';
import ContractsIconWhite from '../../assets/Contracts active.svg';
import InvoicesIconWhite from '../../assets/Invoices acitve.svg';
import FormsIconWhite from '../../assets/Forms active.svg';
import FinancesIconWhite from '../../assets/Finances active.svg';
import { useAuth } from '../../context/AuthProvider';
// import SettingsIconWhite from '../../assets/Settings active.svg';

const Sidebar = () => {
    const { theme, mode } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const pages = [
        { name: 'Department', path: `/${RouteNames.DASHBOARD}`, Icon: DashboardIcon, ActiveIcon: DashboardIconWhite },
        { name: 'Projects', path: `/${RouteNames.PROJECT}`, Icon: ProjectsIcon, ActiveIcon: ProjectsIconWhite },
        { name: 'Messages', path: `/${RouteNames.MESSAGE}`, Icon: MessagesIcon, ActiveIcon: MessagesIconWhite },
        { name: 'SOP\'s', path: `/${RouteNames.CLIENT}`, Icon: ClientsIcon, ActiveIcon: ClientsIconWhite },
        { name: 'Teams', path: `/${RouteNames.TEAMS}`, Icon: TeamsIcon, ActiveIcon: TeamsIconWhite },
        { name: 'Meetings', path: `/${RouteNames.MEETINGS}`, Icon: MeetingsIcon, ActiveIcon: MeetingsIconWhite },
        { name: 'Referrals', path: `/${RouteNames.REFERRALS}`, Icon: ReferralsIcon, ActiveIcon: ReferralsIconWhite },
        { name: 'Services', path: `/${RouteNames.SERVICES}`, Icon: ServicesIcon, ActiveIcon: ServicesIconWhite },
        { name: 'Contracts', path: `/${RouteNames.CONTRACTS}`, Icon: ContractsIcon, ActiveIcon: ContractsIconWhite },
        { name: 'Invoices', path: `/${RouteNames.INVOICES}`, Icon: InvoicesIcon, ActiveIcon: InvoicesIconWhite },
        { name: 'Forms', path: `/${RouteNames.FORMS}`, Icon: FormsIcon, ActiveIcon: FormsIconWhite },
        { name: 'Finances', path: `/${RouteNames.FINANCES}`, Icon: FinancesIcon, ActiveIcon: FinancesIconWhite },
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
            }}>

            {/* <Box className={styles.sidebar}> */}
            <Box
                className={styles.sidebar}
                style={{
                    '--sidebar-background': mode === 'light' ? theme.palette.background.paper : theme.palette.background.default,
                    '--text-primary': mode === 'light' ? theme.palette.text.primary : theme.palette.text.primary,
                    '--hover-color': mode === 'light' ? 'rgba(128, 128, 128, 0.2)' : 'rgba(149, 149, 149, 0.1)',
                    '--active-background': mode === 'light' ? 'rgb(0, 0, 0)' : 'rgba(226, 223, 210, 0.3)',
                    '--active-text': mode === 'light' ? 'rgb(255, 255, 255)' : theme.palette.text.primary,
                    '--logo-brightness': mode === 'light' ? '1' : '0.8',
                    '--icon-brightness': mode === 'light' ? '1' : '1',
                }}>

                <Box className={styles.upperRow}>
                    <Box className={styles.logo}>
                        <img className={styles.image} src={logoimage} alt="image" />
                    </Box>

                    <List className={styles.list}>

                        {pages.map(({ name, Icon, ActiveIcon, path }) => (
                            <React.Fragment key={name}>
                                {name === 'Clients' && <Typography className={styles.title}>Collaborate</Typography>}
                                {name === 'Services' && <Typography className={styles.title}>Tools</Typography>}
                                <ListItem disablePadding className={`
                                    ${styles.listItem} 
                                     ${(name === 'Projects' && currentPath.includes(RouteNames.ADDPROJECTS)) || currentPath === path ? styles.activeItem : ''}
                                    ${(name === 'SOP\'s' && currentPath.includes(RouteNames.SINGLEVIDEO)) || currentPath === path ? styles.activeItem : ''}
                                    `}>

                                    <ListItemButton onClick={() => handleClick(path)} className={styles.listItemBtn}>
                                        <ListItemIcon className={styles.listItemIcon}>
                                            <img
                                                src={
                                                    (name === 'Projects' && currentPath.includes(RouteNames.ADDPROJECTS)) ||
                                                        (name === 'SOP\'s' && currentPath.includes(RouteNames.SINGLEVIDEO)) ||
                                                        currentPath === path ? ActiveIcon : Icon}
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

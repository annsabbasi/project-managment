import React from "react";
import styles from "./page.module.scss";
import logoimage from "../../assets/Hide-sidebar.svg";
import { RouteNames } from "../../Constants/route";
import { drawerWidth } from "../../Constants/app";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

// Importing Material UI icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
// import PaymentIcon from "@mui/icons-material/Payment";
import AssignmentIcon from "@mui/icons-material/Assignment";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const pages = [
    {
      name: "Dashboard",
      path: `/${RouteNames.SUPERDASHBOARD}`,
      Icon: DashboardIcon,
      ActiveIcon: DashboardIcon,
    },
    {
      name: "Companies",
      path: `/${RouteNames.USERS}`,
      Icon: PersonIcon,
      ActiveIcon: PersonIcon,
    },

    // {
    //   name: "Payments",
    //   path: `/${RouteNames.PAYMENT}`,
    //   Icon: PaymentIcon,
    //   ActiveIcon: PaymentIcon,
    // },
    {
      name: "Subscriptions",
      path: `/${RouteNames.SUBSCRIPTION}`,
      Icon: LocalOfferIcon,
      ActiveIcon: LocalOfferIcon,
    },

    {
      name: "Plans",
      path: `/${RouteNames.PLANS}`,
      Icon: AssignmentIcon,
      ActiveIcon: AssignmentIcon,
    },
    {
      name: "Notifications",
      path: `/${RouteNames.NOTIFICATIONS}`,
      Icon: NotificationsIcon,
      ActiveIcon: NotificationsIcon,
    },
    {
      name: "Settings",
      path: `/${RouteNames.SETTINGS}`,
      Icon: SettingsIcon,
      ActiveIcon: SettingsIcon,
    },
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
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          alignItems: "center",
          overflow: "hidden",
        },
      }}
    >
      <Box className={styles.sidebar}>
        <Box className={styles.upperRow}>
          <Box className={styles.logo}>
            <img className={styles.image} src={logoimage} alt="logo" />
          </Box>

          <List className={styles.list}>
            {pages.map(({ name, Icon, ActiveIcon, path }) => (
              <React.Fragment key={name}>
                <ListItem
                  disablePadding
                  className={`${styles.listItem} ${
                    currentPath === path ? styles.activeItem : ""
                  }`}
                >
                  <ListItemButton
                    onClick={() => handleClick(path)}
                    className={styles.listItemBtn}
                  >
                    <ListItemIcon className={styles.listItemIcon}>
                      <Icon
                        sx={{
                          color: currentPath === path ? "white" : "gray",
                        }}
                        className={`${styles.icon} ${
                          currentPath === path ? styles.activeIcon : ""
                        }`}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={name}
                      className={styles.listItemText}
                    />
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

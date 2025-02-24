import { useState } from "react";

import style from "./DashboardScss/project.module.scss"
import PropTypes from 'prop-types';
import Videos from "./AddVideos/Videos";
import Uploads from "./AddVideos/Uploads";


import {
    Box, Stack,
    Tab, Tabs,
} from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { RouteNames } from "../../Constants/route";
import { useAuth } from "../../context/AuthProvider";
import Pdf from "./AddVideos/Pdf";


const CustomTabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simpleTabPanel-${index}`}
            aria-labelledby={`simpleTabPanel-${index}`}
            {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    )
}


const allyProps = (index) => {
    return {
        id: `simpleTab-${index}`,
        'aria-controls': `simpleTab-${index}`
    }
}


export default function Client() {
    const { theme, mode } = useAuth();
    const themeTab = mode === 'light' ? '#36454F' : theme.palette.text.primary;
    const [activeTab, setActiveTab] = useState(0)
    const handleChangeTab = (event, newValue) => {
        setActiveTab(newValue)
    }
    const location = useLocation()
    const isClientPage = location.pathname.includes(`${RouteNames.SINGLEVIDEO}`)


    return (
        <Box>
            {!isClientPage && (
                <>
                    <Stack flexDirection="row" width="100%" alignItems="center" justifyContent="center">

                        <Tabs
                            onChange={handleChangeTab}
                            aria-label="user details tabs"
                            value={activeTab}
                            TabIndicatorProps={{ sx: { display: 'none' } }}
                            sx={{ backgroundColor: theme.palette.background.default }}
                            className={style.Tabs}>

                            <Tab
                                {...allyProps(0)}
                                label="Videos"
                                sx={(theme) => ({
                                    backgroundColor: activeTab === 0 ? theme.palette.background.paper : 'transparent',
                                    color: activeTab === 0 ? `${themeTab} !important` : 'grey',
                                    fontWeight: activeTab === 0 ? '600' : '500',
                                    '&.Mui-selected': {
                                        color: theme.palette.grey.darkGrey,
                                    },
                                })}
                                className={style.Tab} />


                            <Tab
                                label="Upload"
                                {...allyProps(1)}
                                sx={(theme) => ({
                                    backgroundColor: activeTab === 1 ? theme.palette.background.paper : 'transparent',
                                    color: activeTab === 1 ? `${themeTab} !important` : 'grey',
                                    fontWeight: activeTab === 1 ? '600' : '500',
                                    '&.Mui-selected': {
                                        color: theme.palette.grey.darkGrey,
                                    },
                                })}
                                className={style.Tab} />


                            <Tab
                                label="Pdf"
                                {...allyProps(2)}
                                sx={(theme) => ({
                                    backgroundColor: activeTab === 2 ? theme.palette.background.paper : 'transparent',
                                    color: activeTab === 2 ? `${themeTab} !important` : 'grey',
                                    fontWeight: activeTab === 2 ? '600' : '500',
                                    '&.Mui-selected': {
                                        color: theme.palette.grey.darkGrey,
                                    },
                                })}
                                className={style.Tab} />


                        </Tabs>
                    </Stack>


                    <Box>
                        <CustomTabPanel value={activeTab} index={0}>
                            <Videos />
                        </CustomTabPanel>

                        <CustomTabPanel value={activeTab} index={1}>
                            <Uploads />
                        </CustomTabPanel>

                        <CustomTabPanel value={activeTab} index={2}>
                            <Pdf />
                        </CustomTabPanel>
                    </Box>
                </>
            )}

            <Outlet />
        </Box >
    )
}

CustomTabPanel.propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
};

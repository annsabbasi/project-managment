import PropTypes from 'prop-types';
import Basic from "./basic"
import Premium from "./premium"
import Standard from "./standard"
import Request from "./request"

import { useState } from "react";
import { Box, Stack, Tab, Tabs, } from "@mui/material";
import style from "../../../Pages/Dashboard/DashboardScss/project.module.scss"
import { useAuth } from '../../../context/AuthProvider';


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


export default function Project() {
    const { theme, mode } = useAuth();
    const themeTab = mode === 'light' ? '#36454F' : theme.palette.text.primary;
    const [activeTab, setActiveTab] = useState(0)

    const handleChangeTab = (event, newValue) => {
        setActiveTab(newValue)
    }



    return (
        <Box>
            <Stack flexDirection="row" width="100%" alignItems="center" justifyContent="space-between" flex>
                <Stack>&nbsp;</Stack>

                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                    <Tabs
                        onChange={handleChangeTab}
                        aria-label="user details tabs"
                        value={activeTab}
                        TabIndicatorProps={{ sx: { display: 'none' } }}
                        sx={{ backgroundColor: theme.palette.background.default }}
                        className={style.Tabs}>
                        <Tab
                            {...allyProps(0)}
                            label="Basic"
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
                            {...allyProps(1)}
                            label="Standard"
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
                            {...allyProps(2)}
                            label="Premium"
                            sx={(theme) => ({
                                backgroundColor: activeTab === 2 ? theme.palette.background.paper : 'transparent',
                                color: activeTab === 2 ? `${themeTab} !important` : 'grey',
                                fontWeight: activeTab === 2 ? '600' : '500',
                                '&.Mui-selected': {
                                    color: theme.palette.grey.darkGrey,
                                },
                            })}
                            className={style.Tab} />


                        <Tab
                            {...allyProps(3)}
                            label="Request"
                            sx={(theme) => ({
                                backgroundColor: activeTab === 3 ? theme.palette.background.paper : 'transparent',
                                color: activeTab === 3 ? `${themeTab} !important` : 'grey',
                                fontWeight: activeTab === 3 ? '600' : '500',
                                '&.Mui-selected': {
                                    color: theme.palette.grey.darkGrey,
                                },
                            })}
                            className={style.Tab} />
                    </Tabs>
                </Box>
            </Stack>


            <Box>
                <CustomTabPanel value={activeTab} index={0}>
                    <Basic />
                </CustomTabPanel>

                <CustomTabPanel value={activeTab} index={1}>
                    <Standard />
                </CustomTabPanel>

                <CustomTabPanel value={activeTab} index={2}>
                    <Premium />
                </CustomTabPanel>

                <CustomTabPanel value={activeTab} index={3}>
                    <Request />
                </CustomTabPanel>
            </Box>
        </Box >
    )
}



CustomTabPanel.propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
};
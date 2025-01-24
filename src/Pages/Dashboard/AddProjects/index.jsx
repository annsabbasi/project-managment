import PropTypes from 'prop-types';
import OverView from "./Overview"
import Teams from "./Teams"
import Assign from "./Assign"
import style from "./style.module.scss"
// import theme from "../../../Theme/Theme";
import Videos from "./Videos"
import Time from "./Time"

{/* Further Tabs if Needed Imports! */ }
import Files from "./Files"
// import Time from "./Time"
import Controls from "./Controls"

import { useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {
    Tab, Tabs,
    Typography, Box,
    IconButton, Stack,
} from "@mui/material";
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


export default function AddProjects() {
    const { theme, mode } = useAuth();
    const themeTab = mode === 'light' ? '#36454F' : theme.palette.text.primary;
    const [activeTab, setActiveTab] = useState(0)
    const handleChangeTab = (event, newValue) => {
        setActiveTab(newValue)
    }


    return (
        <Box>
            <Stack flexDirection="row" width="100%" alignItems="center" justifyContent="center">

                <Link className={style.goBack} to={`/project`}>
                    <IconButton disableRipple >
                        <ArrowBackIosNewIcon sx={{ color: theme.palette.text.primary }} />
                    </IconButton>
                    <Typography className={style.goBackTitle} sx={{ color: theme.palette.text.primary }}>Go Back</Typography>
                </Link>

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
                            label="Overview"
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
                            label="Docs"
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
                            label="Videos"
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


                        <Tab
                            label="Team"
                            {...allyProps(3)}
                            sx={(theme) => ({
                                backgroundColor: activeTab === 3 ? theme.palette.background.paper : 'transparent',
                                color: activeTab === 3 ? `${themeTab} !important` : 'grey',
                                fontWeight: activeTab === 3 ? '600' : '500',
                                '&.Mui-selected': {
                                    color: theme.palette.grey.darkGrey,
                                },
                            })}
                            className={style.Tab} />


                        <Tab
                            label="Assign"
                            {...allyProps(4)}
                            sx={(theme) => ({
                                backgroundColor: activeTab === 4 ? theme.palette.background.paper : 'transparent',
                                color: activeTab === 4 ? `${themeTab} !important` : 'grey',
                                fontWeight: activeTab === 4 ? '600' : '500',
                                '&.Mui-selected': {
                                    color: theme.palette.grey.darkGrey,
                                },
                            })}
                            className={style.Tab} />


                        <Tab
                            label="Leaderboard"
                            {...allyProps(5)}
                            sx={(theme) => ({
                                backgroundColor: activeTab === 5 ? theme.palette.background.paper : 'transparent',
                                color: activeTab === 5 ? `${themeTab} !important` : 'grey',
                                fontWeight: activeTab === 5 ? '600' : '500',
                                '&.Mui-selected': {
                                    color: theme.palette.grey.darkGrey,
                                },
                            })}
                            className={style.Tab} />


                        {/* Further Tabs if Needed! */}
                        <Tab
                            label="Statics"
                            {...allyProps(6)}
                            sx={(theme) => ({
                                backgroundColor: activeTab === 6 ? theme.palette.background.paper : 'transparent',
                                color: activeTab === 6 ? `${themeTab} !important` : 'grey',
                                fontWeight: activeTab === 6 ? '600' : '500',
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
                    <OverView />
                </CustomTabPanel>

                <CustomTabPanel value={activeTab} index={1}>
                    <Files />
                </CustomTabPanel>

                <CustomTabPanel value={activeTab} index={2}>
                    <Videos />
                </CustomTabPanel>

                <CustomTabPanel value={activeTab} index={3}>
                    <Teams />
                </CustomTabPanel>

                <CustomTabPanel value={activeTab} index={4}>
                    <Assign />
                </CustomTabPanel>
                <CustomTabPanel value={activeTab} index={5}>
                    <Time />
                </CustomTabPanel>
                <CustomTabPanel value={activeTab} index={6}>
                    <Controls />
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
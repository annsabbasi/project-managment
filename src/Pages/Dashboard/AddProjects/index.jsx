import PropTypes from 'prop-types';
import OverView from "./Overview"
import Teams from "./Teams"
import Assign from "./Assign"
import project from "./style.module.scss"
import theme from "../../../Theme/Theme";
import Videos from "./Videos"
import Time from "./Time"

{/* Further Tabs if Needed Imports! */ }
import Files from "./Files"
// import Time from "./Time"
// import Controls from "./Controls"

import { useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {
    Tab, Tabs,
    Typography, Box,
    IconButton, Stack,
} from "@mui/material";

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
    const [activeTab, setActiveTab] = useState(0)
    const handleChangeTab = (event, newValue) => {
        setActiveTab(newValue)
    }


    return (
        <Box>
            <Stack flexDirection="row" width="100%" alignItems="center" justifyContent="center">
                <Link className={project.goBack} to={`/project`}>
                    <IconButton disableRipple sx={{
                        '&:hover': {
                            backgroundColor: 'transparent'
                        }
                    }} className={project.goBackIconContent}>
                        <ArrowBackIosNewIcon sx={{
                            color: theme.palette.grey[800],
                        }} className={project.goBackIcon} />
                    </IconButton>
                    <Typography className={project.goBackTitle}>Project Title</Typography>
                </Link>

                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                    <Tabs
                        onChange={handleChangeTab}
                        aria-label="user details tabs"
                        value={activeTab}
                        TabIndicatorProps={{ sx: { display: 'none' } }}
                        sx={{ backgroundColor: 'white' }}
                        className={project.Tabs}>
                        <Tab
                            {...allyProps(0)}
                            label="Overview"
                            sx={(theme) => ({
                                backgroundColor: activeTab === 0 ? theme.palette.grey.hoverGrey : 'transparent',
                                color: activeTab === 0 ? theme.palette.grey.darkGrey : 'grey',
                                fontWeight: activeTab === 0 ? '600' : '500',
                                '&.Mui-selected': {
                                    color: theme.palette.grey.darkGrey,
                                },
                            })} className={project.Tab} />
                        <Tab
                            label="Docs"
                            {...allyProps(1)}
                            sx={(theme) => ({
                                backgroundColor: activeTab === 1 ? theme.palette.grey.hoverGrey : 'transparent',
                                color: activeTab === 1 ? theme.palette.grey.darkGrey : 'grey',
                                fontWeight: activeTab === 1 ? '600' : '500',
                                '&.Mui-selected': {
                                    color: theme.palette.grey.darkGrey,
                                },
                            })}
                            className={project.Tab} />


                        <Tab
                            label="Videos"
                            {...allyProps(2)}
                            sx={(theme) => ({
                                backgroundColor: activeTab === 2 ? theme.palette.grey.hoverGrey : 'transparent',
                                color: activeTab === 2 ? theme.palette.grey.darkGrey : 'grey',
                                fontWeight: activeTab === 2 ? '600' : '500',
                                '&.Mui-selected': {
                                    color: theme.palette.grey.darkGrey,
                                },
                            })} className={project.Tab} />


                        <Tab
                            label="Team"
                            {...allyProps(3)}
                            sx={(theme) => ({
                                backgroundColor: activeTab === 3 ? theme.palette.grey.hoverGrey : 'transparent',
                                color: activeTab === 3 ? theme.palette.grey.darkGrey : 'grey',
                                fontWeight: activeTab === 3 ? '600' : '500',
                                '&.Mui-selected': {
                                    color: theme.palette.grey.darkGrey,
                                },
                            })} className={project.Tab} />


                        <Tab
                            label="Assign"
                            {...allyProps(4)}
                            sx={(theme) => ({
                                backgroundColor: activeTab === 4 ? theme.palette.grey.hoverGrey : 'transparent',
                                color: activeTab === 4 ? theme.palette.grey.darkGrey : 'grey',
                                fontWeight: activeTab === 4 ? '600' : '500',
                                '&.Mui-selected': {
                                    color: theme.palette.grey.darkGrey,
                                },
                            })} className={project.Tab} />


                        <Tab
                            label="Leaderboard"
                            {...allyProps(5)}
                            sx={(theme) => ({
                                backgroundColor: activeTab === 5 ? theme.palette.grey.hoverGrey : 'transparent',
                                color: activeTab === 5 ? theme.palette.grey.darkGrey : 'grey',
                                fontWeight: activeTab === 5 ? '600' : '500',
                                '&.Mui-selected': {
                                    color: theme.palette.grey.darkGrey,
                                },
                            })}
                            className={project.Tab} />


                        {/* Further Tabs if Needed! */}
                        {/* <Tab
                        label="Controls"
                        {...allyProps(5)}
                        sx={(theme) => ({
                            backgroundColor: activeTab === 5 ? theme.palette.grey.hoverGrey : 'transparent',
                            color: activeTab === 5 ? theme.palette.grey.darkGrey : 'grey',
                            fontWeight: activeTab === 5 ? '600' : '500',
                            '&.Mui-selected': {
                                color: theme.palette.grey.darkGrey,
                            },
                        })}
                        className={project.Tab} /> */}
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
            </Box>
        </Box >
    )
}



CustomTabPanel.propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
};
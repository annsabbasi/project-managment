import PropTypes from 'prop-types';
import OverView from "./Overview"
import Teams from "./Teams"
import Assign from "./Assign"
import style from "./style.module.scss"
import Videos from "./Videos"
import Time from "./Time"


import Files from "./Files"
import Controls from "./Controls"


import {
    Button, Tab, Tabs,
    IconButton, Stack,
    Typography, Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../../../context/AuthProvider';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import SouthWestIcon from '@mui/icons-material/SouthWest';
import PauseIcon from "@mui/icons-material/Pause";




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

    const hoverStyles =
        mode === "light"
            ? {
                backgroundColor: "rgba(52, 52, 52, 0.1) !important",
                color: "#343434",
                boxShadow: 0
            }
            : {
                backgroundColor: "rgba(250, 249, 246, 0.1) !important",
                border: "1px solid transparent",
                color: "#FAF9F6 !important",
            };


    const trackerBtnsStyles = mode === 'light' ? {
        backgroundColor: "#343434 !important",
        color: "#FAF9F6",
        boxShadow: 0
    } : {
        backgroundColor: "#FAF9F6 !important",
        border: "#FAF9F6",
        color: "#343434",
    }


    const [activeTab, setActiveTab] = useState(0)
    const handleChangeTab = (event, newValue) => {
        setActiveTab(newValue)
    }


    // Working of The Time Tracker 
    const [isTracking, setIsTracking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [time, setTime] = useState(0); // Time in seconds
    const [isStopped, setIsStopped] = useState(false);

    useEffect(() => {
        let timer;
        if (isTracking && !isPaused && !isStopped) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isTracking, isPaused, isStopped]);

    // Format time as HH:MM:SS
    const formatTime = (seconds) => {
        const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
        const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
        const secs = String(seconds % 60).padStart(2, "0");
        return `${hrs}:${mins}:${secs}`;
    };

    const handleCheckIn = () => {
        setIsTracking(true);
        setIsPaused(false);
        setIsStopped(false);
    };

    const handlePauseResume = () => {
        setIsPaused((prev) => !prev);
    };

    const handleCheckOut = () => {
        setIsStopped(true);
        setIsTracking(false);
    };


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

                <Stack flexDirection="row" gap="8px" alignItems="center" mr={3}>
                    <Typography>{formatTime(time)}</Typography>

                    {!isTracking && !isStopped && (
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<SouthWestIcon sx={{ fontSize: "1rem !important" }} />}
                            onClick={handleCheckIn}
                            sx={{ "&:hover": hoverStyles, ...trackerBtnsStyles }} className={style.timeCheckBtn}>Check-In</Button>
                    )}

                    {isTracking && (
                        <Stack flexDirection="row" gap="8px" alignItems="center">
                            <IconButton
                                aria-label={isPaused ? "resume" : "pause"}
                                size="small"
                                onClick={handlePauseResume}
                                sx={{ "&:hover": hoverStyles, borderRadius: "100% !important", ...trackerBtnsStyles }} className={style.timeCheckBtn}><PauseIcon /></IconButton>
                            <Button
                                variant="contained"
                                size="small"
                                startIcon={<ArrowOutwardIcon sx={{ fontSize: "1rem !important" }} />}
                                onClick={handleCheckOut}
                                sx={{ "&:hover": hoverStyles, ...trackerBtnsStyles }} className={style.timeCheckBtn}>Check-Out</Button>
                        </Stack>
                    )}
                </Stack>
            </Stack >


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


{/* <Stack flexDirection="row" gap="8px" alignItems="center" mr={3}>
                    <Typography>00:00:00</Typography>
                    <Button variant='contained' size='small' startIcon={<SouthWestIcon sx={{ fontSize: "1rem !important", }} />} sx={{ "&:hover": hoverStyles, ...trackerBtnsStyles }} className={style.timeCheckBtn}>Check-In</Button>
                    <Stack flexDirection="row" gap="8px" alignItems="center">
                        <IconButton
                            aria-label="pause"
                            size="small"
                            sx={{ "&:hover": hoverStyles, borderRadius: "100% !important", ...trackerBtnsStyles }} className={style.timeCheckBtn}>
                            <PauseIcon />
                        </IconButton>
                        <Button variant='contained' size='small' startIcon={<ArrowOutwardIcon sx={{ fontSize: "1rem !important" }} />} sx={{ "&:hover": hoverStyles, ...trackerBtnsStyles }} className={style.timeCheckBtn}>Check-Out</Button>
                    </Stack>
                </Stack> */}
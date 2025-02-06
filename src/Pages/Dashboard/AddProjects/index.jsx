import PropTypes from 'prop-types';
import style from "./style.module.scss"

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from '../../../context/AuthProvider';

import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import SouthWestIcon from '@mui/icons-material/SouthWest';
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

import OverView from "./Overview"
import Teams from "./Teams"
import Assign from "./Assign"
import Videos from "./Videos"
import Time from "./Time"
import Files from "./Files"
import Controls from "./Controls"

import {
    Button, Tab, Tabs,
    IconButton, Stack,
    Typography, Box,
} from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


import {
    userCheckIn, userCheckOut,
    userGetElapsedTime, userPauseOrResume,
} from '../../../api/userTracker';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';



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
        mode === "light" ? {
            backgroundColor: "rgba(52, 52, 52, 0.1) !important",
            color: "#343434",
            boxShadow: 0
        } : {
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
        color: "#343434",
        border: "#FAF9F6",
    }

    const [activeTab, setActiveTab] = useState(0)
    const handleChangeTab = (event, newValue) => {
        setActiveTab(newValue)
    }


    const { id: ProjectId } = useParams();
    const [userElapsedTime, setUserElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isCheckedOut, setIsCheckedOut] = useState(false)
    const queryClient = useQueryClient();


    // For The User Actual CheckIn
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const { mutate: checkIn } = useMutation({
        mutationFn: () => userCheckIn(ProjectId),
        onSuccess: (data) => {
            setIsCheckedIn(true);
            toast.success(`${data.message}`);
            // setIsTracking(true);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Check-in failed.");
        },
    })


    // For The User Actual ElapsedTime
    const { data: elapsedTime } = useQuery({
        queryKey: ['elapsedTime', ProjectId],
        // queryFn: userGetElapsedTime,
        queryFn: () => userGetElapsedTime(ProjectId),
        staleTime: 1000 * 60,
        refetchInterval: 750,
    })

    useEffect(() => {
        if (elapsedTime?.data) {
            setUserElapsedTime(elapsedTime.data.elapsedTime);
            setIsCheckedOut(elapsedTime.data.isCheckedOut);
            setIsRunning(elapsedTime.data.isRunning);
        }
    }, [elapsedTime]);

    console.log("elapsedTime", elapsedTime)


    // For The User Pause or Remume Time
    const toggleResumePause = useMutation({
        mutationFn: () => userPauseOrResume(ProjectId),
        onSuccess: () => {
            queryClient.invalidateQueries(['elapsedTime']);
            // toast.success("Timer updated successfully!");
            // console.log("Data onSuccess ResumePause", data)
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update timer.");
        }
    })


    // For The User Actual CheckOut
    const { mutate: checkOut, isLoading: isCheckingOut, data: checkOutData } = useMutation({
        // mutationFn: userCheckOut,
        mutationFn: () => userCheckOut(ProjectId),
        onSuccess: () => {
            // setIsTracking(false);
            setIsCheckedIn(false);
            setIsCheckedOut(true);
            toast.success("Checked out successfully!");
            queryClient.invalidateQueries(['elapsedTime']);
            // console.log("CheckOut Frontend", data)
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Check-out failed.");
        }
    });
    const totalCheckOutData = checkOutData?.data?.totalDuration
    console.log("(CheckOut Data) AddProjects", checkOutData?.data)


    // Format Time Settings
    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return "00:00:00";

        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };


    // const { data: userData } = useQuery({
    //     queryKey: ['elapsedTime', ProjectId],
    //     queryFn: () => userTimeProject(ProjectId)
    // })
    // console.log("UserData for the Login Time Track USER!!!", userData)

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
                    <Typography>
                        {elapsedTime?.data?.elapsedTime !== undefined ? (totalCheckOutData ? formatTime(totalCheckOutData) : formatTime(elapsedTime?.data?.elapsedTime)) : "00:00:00"}
                        {/* {elapsedTime?.elapsedTime !== undefined ? formatTime(elapsedTime?.elapsedTime) : "00:00:00"} */}
                        {/* {elapsedTime?.elapsedTime !== undefined ? formatTime(totalCheckOutData) : "00:00:00"} */}
                    </Typography>

                    {/* {!isRunning && !isCheckedOut && !isCheckedIn && ( */}
                    {!isRunning && !isCheckedOut && !isCheckedIn && (
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<SouthWestIcon sx={{ fontSize: "1rem !important" }} />}
                            // onClick={handleCheckIn}
                            onClick={checkIn}
                            sx={{ "&:hover": hoverStyles, ...trackerBtnsStyles }} className={style.timeCheckBtn}>Check-In</Button>
                    )}

                    {/* {actionsShown && ( */}
                    {isCheckedIn && !isCheckedOut && (
                        <Stack flexDirection="row" gap="8px" alignItems="center">
                            <IconButton
                                aria-label={isRunning ? "resume" : "pause"}
                                size="small"
                                onClick={() => toggleResumePause.mutate()}
                                disabled={isCheckedOut}
                                sx={{ "&:hover": hoverStyles, borderRadius: "100% !important", ...trackerBtnsStyles, "&.Mui-disabled": { color: "gray", backgroundColor: "#f0f0f0 !important" } }} className={style.timeCheckBtn}>
                                {isRunning ? <PauseIcon /> : <PlayArrowRoundedIcon />}
                            </IconButton>
                            <Button
                                variant="contained"
                                size="small"
                                // onClick={checkOut}
                                onClick={() => checkOut()}
                                disabled={isCheckedOut}
                                startIcon={<ArrowOutwardIcon sx={{ fontSize: "1rem !important" }} />}
                                sx={{ "&:hover": hoverStyles, ...trackerBtnsStyles, "&.Mui-disabled": { color: "gray", backgroundColor: "#f0f0f0 !important" } }} className={style.timeCheckBtn}>{isCheckingOut ? "Checking Out..." : "Check-Out"}</Button>
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
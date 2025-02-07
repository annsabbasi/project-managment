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
    userTimeProject,
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
    const queryClient = useQueryClient();

    const [isRunning, setIsRunning] = useState(false);
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [isCheckedOut, setIsCheckedOut] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);

    // User ElapsedTime
    const { data: timeData } = useQuery({
        queryKey: ['elapsedTime', ProjectId],
        queryFn: () => userGetElapsedTime(ProjectId),
        onSuccess: (data) => {
            setElapsedTime(data.elapsedTime || 0);
            setIsRunning(data.isRunning);
            setIsCheckedIn(data.isCheckedIn);
            setIsCheckedOut(data.isCheckedOut);
        }
    })
    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setElapsedTime((prevTime) => prevTime + 1);
            }, 1000);
        }
        // I should Have to stop the State instead of the variable State is (elapsedTime) variable (timer)
        return () => clearInterval(timer);
    }, [isRunning]);
    console.log("ElapsedTime timeDate", timeData?.data?.elapsedTime)


    // User CheckIn Time
    const checkInMutation = useMutation({
        mutationFn: () => userCheckIn(ProjectId),
        onSuccess: () => {
            toast.success("Checked in successfully!");
            setIsCheckedIn(true);
            setIsRunning(true);
            queryClient.invalidateQueries(['elapsedTime', ProjectId]);
        },
        onError: () => {
            toast.error("Failed to check in.");
        }
    });


    // User Pause or Resume Time
    // const pauseOrResumeMutation = useMutation({
    //     mutationFn: () => userPauseOrResume(ProjectId),
    //     onSuccess: (response) => {
    //         console.log("Full response in onSuccess:", response);

    //         // Extract data properly
    //         const responseData = response?.data;  // No need to access `responseData.data`
    //         console.log("Extracted data:", responseData.data.elapsedTime);

    //         toast.success(responseData.data.isRunning ? "Resumed successfully!" : "Paused successfully!");
    //         setIsRunning(responseData.isRunning);

    //         // Always update elapsedTime, whether pausing or resuming
    //         setElapsedTime(responseData.data.elapsedTime || 0);
    //         console.log("Updated ElapsedTime:", responseData.data.elapsedTime);
    //     },
    //     onError: () => {
    //         toast.error("Failed to pause/resume.");
    //     }
    // });
    const pauseOrResumeMutation = useMutation({
        mutationFn: () => userPauseOrResume(ProjectId),
        onMutate: async () => {
            // Cancel ongoing queries for elapsed time
            await queryClient.cancelQueries(['elapsedTime', ProjectId]);

            // Get the previous state before mutation
            const previousTimeData = queryClient.getQueryData(['elapsedTime', ProjectId]);

            // Optimistically update the UI
            queryClient.setQueryData(['elapsedTime', ProjectId], (old) => ({
                ...old,
                elapsedTime: old.elapsedTime,  // Keep the current time as is
                isRunning: !old.isRunning      // Toggle running state optimistically
            }));

            return { previousTimeData };
        },
        onSuccess: (response) => {
            console.log("Full response in onSuccess:", response);
            const responseData = response?.data;
            toast.success(responseData.data.isRunning ? "Resumed successfully!" : "Paused successfully!");

            setIsRunning(responseData.data.isRunning);
            // setElapsedTime(responseData.data.elapsedTime || 0);
            // annsabbasi change code
            setElapsedTime((prev) => prev);

            // Ensure TanStack Query refetches the correct data
            queryClient.invalidateQueries(['elapsedTime', ProjectId]);
        },
        onError: (error, variables, context) => {
            toast.error("Failed to pause/resume.");
            // Rollback to previous state if mutation fails
            if (context?.previousTimeData) {
                queryClient.setQueryData(['elapsedTime', ProjectId], context.previousTimeData);
            }
        }
    });





    // User CheckOut Time
    const checkOutMutation = useMutation({
        mutationFn: () => userCheckOut(ProjectId),
        onSuccess: () => {
            toast.success("Checked out successfully!");
            setIsCheckedOut(true);
            setIsRunning(false);
            queryClient.invalidateQueries(['elapsedTime', ProjectId]);
        },
        onError: () => {
            toast.error("Failed to check out.");
        }
    });


    // Format Time
    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };


    const { data: userInfo } = useQuery({
        queryKey: ['userInfo', ProjectId],
        queryFn: () => userTimeProject(ProjectId),
        enabled: !!ProjectId,
    })
    console.log("Single User Data", userInfo?.data.getUserTime.map((e) => e.checkIn ? true : false))
    // const getUserTimeDetail = userInfo?.data?.getUserTime?.map((e) => e.e)
    const getUserTimeDetails = (key) => userInfo?.data?.getUserTime?.map((e) => e[key])
    const value = getUserTimeDetails("checkIn")
    console.log("This is value", value)

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
                    
                    <Typography>{formatTime(elapsedTime)}</Typography>

                    {!isRunning && !isCheckedOut && !isCheckedIn && (
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<SouthWestIcon sx={{ fontSize: "1rem !important" }} />}
                            onClick={() => checkInMutation.mutate()}
                            sx={{ "&:hover": hoverStyles, ...trackerBtnsStyles }}
                            className={style.timeCheckBtn}>
                            Check-In
                        </Button>
                    )}

                    {isCheckedIn && !isCheckedOut && (
                        <Stack flexDirection="row" gap="8px" alignItems="center">
                            <IconButton
                                size="small"
                                onClick={() => pauseOrResumeMutation.mutate()}
                                sx={{ "&:hover": hoverStyles, borderRadius: "100% !important", ...trackerBtnsStyles }}
                                className={style.timeCheckBtn}>
                                {isRunning ? <PauseIcon /> : <PlayArrowRoundedIcon />}
                            </IconButton>
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => checkOutMutation.mutate()}
                                startIcon={<ArrowOutwardIcon sx={{ fontSize: "1rem !important" }} />}
                                sx={{ "&:hover": hoverStyles, ...trackerBtnsStyles }}
                                className={style.timeCheckBtn}>
                                Check-Out
                            </Button>
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
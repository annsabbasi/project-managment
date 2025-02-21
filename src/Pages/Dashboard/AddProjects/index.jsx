import PropTypes from 'prop-types';
import style from "./style.module.scss"

import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
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


import { toast } from 'react-toastify';
import {
    userGetElapsedTime, userPauseOrResume,
    userTimeProject, userCheckIn, userCheckOut,
} from '../../../api/userTracker';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RouteNames } from '../../../Constants/route';



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

    const location = useLocation('')
    const subDetailsPageVar = location.pathname.includes(`${RouteNames.SUBDETAILSPAGE}`)

    const [isRunning, setIsRunning] = useState(false);
    const [isCheckedIn, setIsCheckedIn] = useState(true);
    const [elapsedTime, setElapsedTime] = useState(0);

    // User ElapsedTime
    const { data: timeData } = useQuery({
        queryKey: ['elapsedTime', ProjectId],
        queryFn: () => userGetElapsedTime(ProjectId),
        onSuccess: (data) => {
            console.log("onSuccess Triggered", data);
            setIsRunning(data.isRunning);
        },
        onError: (error) => {
            console.error("Query Failed:", error);
        },
        // Anns abbasi 2/17/2025
        staleTime: 1000 * 60,
        refetchInterval: 1000,
    })
    useEffect(() => {
        if (timeData) {
            setIsRunning(timeData?.data?.isRunning);
            setElapsedTime(timeData?.data?.elapsedTime);
        }
    }, [timeData]);

    // User CheckIn Time
    const checkInMutation = useMutation({
        mutationFn: () => userCheckIn(ProjectId),
        onSuccess: () => {
            toast.success("Checked in successfully!");
            setIsCheckedIn(false);
            setIsRunning(true);
            queryClient.invalidateQueries(['elapsedTime', ProjectId]);
        },
        onError: () => {
            toast.error("Failed to check in.");
        }
    });

    // User Pause or Resume Time
    const pauseOrResumeMutation = useMutation({
        mutationFn: () => userPauseOrResume(ProjectId),
        onMutate: async () => {
            await queryClient.cancelQueries(['elapsedTime', ProjectId]);

            const previousTimeData = queryClient.getQueryData(['elapsedTime', ProjectId]);

            queryClient.setQueryData(['elapsedTime', ProjectId], (old) => ({
                ...old,
                elapsedTime: old.elapsedTime,
                isRunning: !old.isRunning
            }));

            return { previousTimeData };
        },
        onSuccess: (response) => {
            const responseData = response?.data;
            setIsRunning(responseData.data.isRunning);
            setIsCheckedIn(false)
            queryClient.invalidateQueries(['elapsedTime', ProjectId]);
        },
        onError: (error, variables, context) => {
            toast.error("Failed to pause/resume.");
            if (context?.previousTimeData) {
                queryClient.setQueryData(['elapsedTime', ProjectId], context.previousTimeData);
            }
        }
    });
    // console.log("elapsedTime", elapsedTime)
    console.log("timeData", timeData?.data?.elapsedTime)

    // User CheckOut Time
    const checkOutMutation = useMutation({
        mutationFn: () => userCheckOut(ProjectId),
        onSuccess: () => {
            toast.success("Checked out successfully!");
            setIsRunning(false);
            setIsCheckedIn(false);
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


    // Fetching User Timer Details if Present
    const { data: userInfo } = useQuery({
        queryKey: ['userInfo', ProjectId],
        queryFn: () => userTimeProject(ProjectId),
        enabled: !!ProjectId,
    })
    const getUserTimeDetails = (key) => {
        const values = userInfo?.data?.getUserTime?.map((e) => e[key])
        return values?.[0] ?? false;
    }
    const elapsedRuntimeValidation = timeData?.data?.isRunning

    return (
        <Box>
            {!subDetailsPageVar && (

                <>
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
                            {getUserTimeDetails("isCheckedOut") ?
                                (<Typography>{formatTime(getUserTimeDetails("totalDuration"))}</Typography>) :
                                (<Typography>{formatTime(elapsedTime)}</Typography>
                                )}

                            {isCheckedIn && !getUserTimeDetails("isCheckedOut") && !elapsedRuntimeValidation && !getUserTimeDetails("checkIn") && (
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

                            {/* {!getUserTimeDetails("isCheckedOut") && isRunning && ( */}
                            {getUserTimeDetails("checkIn") && !getUserTimeDetails("isCheckedOut") && (
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



// const isToday = (date) => {
//     if (!date) return false;
//     const givenDate = new Date(date);
//     const today = new Date();

//     return (
//         givenDate.getDate() === today.getDate() &&
//         givenDate.getMonth() === today.getMonth() &&
//         givenDate.getFullYear() === today.getFullYear()
//     );
// };

// const getTimeDetailsForToday = (key) => {
//     const checkInDate = getUserTimeDetails("checkIn");
//     const checkOutDate = getUserTimeDetails("isCheckedOut")

//     if (isToday(checkInDate) && isToday(checkOutDate)) {
//         // If checkIn is from today, return the actual value
//         return getUserTimeDetails(key);
//     } else {
//         // If checkIn is not from today, "reset" behavior (e.g., return null, 0, etc.)
//         if (key === "totalDuration" || key === "elapsedTime") return 0;
//         return null;
//     }
// };
// console.log("getTimeDetailsForToday(totalDuration)", getTimeDetailsForToday("totalDuration"))


{/* <Stack flexDirection="row" gap="8px" alignItems="center" mr={3}>
{getTimeDetailsForToday("isCheckedOut") ?
    (<Typography>{formatTime(getUserTimeDetails("totalDuration"))}</Typography>) :
    (<Typography>{formatTime(elapsedTime)}</Typography>
    )}

{isCheckedIn && !getTimeDetailsForToday("isCheckedOut") && (!getTimeDetailsForToday("checkIn") && !getUserTimeDetails("checkIn")) && !elapsedRuntimeValidation && (
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

{/* {!getUserTimeDetails("isCheckedOut") && isRunning && ( */}
// {
//     getUserTimeDetails("checkIn") && (!getTimeDetailsForToday("isCheckedOut") && !getUserTimeDetails("isCheckedOut")) && (
//         <Stack flexDirection="row" gap="8px" alignItems="center">
//             <IconButton
//                 size="small"
//                 onClick={() => pauseOrResumeMutation.mutate()}
//                 sx={{ "&:hover": hoverStyles, borderRadius: "100% !important", ...trackerBtnsStyles }}
//                 className={style.timeCheckBtn}>
//                 {isRunning ? <PauseIcon /> : <PlayArrowRoundedIcon />}
//             </IconButton>
//             <Button
//                 variant="contained"
//                 size="small"
//                 onClick={() => checkOutMutation.mutate()}
//                 startIcon={<ArrowOutwardIcon sx={{ fontSize: "1rem !important" }} />}
//                 sx={{ "&:hover": hoverStyles, ...trackerBtnsStyles }}
//                 className={style.timeCheckBtn}>
//                 Check-Out
//             </Button>
//         </Stack>
//     )
// }
// </Stack > */}
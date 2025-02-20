import style from "./style.module.scss"
import { useState } from "react";
import { useAuth } from "../../../../context/AuthProvider";
import {
    Container, Typography,
    Box, Stack,
    TableBody, TableRow,
    TableCell, TableHead,
    Table, TableContainer,
    Grid, Dialog,
    IconButton
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useQuery } from "@tanstack/react-query";
import { getAllUserScreenShot, getScreenshots } from "../../../../api/subDetailSnapShot";


const Index = () => {
    const { theme, mode } = useAuth();
    const tableGap = mode === 'light' ? style.tableBodyLight : style.tableBodyDark;
    const tableClassText = mode === 'light' ? 'lightTableText' : 'darkTableText';

    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleOpen = (imageSrc) => {
        setSelectedImage(imageSrc);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedImage(null);
    };
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    const { id: ProjectId } = useParams();
    const { data: screenshots } = useQuery({
        queryKey: ['screenshots', ProjectId],
        queryFn: () => getScreenshots(ProjectId),
        enabled: !!ProjectId,
    });
    console.log("screenshots of createdAt", screenshots)

    // Fetch User Tracker Status
    const { data: trackerStatus } = useQuery({
        queryKey: ['userTrackerStatus', ProjectId],
        queryFn: () => getAllUserScreenShot(ProjectId),
        enabled: !!ProjectId,
    });

    console.log("trackerStatus createdAt", trackerStatus)

    const { user } = useAuth();
    const currentUserId = user?._id;


    // Filter Current User Snapshots
    const currentUserScreenshots = trackerStatus?.filter(
        (item) => item.userId._id === currentUserId
    );


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB'); // Example: "20/10/2020"
    };
    // All Users Snapshots (Optional: Could exclude current user if desired)
    // const allUsersScreenshots = trackerStatus;

    const getUserTimeDetails = (key) => {
        const values = screenshots?.map((e) => e[key])
        return values?.[0] ?? false;
    }

    const getAllUsersTimeDetails = (key) => {
        const values = trackerStatus?.map((e) => e[key])
        return values?.[0] ?? false;
    }
    const formatCreatedAtTime = (createdAt) => {
        const date = new Date(createdAt);
        const hrs = String(date.getHours()).padStart(2, '0');
        const mins = String(date.getMinutes()).padStart(2, '0');
        const secs = String(date.getSeconds()).padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    };
    console.log("Home screenshots", formatCreatedAtTime(getAllUsersTimeDetails("createdAt")))


    // TESTING
    const groupByDate = (screenshots) => {
        return screenshots?.reduce((acc, snap) => {
            const dateKey = formatDate(snap.createdAt); // Example: "20/10/2020"
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(snap);
            return acc;
        }, {});
    };
    const groupedUserScreenshots = groupByDate(currentUserScreenshots);

    return (
        <Container >
            <Link className={style.goBack} onClick={goBack}>
                <IconButton disableRipple >
                    <ArrowBackIosNewIcon sx={{ color: theme.palette.text.primary }} />
                </IconButton>
                <Typography className={style.goBackTitle} sx={{ color: theme.palette.text.primary }}>Return</Typography>
            </Link>
            <Stack variant="div" gap={3} my={4}>
                <Box mb={4}>
                    <Typography variant="h5">Your Snapshots</Typography>
                    <Stack >

                        <Stack>
                            {groupedUserScreenshots && Object.entries(groupedUserScreenshots).length > 0 ? (
                                Object.entries(groupedUserScreenshots).map(([date, snaps]) => (
                                    <Stack key={date} mb={3}>
                                        <Typography alignSelf="center">{date}</Typography>
                                        <Stack flexDirection="row" flexWrap="wrap">
                                            {snaps.map((e) => (
                                                <Stack key={e._id} sx={{ margin: "10px" }}>
                                                    <img
                                                        src={e.imageUrl}
                                                        alt="Your Snapshot"
                                                        width={200}
                                                        onClick={() => handleOpen(e.imageUrl)}
                                                        className={style.snapShotImg}
                                                    />
                                                    <Typography sx={{ fontSize: "12px", textAlign: "center" }}>{formatCreatedAtTime(e.createdAt)}</Typography>
                                                </Stack>
                                            ))}
                                        </Stack>
                                    </Stack>
                                ))
                            ) : (
                                <Typography>No Snapshots Available for You</Typography>
                            )}
                        </Stack>
                    </Stack>
                </Box>

                {/* All Users Snapshots */}
                {user?.role === 'admin' && trackerStatus &&
                    Object.entries(
                        trackerStatus.reduce((acc, curr) => {
                            const userName = curr.userId.name;
                            if (!acc[userName]) acc[userName] = [];
                            acc[userName].push(curr);
                            return acc;
                        }, {})
                    ).map(([userName, snapshots]) => {
                        const groupedSnapshots = groupByDate(snapshots);

                        return (
                            <Box key={userName} mb={3}>
                                <Typography variant="h5">{userName}&lsquo;s Snapshots</Typography>
                                {Object.entries(groupedSnapshots).map(([date, snaps]) => (
                                    <Box key={date} mb={2}>
                                        <Typography alignSelf="center" mb={1}>{date}</Typography>
                                        <Stack flexDirection="row" flexWrap="wrap">
                                            {snaps.map((snap) => (
                                                <Stack key={snap._id} sx={{ margin: "10px" }}>
                                                    <img
                                                        src={snap.imageUrl}
                                                        alt="User Snapshot"
                                                        width={200}
                                                        onClick={() => handleOpen(snap.imageUrl)}
                                                        className={style.snapShotImg}
                                                    />
                                                    <Typography sx={{ fontSize: "12px", textAlign: "center" }}>{formatCreatedAtTime(snap.createdAt)}</Typography>
                                                </Stack>
                                            ))}
                                        </Stack>
                                    </Box>
                                ))}
                            </Box>
                        );
                    })
                }



                <Dialog open={open} onClose={handleClose} maxWidth="lg">
                    {selectedImage && (
                        <img
                            src={selectedImage}
                            alt="Enlarged View"
                            style={{ width: "100%", height: "auto" }}
                        />
                    )}
                </Dialog>


                <TableContainer>
                    <Typography variant="h6" mb={1} className={tableClassText}>
                        Employee&apos;s Time-Track
                    </Typography>
                    <Table
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            color: theme.palette.text.primary,
                            overflow: 'visible',
                            borderRadius: '0.6rem'
                        }}>

                        <TableHead>
                            <TableRow className={style.tableRowHead}>
                                <TableCell className={tableClassText}>Employee</TableCell>
                                <TableCell align="center" className={tableClassText}>TimeIn</TableCell>
                                <TableCell align="center" className={tableClassText}>TimeOut</TableCell>
                                <TableCell align="center" className={tableClassText}>Tracked Time</TableCell>
                                <TableCell align="center" className={tableClassText}>Date</TableCell>
                                <TableCell align="center" className={tableClassText}>Weekly Time</TableCell>
                                <TableCell align="center" className={tableClassText}>Monthly Time</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody className={tableGap}>
                            <TableRow className={style.tableRowBody}>
                                <TableCell component="th" scope="row">1</TableCell>
                                <TableCell align="center">21:04</TableCell>
                                <TableCell align="center">3</TableCell>
                                <TableCell align="center">4</TableCell>
                                <TableCell align="center">5</TableCell>
                                <TableCell align="center">6</TableCell>
                                <TableCell align="center">$7</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </Container >
    );
};

export default Index;
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";

import {
    Avatar, Box,
    Table, TableRow,
    IconButton, Menu,
    TableCell, TableBody,
    MenuItem, ListItemIcon,
    Button, Stack, Typography,
    TableHead, TableContainer,
} from "@mui/material";


import style from "./style.module.scss"
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditPointsDialog from "./EditPointsDialog";


import { fetchTaskById } from "../../../../api/taskApi";
import { getSubTask } from "../../../../api/userSubTask";
import { useSubmitTask } from "../../../../hooks/useTask";
import { useAuth } from "../../../../context/AuthProvider";
import { useDeleteSubTask } from "../../../../hooks/useSubTask";


import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";




export default function index() {
    const { user } = useAuth();
    const { id } = useParams();
    const { data: taskData } = useQuery({
        queryKey: ['tasks', id],
        queryFn: () => fetchTaskById(id),
        enabled: !!id,
        staleTime: 50000
    }
    )

    const { mutate: submitTaskMutation } = useSubmitTask();
    const submitPojectMutation = (e) => {
        e.preventDefault();
        if (user?.role === 'admin') {
            submitTaskMutation({ taskId: id, status: 'Completed' });
        }
    }


    const { data: subTasks } = useQuery({
        queryKey: ['userSubtask', id],
        queryFn: () => getSubTask(id),
        enabled: !!id,
        staleTime: 300000,
    });


    // TODO: WORK REMAINING
    const [anchor, setAnchor] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const open = Boolean(anchor);


    const handleClick = (event, taskId) => {
        setAnchor(event.currentTarget);
        setSelectedTask(taskId);
    };
    const handleClose = () => {
        setAnchor(null)
    }


    const { mutate: deleteTask } = useDeleteSubTask();
    const handleDelete = () => {
        deleteTask(selectedTask, {
            onSuccess: () => {
                handleClose();
                toast.success("Task Deleted Successfully", {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: false,
                })
            },
        });
    };


    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const handleEditClickOpen = () => {
        setEditDialogOpen(true);
        handleClose();
    };
    const handleEditCloseTab = () => {
        setEditDialogOpen(false);
        setSelectedTask(null);
    };


    return (
        <Stack variant="main" flexDirection="column" gap={2}>
            <Stack gap={2}>

                <Box variant="div" className={style.boxMain1}>
                    <Box variant="header" sx={{ marginBlock: '0.4rem', marginBottom: '1rem' }}>
                        <Typography variant="h6">Project Info</Typography>
                    </Box>

                    <Stack sx={{ width: '100%' }} gap={2}>
                        <Stack flexDirection="row" width="100%" justifyContent="space-between">
                            <Stack flexDirection="row" gap={2} alignItems="center">
                                <Typography className={style.textGrey}>Team Head</Typography>
                                <Typography className={style.textGreyInfo}>{taskData?.data?.teamLeadName && Array.isArray(taskData?.data?.teamLeadName) && taskData?.data?.teamLeadName.join(', ')}</Typography>
                            </Stack>
                            <Stack flexDirection="row" gap={2} alignItems="center">
                                <Typography className={style.textGrey}>Start Date</Typography>
                                <Typography className={style.textGreyInfo}>3/18/2020</Typography>
                            </Stack>
                        </Stack>

                        <Stack flexDirection="row" width="100%" justifyContent="space-between">
                            <Stack flexDirection="row" gap={2} alignItems="center">
                                <Typography className={style.textGrey}>Status</Typography>
                                <Button variant="text" className={style.statusBtn}>{taskData?.data?.projectStatus}</Button>
                            </Stack>
                            <Stack flexDirection="row" gap={2} alignItems="center">
                                <Typography className={style.textGrey}>Due Date</Typography>
                                <Typography className={style.textGreyInfo} sx={{ color: 'red !important' }}>3/18/2020</Typography>
                            </Stack>
                        </Stack>

                        <Stack flexDirection="row" width="100%" justifyContent="space-between">
                            <Stack flexDirection="row" gap={2} alignItems="center">
                                <Typography className={style.textGrey}>Budget</Typography>
                                <Typography className={style.textGreyInfo}>$-{taskData?.data?.budget}</Typography>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Box sx={{ marginBlock: '0.8rem' }}>
                        <Typography variant="h6" className={style.texth6}>Description</Typography>
                        <Typography variant="p" className={style.textGreyDesc}>{taskData?.data?.description}</Typography>
                    </Box>

                    <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
                        <Box mb={2}>
                            <Typography variant="h6" className={style.texth6}>Project Points</Typography>
                            <Typography variant="p" className={style.textGreyDesc} sx={{ color: 'green !important' }}>{taskData?.data?.points}</Typography>
                        </Box>
                        <Button color="primary"
                            className={`${style.dialogBtnSecondary}`}
                            disabled={user?.role !== 'admin' || taskData?.data?.status === 'Completed'}
                            onClick={submitPojectMutation}
                            sx={{
                                ...(user?.role !== 'admin' || taskData?.data?.status === 'Completed') && {
                                    backgroundColor: '#FFFFF0 !important',
                                    color: '#424242 !important',
                                    textTransform: 'capitalize',
                                    letterSpacing: '1px',
                                    fontWeight: '500 !important'
                                },
                            }}>{taskData?.data?.status === 'Completed' ? 'Submitted' : 'Submit'}</Button>
                    </Stack>
                </Box>
            </Stack>

            <Typography variant="h6" sx={{ marginTop: '15px' }}>SubUser Task</Typography>
            <Stack variant="div" className={style.boxMain2}>
                <TableContainer>
                    {
                        subTasks?.data.length > 0 ? (
                            <Table className={style.table}>
                                <TableHead className={style.tableHead}>
                                    <TableRow className={style.tableRowHead}>
                                        <TableCell align="left" variant="h6" className={style.tableInfo}>Title</TableCell>
                                        <TableCell variant="h6" className={style.tableInfo}>Assign To</TableCell>
                                        <TableCell variant="h6" className={style.tableInfo}>Assign By</TableCell>
                                        <TableCell align="left" variant="h6" className={style.tableInfo}>Description</TableCell>
                                        <TableCell align="left" variant="h6" className={style.tableInfo}>Start Date</TableCell>
                                        <TableCell align="left" variant="h6" className={style.tableInfo}>Due Date</TableCell>
                                        <TableCell align="right" variant="h6" className={style.tableInfo}>Points</TableCell>
                                        <TableCell align="right" variant="h6" className={style.tableInfo}>TaskList</TableCell>
                                        <TableCell align="right" variant="h6" className={style.tableInfo}>&nbsp;</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody >
                                    {subTasks?.data?.map((task, index) => {
                                        return (
                                            <TableRow key={index} className={style.tableRowBody}>
                                                <TableCell component="th" scope="row" >{task.title}</TableCell>
                                                <TableCell component="th" scope="row" className={style.textGrey}>{task.assign && Array.isArray(task.assign) && task.assign.join(', ')}</TableCell>

                                                <TableCell align="left">
                                                    <Stack
                                                        flexDirection="row"
                                                        gap={1}
                                                        sx={{ cursor: "pointer", maxWidth: "6rem", minWidth: "6rem" }}>
                                                        <Avatar sx={{ bgcolor: "silver", width: "1.4rem", height: "1.4rem", fontSize: '14px' }}>
                                                            {task.assignedBy?.name?.[0]?.toUpperCase()}
                                                        </Avatar>
                                                        <Typography className={style.textGrey}>{task.assignedBy?.name}</Typography>
                                                    </Stack>
                                                </TableCell>

                                                <TableCell align="left">
                                                    <Typography sx={{ fontSize: '0.8rem' }} className={style.textGrey}>{task.description}</Typography>
                                                </TableCell>

                                                <TableCell align="left" className={style.textGrey} sx={{ color: 'green !important' }}>{new Date(task.startDate).toLocaleDateString()}</TableCell>
                                                <TableCell align="left" className={style.textGrey} sx={{ color: 'red !important' }}>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                                                <TableCell align="right" sx={{ color: 'purple !important' }} className={style.textGrey}>{task.points}</TableCell>
                                                <TableCell align="right">
                                                    <Button variant="text" className={style.statusBtn}>{task.taskList}</Button>
                                                </TableCell>

                                                <TableCell align="right">
                                                    {/* <Button color="error" className={`${style.dialogBtnPrimary}`}>
                                                Delete
                                            </Button> */}
                                                    {/* <div> */}
                                                        <IconButton
                                                            disableRipple
                                                            sx={{ padding: '1px', color: 'gray' }}
                                                            onClick={(e) => handleClick(e, task._id)}
                                                        >
                                                            <MoreVertIcon />
                                                        </IconButton>

                                                        <Menu
                                                            anchorEl={anchor}
                                                            open={open && selectedTask === task._id}
                                                            onClose={handleClose}
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'right'
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'right',
                                                            }}
                                                            sx={{
                                                                '& .MuiList-root': {
                                                                    padding: 0,
                                                                    margin: 0,
                                                                    border: '1px solid silver',
                                                                    borderRadius: '0.2rem',
                                                                    backgroundColor: 'white'
                                                                },
                                                                '& .MuiPaper-root': {
                                                                    boxShadow: '0'
                                                                },
                                                            }}
                                                            className={style.anchorElParent}
                                                        >

                                                            <MenuItem onClick={handleEditClickOpen} className={style.anchorMenuItem}>
                                                                <ListItemIcon sx={{ minWidth: '0 !important', marginRight: '8px' }}>
                                                                    <EditIcon fontSize="small" sx={{ minWidth: '10px' }} />
                                                                </ListItemIcon>Edit</MenuItem>

                                                            <MenuItem
                                                                onClick={handleDelete}
                                                                className={style.anchorMenuItem}
                                                                sx={{
                                                                    bgcolor: '#E97451',
                                                                    color: 'white !important',
                                                                    '&:hover': {
                                                                        bgcolor: '#EE4B2B !important'
                                                                    }
                                                                }}
                                                            >
                                                                <ListItemIcon sx={{ minWidth: '0 !important', marginRight: '8px' }}>
                                                                    <DeleteOutlineIcon fontSize="small" sx={{ minWidth: '10px', color: 'white' }} />
                                                                </ListItemIcon>
                                                                Delete
                                                            </MenuItem>
                                                        </Menu>
                                                    {/* </div> */}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        ) : (
                            <Stack>
                                <Typography className={style.noContent}>Assign a task to User to show here</Typography>
                            </Stack>

                        )
                    }
                    < EditPointsDialog open={editDialogOpen} handleClose={handleEditCloseTab} task={selectedTask} />
                </TableContainer >
            </Stack>
        </Stack>
    );
}

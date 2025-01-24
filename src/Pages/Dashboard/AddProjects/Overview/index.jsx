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
    FormControl, InputLabel,
    Select, TextField,
} from "@mui/material";


import style from "./style.module.scss"
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditPointsDialog from "./EditPointsDialog";
import TaskAltIcon from '@mui/icons-material/TaskAlt';


import { fetchTaskById } from "../../../../api/taskApi";
import { completeSubTask, filterSubTask, getSubTask } from "../../../../api/userSubTask";
import { useSubmitTask } from "../../../../hooks/useTask";
import { useAuth } from "../../../../context/AuthProvider";
import { useDeleteSubTask } from "../../../../hooks/useSubTask";


import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useDebounce from "../../../../hooks/useDebounce";




export default function index() {
    const { user, theme, mode } = useAuth();
    const tableClassText = mode === 'light' ? style.lightTableText : style.darkTableText;

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


    // Filtering Search SubTask
    const [searchTerm, setSearchTerm] = useState("");
    const [filterField, setFilterField] = useState("");
    const debounceSearchTerm = useDebounce(searchTerm, 500)

    const { data: filteredSubTask } = useQuery({
        queryKey: ['filteredSubTask', debounceSearchTerm, filterField],
        queryFn: () => filterSubTask(debounceSearchTerm, filterField),
        enabled: !!debounceSearchTerm || !!filterField
    })


    // Handling the Completed Functionality
    const queryClient = useQueryClient();
    const handleCompleteTask = async (taskId) => {
        try {
            const response = await completeSubTask(taskId);
            toast.success(response.message, {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: false,
            });
            queryClient.invalidateQueries(['userSubtask', taskId])
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred", {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: false,
            });
        } finally {
            handleClose();
        }
    }


    return (
        <Stack variant="main" flexDirection="column" gap={2}>
            <Stack gap={2}>

                <Box variant="div" className={style.boxMain1}>
                    <Box variant="header" sx={{ marginBlock: '0.4rem', marginBottom: '1rem' }}>
                        <Typography variant="h6" className={tableClassText} sx={{ fontSize: '1.2rem !important', marginBottom: '0.8rem' }}>Project Info</Typography>
                    </Box>

                    <Stack sx={{ width: '100%' }} gap={2}>
                        <Stack flexDirection="row" width="100%" justifyContent="space-between">
                            <Stack flexDirection="row" gap={2} alignItems="center">
                                <Typography className={`${tableClassText} ${style.textGroup}`}>Team Head</Typography>
                                <Typography className={style.textGreyInfo}>{taskData?.data?.teamLeadName && Array.isArray(taskData?.data?.teamLeadName) && taskData?.data?.teamLeadName.join(', ')}</Typography>
                            </Stack>
                            <Stack flexDirection="row" gap={2} alignItems="center">
                                <Typography className={`${tableClassText} ${style.textGroup}`}>Start Date</Typography>
                                <Typography className={style.textGreyInfo}>3/18/2020</Typography>
                            </Stack>
                        </Stack>

                        <Stack flexDirection="row" width="100%" justifyContent="space-between">
                            <Stack flexDirection="row" gap={2} alignItems="center">
                                <Typography className={`${tableClassText} ${style.textGroup}`}>Status</Typography>
                                <Button variant="text" className={style.tableBodyBtn}>{taskData?.data?.projectStatus}</Button>
                            </Stack>
                            <Stack flexDirection="row" gap={2} alignItems="center">
                                <Typography className={`${tableClassText} ${style.textGroup}`}>Due Date</Typography>
                                <Typography className={style.textGreyInfo} sx={{ color: 'red !important' }}>3/18/2020</Typography>
                            </Stack>
                        </Stack>

                        <Stack flexDirection="row" width="100%" justifyContent="space-between">
                            <Stack flexDirection="row" gap={2} alignItems="center">
                                <Typography className={`${tableClassText} ${style.textGroup}`}>Budget</Typography>
                                <Typography className={style.textGreyInfo}>$-{taskData?.data?.budget}</Typography>
                            </Stack>
                            <Stack flexDirection="row" gap={2} alignItems="center">
                                <Typography className={`${tableClassText} ${style.textGroup}`}>Link:</Typography>
                                <Typography variant="a" className={style.textGreyInfo} sx={{ color: '#87CEEB !important', textDecoration: 'underline', cursor: 'pointer' }}>{taskData?.data?.link}</Typography>
                            </Stack>
                        </Stack>
                    </Stack>


                    <Box sx={{ marginBlock: '0.8rem' }}>
                        <Typography variant="h6" className={`${tableClassText} ${style.textGroup}`} sx={{ fontSize: '1.2rem !important', marginTop: '1.8rem' }}>Description</Typography>
                        <Typography variant="p" className={style.textGreyDesc}>{taskData?.data?.description}</Typography>
                    </Box>


                    <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
                        <Box mb={2}>
                            <Typography variant="h6" className={`${tableClassText} ${style.textGroup}`} sx={{ fontSize: '1.2rem !important', marginTop: '0.4rem' }}>Project Points</Typography>
                            <Typography variant="p" className={style.textGreyInfo}>{taskData?.data?.points}</Typography>
                        </Box>
                        <Button variant="outlined"
                            className={`${style.accept}`}
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


            <Stack flexDirection="row" justifyContent="space-between" mt={2}>
                <Typography variant="h6" className={tableClassText} sx={{ fontSize: '1.4rem !important' }}>SubUser Task</Typography>
                <Stack direction="row" spacing={2} sx={{
                    alignItems: "center",
                    mb: 2,
                }}>

                    <TextField
                        label="Search"
                        variant="outlined"
                        fullWidth
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        size="small" />

                    <FormControl variant="outlined" sx={{ minWidth: 150 }}>
                        <InputLabel id="filter-label" size="small">Filter Here</InputLabel>
                        <Select
                            labelId="filter-label"
                            label="Filter By Role"
                            size="small"
                            className={style.filterSelect}
                            value={filterField}
                            onChange={(e) => setFilterField(e.target.value)}>
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>
                            <MenuItem value="title">Title</MenuItem>
                            <MenuItem value="assign">Assign</MenuItem>
                        </Select>
                    </FormControl>

                </Stack>
            </Stack>

            <Stack variant="div">
                <TableContainer>
                    {
                        subTasks?.data.length > 0 ? (
                            <Table sx={{
                                backgroundColor: theme.palette.background.paper,
                                color: theme.palette.text.primary,
                                overflow: 'visible',
                                borderRadius: '0.6rem'
                            }}>
                                <TableHead>
                                    <TableRow className={style.tableRowHead}>
                                        <TableCell align="left" variant="h6" className={`${tableClassText} ${style.tableHeadText}`}>Title</TableCell>
                                        <TableCell variant="h6" className={`${tableClassText} ${style.tableHeadText}`}>Assign To</TableCell>
                                        <TableCell variant="h6" className={`${tableClassText} ${style.tableHeadText}`}>Checked By</TableCell>
                                        <TableCell variant="h6" className={`${tableClassText} ${style.tableHeadText}`}>Assign By</TableCell>
                                        <TableCell align="left" variant="h6" className={`${tableClassText} ${style.tableHeadText}`}>Start Date</TableCell>
                                        <TableCell align="left" variant="h6" className={`${tableClassText} ${style.tableHeadText}`}>Due Date</TableCell>
                                        <TableCell align="right" variant="h6" className={`${tableClassText} ${style.tableHeadText}`}>Points</TableCell>
                                        <TableCell align="right" variant="h6" className={`${tableClassText} ${style.tableHeadText}`}>TaskList</TableCell>
                                        {/* <TableCell align="left" variant="h6" className={`${tableClassText} ${style.tableHeadText}`}>Description</TableCell> */}
                                        <TableCell align="right" variant="h6" className={`${tableClassText} ${style.tableHeadText}`}>&nbsp;</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody >
                                    {(filteredSubTask?.data?.length > 0 ? filteredSubTask.data : subTasks?.data || []).map((task, index) => {
                                        return (
                                            <TableRow key={index} className={style.tableRowBody}>
                                                <TableCell component="th" scope="row" className={tableClassText}>{task.title}</TableCell>
                                                <TableCell component="th" scope="row" className={tableClassText}>{task.assign && Array.isArray(task.assign) && task.assign.join(', ')}</TableCell>
                                                <TableCell component="th" scope="row" className={tableClassText}>Qc-Admin</TableCell>

                                                <TableCell align="left">
                                                    <Stack
                                                        flexDirection="row"
                                                        alignItems="center"
                                                        gap={0.6}
                                                        sx={{ cursor: "pointer", maxWidth: "6rem", minWidth: "6rem" }}>
                                                        <Avatar sx={{ bgcolor: "silver", width: "1.2rem", height: "1.2rem", fontSize: '12px' }}>
                                                            {task.assignedBy?.name?.[0]?.toUpperCase()}
                                                        </Avatar>
                                                        <Typography className={style.textGrey}>{task.assignedBy?.name}</Typography>
                                                    </Stack>
                                                </TableCell>

                                                <TableCell align="left" className={style.textGreyInfo}>{new Date(task.startDate).toLocaleDateString()}</TableCell>
                                                <TableCell align="left" className={style.textGrey} sx={{ color: 'red !important' }}>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                                                <TableCell align="right" className={tableClassText}>{task.points}</TableCell>

                                                <TableCell align="right">
                                                    <Button variant="text" className={style.tableBodyBtn}>{task.taskList}</Button>
                                                </TableCell>

                                                <TableCell align="right">
                                                    <IconButton
                                                        disableRipple
                                                        sx={{ padding: '1px', color: 'gray' }}
                                                        onClick={(e) => handleClick(e, task._id)}>
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
                                                                borderRadius: '0.1rem',
                                                                border: `1px solid ${mode === 'light' && 'silver'}`,
                                                                backgroundColor: `${mode === 'light' && theme.palette.background.default}`
                                                            },
                                                            '& .MuiPaper-root': {
                                                                boxShadow: '0'
                                                            },
                                                        }}
                                                        className={style.anchorElParent}>

                                                        <MenuItem onClick={handleEditClickOpen} className={`${tableClassText} ${style.editMenuItem}`}>
                                                            <ListItemIcon >
                                                                <EditIcon fontSize="small" />
                                                            </ListItemIcon>Edit</MenuItem>

                                                        <MenuItem onClick={handleDelete} className={`${tableClassText} ${style.deleteMenuItem}`}>
                                                            <ListItemIcon >
                                                                <DeleteOutlineIcon fontSize="small" sx={{ color: 'white' }} />
                                                            </ListItemIcon>Delete</MenuItem>


                                                        {task.assign.includes(user?.name) &&
                                                            <MenuItem
                                                                onClick={() => handleCompleteTask(selectedTask)}
                                                                className={style.anchorMenuItemCompleted}
                                                                disabled={task.taskList === 'completed'}>
                                                                <ListItemIcon sx={{ minWidth: '0 !important', marginRight: '8px' }}>
                                                                    <TaskAltIcon fontSize="small" sx={{ minWidth: '10px', color: 'white' }} />
                                                                </ListItemIcon>{task.taskList === "completed" ? "Completed" : "Mark Complete"}</MenuItem>
                                                        }
                                                    </Menu>
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
                        )}

                    <EditPointsDialog open={editDialogOpen} handleClose={handleEditCloseTab} task={selectedTask} />
                </TableContainer >

            </Stack>
        </Stack>
    );
}

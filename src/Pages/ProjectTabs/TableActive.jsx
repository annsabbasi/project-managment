import style from './style.module.scss';


import {
    Typography, Menu, Table,
    Button, TableRow,
    MenuItem, TableCell,
    TableBody, TableHead,
    TableContainer, Stack,
    IconButton, ListItemIcon,
} from '@mui/material';


import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RouteNames } from '../../Constants/route';
import { useDeleteTask, useGetCreateTask } from '../../hooks/useTask';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthProvider';


import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import TextDialog from './TextDialog';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditTextDialog from './EditTextDialog';



export default function TableActive() {
    const { user, theme, mode } = useAuth();
    const tableClassText = mode === 'light' ? style.lightTableText : style.darkTableText;
    const tableGap = mode === 'light' ? style.tableBodyLight : style.tableBodyDark;

    const [anchor, setAnchor] = useState(null);
    const { data } = useGetCreateTask();
    const [selectedTask, setSelectedTask] = useState(null);

    const open = Boolean(anchor);

    const handleClick = (event, taskId) => {
        setAnchor(event.currentTarget);
        setSelectedTask(taskId);
    }
    const handleClose = () => {
        setAnchor(null)
    }


    const [dialogOpen, setDialogOpen] = useState(false);
    const handleClickOpen = () => {
        setDialogOpen(true);
    };
    const handleCloseTab = () => {
        setDialogOpen(false);
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


    const { mutate: deleteTask } = useDeleteTask();
    const handleDelete = () => {
        deleteTask(selectedTask, {
            onSuccess: () => {
                handleClose();
                toast.success("Task Deleted Successfully", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: false,
                });
            }
        })
    }


    return (
        <TableContainer>
            {data && data?.data?.length > 0 ?
                (<Table
                    sx={{
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        overflow: 'visible',
                        borderRadius: '0.6rem'
                    }}>

                    <TableHead>
                        <TableRow className={style.tableRowHead}>
                            <TableCell className={tableClassText}>Project Title</TableCell>
                            <TableCell align="left" className={tableClassText}>Owner</TableCell>
                            <TableCell align="left" className={tableClassText}>Project Status</TableCell>
                            <TableCell align="left" className={tableClassText}>Members</TableCell>
                            <TableCell align="left" className={tableClassText}>Start Date</TableCell>
                            <TableCell align="left" className={tableClassText}>Due Date</TableCell>
                            <TableCell align="right" className={tableClassText}>Budget</TableCell>
                            <TableCell align="right" className={tableClassText}>Points</TableCell>
                            <TableCell align="right" className={tableClassText}>&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody className={tableGap}>
                        {data?.data?.map((task) => {
                            return (
                                <TableRow key={task._id} className={style.tableRowBody}>
                                    <TableCell component="th" scope="row">{task.projectTitle}</TableCell>
                                    <TableCell align="left">{task.assignedBy.name}</TableCell>
                                    <TableCell align="left">
                                        <Button variant="text" className={style.tableBodyBtn} size="small">
                                            {task.projectStatus}
                                        </Button>
                                    </TableCell>
                                    <TableCell align="left">{task.members}</TableCell>
                                    <TableCell align="left">{new Date(task.startDate).toLocaleDateString()}</TableCell>
                                    <TableCell align="left">{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                                    <TableCell align="left">${task.budget.toLocaleString()}</TableCell>
                                    <TableCell align="right">{`${task.points > 40 ? '+' : '-'} ${task.points}`}</TableCell>
                                    <TableCell align="right">
                                        <div>
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
                                                <Link to={`${RouteNames.ADDPROJECTS}/${task._id}`} style={{ textDecoration: 'none' }} onClick={() => { handleClose() }}>
                                                    <MenuItem onClick={handleClose} className={style.anchorMenuItem}>
                                                        <ListItemIcon sx={{ minWidth: '0 !important', marginRight: '8px' }}>
                                                            <VisibilityOutlinedIcon fontSize="small" sx={{ minWidth: '10px' }} />
                                                        </ListItemIcon>
                                                        View
                                                    </MenuItem>
                                                </Link>

                                                {user?.role === 'admin' && (
                                                    <MenuItem onClick={handleEditClickOpen} className={`${tableClassText} ${style.editMenuItem}`}>
                                                        <ListItemIcon>
                                                            <EditIcon fontSize="small" />
                                                        </ListItemIcon>
                                                        Edit
                                                    </MenuItem>
                                                )}

                                                {user?.role === 'admin' && (
                                                    <MenuItem onClick={handleDelete} className={`${tableClassText} ${style.deleteMenuItem}`}>
                                                        <ListItemIcon>
                                                            <DeleteOutlineIcon fontSize="small" sx={{ color: 'white' }} />
                                                        </ListItemIcon>
                                                        Delete
                                                    </MenuItem>
                                                )}
                                            </Menu>

                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                )
                :
                (
                    <Stack alignItems='center' justifyContent='end' height='50vh' gap={4} variant="div">
                        <Typography sx={{ fontWeight: '600', fontSize: '1.3rem' }}>No active project yet</Typography>

                        <Stack gap={2} width={350} textAlign='center'>
                            <Typography component='p' className={style.btnText}>You haven&apos;t started any projects. Begin a new project to see it appear in your active list.</Typography>
                            <Link onClick={handleClickOpen}>
                                <Button variant='contained' size='large' startIcon={<AddIcon />}
                                    className={style.projectBtn} sx={{
                                        color: theme.palette.text.primary,
                                        border: `1px solid ${theme.palette.text.primary}`,
                                        '&:hover': {
                                            opacity: `0.4 !important`,
                                        }
                                    }}>Add Project</Button>
                            </Link>
                        </Stack>

                        <TextDialog open={dialogOpen} handleClose={handleCloseTab} />
                    </Stack>
                )
            }

            <EditTextDialog open={editDialogOpen} handleClose={handleEditCloseTab} task={selectedTask} />
        </TableContainer >
    );
}
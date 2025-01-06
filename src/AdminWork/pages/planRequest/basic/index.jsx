import style from '../../../../Pages/ProjectTabs/style.module.scss';
import styles from './style.module.scss'

import {
    Menu, Table,
    Button, TableRow,
    MenuItem, TableCell,
    TableBody, TableHead,
    IconButton, ListItemIcon,
    TableContainer, Stack,
    Typography
} from '@mui/material';
// import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { RouteNames } from '../../Constants/route';
// import { useDeleteTask, useGetCreateTask } from '../../hooks/useTask';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import theme from '../../../../Theme/Theme';
// import EditTextDialog from './EditTextDialog';
// import TextDialog from './TextDialog';


export default function index() {
    // const [anchor, setAnchor] = useState(null);
    // const { data, isLoading, isError, error } = useGetCreateTask();
    // const [selectedTask, setSelectedTask] = useState(null);
    // const open = Boolean(anchor);

    // const handleClick = (event, taskId) => {
    //     setAnchor(event.currentTarget);
    //     setSelectedTask(taskId);
    // }
    // const handleClose = () => {
    //     setAnchor(null)
    // }

    // const [dialogOpen, setDialogOpen] = useState(false);
    // const handleClickOpen = () => {
    //     setDialogOpen(true);
    // };
    // const handleCloseTab = () => {
    //     setDialogOpen(false);
    // };

    // const [editDialogOpen, setEditDialogOpen] = useState(false);
    // const handleEditClickOpen = () => {
    //     setEditDialogOpen(true);
    //     handleClose();
    // };
    // const handleEditCloseTab = () => {
    //     setEditDialogOpen(false);
    //     setSelectedTask(null);
    // };

    // // const { mutate: deleteTask } = useDeleteTask();
    // // const handleDelete = () => {
    // //     deleteTask(selectedTask, {
    // //         onSuccess: () => {
    // //             handleClose();
    // //         }
    // //     })
    // // }

    // if (isLoading) return <p>loading...</p>;
    // if (isError) return <p>Error loading tasks: {error.message}</p>;

    return (
        <TableContainer><Table className={style.table}>
            <TableHead className={style.tableHead}>
                <TableRow className={style.tableRowHead}>
                    <TableCell>Name</TableCell>
                    <TableCell align="left">email</TableCell>
                    <TableCell align="left">Plan</TableCell>
                    <TableCell align="left">Purchase Date</TableCell>
                    {/* <TableCell align="left">Due Date</TableCell> */}
                    {/* <TableCell align="right">Budget</TableCell> */}
                    {/* <TableCell align="right">Points</TableCell> */}
                    {/* <TableCell align="right">&nbsp;</TableCell> */}
                </TableRow>
            </TableHead>

            <TableBody sx={{ borderTop: '12px solid white' }}>
                <TableRow className={style.tableRowBody}>
                    <TableCell component="th" scope="row">John Doe</TableCell>
                    <TableCell align="left">john@gmail.com</TableCell>
                    <TableCell align="left">Basic</TableCell>
                    <TableCell align="left">12/12/2020</TableCell>
                    {/* <TableCell align="left">work</TableCell> */}
                    {/* <TableCell align="left">work</TableCell> */}
                    {/* <TableCell align="left">$work</TableCell> */}
                    {/* <TableCell align="right">work</TableCell> */}
                    {/* <TableCell align="right">
                        <div>
                            <IconButton
                                disableRipple
                                sx={{ padding: '1px', color: 'gray' }}
                            // onClick={(e) => handleClick(e)}
                            >
                                <MoreVertIcon />
                            </IconButton>

                            <Menu
                                // anchorEl={anchor}
                                // open={open && selectedTask === task._id}
                                // onClose={handleClose}
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
                                <Link
                                    //  to={`${RouteNames.ADDPROJECTS}/${task._id}`} 
                                    style={{ textDecoration: 'none' }} onClick={() => {
                                        // handleClose();
                                    }}>
                                    <MenuItem
                                        //  onClick={handleClose}
                                        className={style.anchorMenuItem}>
                                        <ListItemIcon sx={{ minWidth: '0 !important', marginRight: '8px' }}>
                                            <VisibilityOutlinedIcon fontSize="small" sx={{ minWidth: '10px' }} />
                                        </ListItemIcon>
                                        View
                                    </MenuItem>
                                </Link>

                                <MenuItem
                                    //  onClick={handleEditClickOpen}
                                    className={style.anchorMenuItem}>
                                    <ListItemIcon sx={{ minWidth: '0 !important', marginRight: '8px' }}>
                                        <EditIcon fontSize="small" sx={{ minWidth: '10px' }} />
                                    </ListItemIcon>Edit</MenuItem>

                                <MenuItem
                                    // onClick={handleDelete}
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
                        </div>
                    </TableCell> */}
                </TableRow>

            </TableBody>
        </Table>
            <Stack alignItems='center' justifyContent='end' height='50vh' gap={4} variant="div">
                <Typography sx={{ fontWeight: '600', color: theme.palette.grey.darkGrey, fontSize: '1.3rem' }}>No active project yet</Typography>

                <Stack gap={2} width={350} textAlign='center'>
                    <Typography component='p' className={style.btnText}>You haven&apos;t started any projects. Begin a new project to see it appear in your active list.</Typography>

                    <Link
                    // onClick={handleClickOpen}
                    >
                        <Button variant='contained' size='large' startIcon={<AddIcon />}
                            className={style.projectBtn} >Add Project</Button>
                    </Link>

                </Stack>
                {/* <TextDialog
                open={dialogOpen}
                 handleClose={handleCloseTab}
                /> */}
            </Stack>

            {/* <EditTextDialog
             open={editDialogOpen}
              handleClose={handleEditCloseTab}
               task={selectedTask}
            /> */}
        </TableContainer>
    );
}
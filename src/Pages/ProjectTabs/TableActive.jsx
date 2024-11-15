import style from './style.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RouteNames } from '../../Constants/route';
import { useDeleteTask, useGetCreateTask, useUpdateTask } from '../../hooks/useTask';
import theme from '../../Theme/Theme';
import styles from './style.module.scss';

import {
    Menu, Table,
    Button, TableRow,
    MenuItem, TableCell,
    TableBody, TableHead,
    IconButton, ListItemIcon,
    TableContainer, Stack,
    Typography,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
// import UploadFileIcon from '@mui/icons-material/UploadFile';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import TextDialog from './TextDialog';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
// import Spinner from '../../Components/Spinner';


export default function TableActive() {
    const [anchor, setAnchor] = useState(null);
    const { data, isLoading, isError, error } = useGetCreateTask();

    const open = Boolean(anchor);

    const handleClick = (event) => {
        setAnchor(event.currentTarget)
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

    const { mutate: deleteTask } = useDeleteTask();
    const handleDelete = (taskId) => {
        deleteTask(taskId, {
            onSuccess: () => {
                handleClose();
            }
        })
    }

    const [editingTask, setEditingTask] = useState(null);
    const { mutate: editTask } = useUpdateTask();
    const handleEditClick = (task) => {
        setEditingTask(task)
    }


    // if (isLoading) return <Spinner />;   
    if (isLoading) return <p>loading...</p>;
    if (isError) return <p>Error loading tasks: {error.message}</p>;


    // console.log("This is the data", data)
    return (
        <TableContainer>
            {data && data?.data?.length > 0 ?
                (<Table className={style.table}>
                    <TableHead className={style.tableHead}>
                        <TableRow className={style.tableRowHead}>
                            <TableCell>Project Title</TableCell>
                            <TableCell align="left">Owner</TableCell>
                            <TableCell align="left">Project Status</TableCell>
                            <TableCell align="left">Members</TableCell>
                            <TableCell align="left">Start Date</TableCell>
                            <TableCell align="left">Due Date</TableCell>
                            <TableCell align="right">Budget</TableCell>
                            <TableCell align="right">Points</TableCell>
                            <TableCell align="right">&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody sx={{ borderTop: '12px solid white' }}>
                        {data?.data?.map((task) => (
                            <TableRow key={task._id} className={style.tableRowBody}>
                                <TableCell component="th" scope="row">{task.projectTitle}</TableCell>
                                <TableCell align="left">{task.assignedBy.name}</TableCell>
                                <TableCell align="left">
                                    <Button variant="text" className={style.tableBodyBtn} size="small">
                                        {task.projectStatus}
                                    </Button>
                                </TableCell>
                                {/* <TableCell align="left">{task.members?.join(', ')}</TableCell> */}
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
                                            onClick={handleClick}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>

                                        <Menu
                                            anchorEl={anchor}
                                            open={open}
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
                                            <Link to={`${RouteNames.ADDPRODUCTS}`} style={{ textDecoration: 'none' }}>
                                                <MenuItem onClick={handleClose} className={style.anchorMenuItem}>
                                                    <ListItemIcon sx={{ minWidth: '0 !important', marginRight: '8px' }}>
                                                        <VisibilityOutlinedIcon fontSize="small" sx={{ minWidth: '10px' }} />
                                                    </ListItemIcon>
                                                    View
                                                </MenuItem>
                                            </Link>

                                            {/* <MenuItem onClick={handleClose} className={style.anchorMenuItem}>
                                                <ListItemIcon sx={{ minWidth: '0 !important', marginRight: '8px' }}>
                                                    <EditIcon fontSize="small" sx={{ minWidth: '10px' }} />
                                                </ListItemIcon>
                                                Edit
                                            </MenuItem> */}
                                            <MenuItem onClick={() => handleEditClick(task)} className={style.anchorMenuItem}>
                                                <ListItemIcon sx={{ minWidth: '0 !important', marginRight: '8px' }}>
                                                    <EditIcon fontSize="small" sx={{ minWidth: '10px' }} />
                                                </ListItemIcon>
                                                Edit
                                            </MenuItem>


                                            <MenuItem
                                                onClick={() => handleDelete(task._id)}
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
                                </TableCell>
                            </TableRow>
                        ))}


                        {/* <TableRow className={style.tableRowBody}>
                        <TableCell component="th" scope="row">Website Design with Responsiveness</TableCell>
                        <TableCell align="left">Charley Robertson</TableCell>

                        <TableCell align="left">
                            <Link to={`${RouteNames.ADDPRODUCTS}`}>
                                <Button variant="text" className={style.tableBodyBtn} size="small">In Progress</Button>
                            </Link>
                        </TableCell>

                        <TableCell align="left">carbs</TableCell>
                        <TableCell align="left">3/18/23</TableCell>
                        <TableCell align="left">8/15/24</TableCell>
                        <TableCell align="right">$5,000</TableCell>
                        <TableCell align="right">
                            <div>
                                <IconButton
                                    disableRipple
                                    sx={{ padding: '1px', color: 'gray' }}
                                    onClick={handleClick}>
                                    <MoreVertIcon />
                                </IconButton>

                                <Menu
                                    anchorEl={anchor}
                                    open={open}
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
                                    }} className={style.anchorElParent}>
                                    <MenuItem onClick={handleClose} className={style.anchorMenuItem} >
                                        <ListItemIcon
                                            sx={{ minWidth: '0 !important', marginRight: '8px' }}>
                                            <EditIcon fontSize="small" sx={{ minWidth: '10px' }} />
                                        </ListItemIcon>
                                        Edit
                                    </MenuItem>

                                    <MenuItem onClick={handleClose} className={style.anchorMenuItem} >
                                        <ListItemIcon
                                            sx={{ minWidth: '0 !important', marginRight: '8px' }}>
                                            <UploadFileIcon fontSize="small" sx={{ minWidth: '10px' }} />
                                        </ListItemIcon>
                                        Upload a file
                                    </MenuItem>

                                    <MenuItem onClick={handleClose} className={style.anchorMenuItem} sx={{
                                        bgcolor: '#E97451', color: 'white !important', '&:hover': {
                                            bgcolor: '#EE4B2B !important'
                                        }
                                    }}>
                                        <ListItemIcon
                                            sx={{ minWidth: '0 !important', marginRight: '8px' }}>
                                            <DeleteOutlineIcon fontSize="small" sx={{ minWidth: '10px', color: 'white' }} />
                                        </ListItemIcon>
                                        Delete
                                    </MenuItem>
                                </Menu>
                            </div>

                        </TableCell>
                    </TableRow> */}
                    </TableBody>
                </Table>) : (<Stack alignItems='center' justifyContent='end' height='50vh' gap={4} variant="div">
                    <Typography sx={{ fontWeight: '600', color: theme.palette.grey.darkGrey, fontSize: '1.3rem' }}>No active project yet</Typography>

                    <Stack gap={2} width={350} textAlign='center'>
                        <Typography component='p' className={style.btnText}>You haven&apos;t started any projects. Begin a new project to see it appear in your active list.</Typography>

                        <Link onClick={handleClickOpen}>
                            <Button variant='contained' size='large' startIcon={<AddIcon />}
                                className={style.projectBtn} >Add Project</Button>
                        </Link>

                    </Stack>
                    <TextDialog open={dialogOpen} handleClose={handleCloseTab} />
                </Stack>)
            }

            {/* @@@@@@@@@@@@@@@ */}
            <Dialog open={Boolean(editingTask)} onClose={() => setEditingTask(null)}>
                <DialogTitle>Edit Task</DialogTitle>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (editingTask) editTask(editingTask);
                    }}
                    style={{ padding: '0 20px 20px 20px', width: '100%' }}
                >
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                        <TextField
                            label="Project Title"
                            value={editingTask?.projectTitle || ''}
                            onChange={(e) => setEditingTask({ ...editingTask, projectTitle: e.target.value })}
                            fullWidth
                            sx={{ width: '500px' }}
                        />
                        <TextField
                            label="Assign User"
                            value={editingTask?.teamLeadName || ''}
                            onChange={(e) => setEditingTask({ ...editingTask, teamLeadName: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            label="Points"
                            value={editingTask?.points || ''}
                            onChange={(e) => setEditingTask({ ...editingTask, teamLeadName: e.target.value })}
                            fullWidth
                        />
                    </DialogContent>
                    <Button type="submit" variant="contained" color="secondary" className={styles.dialogBtnPrimary}>
                        Update Task
                    </Button>
                </form>

            </Dialog>

            {/* <Dialog component="form" onSubmit={handleSubmit} noValidate open={open} onClose={handleClose} className={styles.sidebar}>
            <DialogTitle>Add a New Project</DialogTitle>
            <DialogContent className={styles.sidebar}>
                {renderTextField("projectTitle", "Project Title")}
                {renderTextField("teamLeadName", "Assign User")}
                {renderTextField("dueDate", "Due Date")}
                {renderTextField("budget", "Add Budget")}
                {renderTextField("description", "Project Description", true)}
            </DialogContent>
            <Typography variant="span" sx={{ margin: 'auto', fontSize: '0.9rem', color: 'red' }}>error will shown here</Typography>
            <DialogActions sx={{ paddingBottom: '1rem' }}>
                <Button onClick={handleClose} color="secondary" className={styles.dialogBtnPrimary}>Cancel</Button>
                <Button type="submit" onClick={handleClose} color="primary" className={styles.dialogBtnSecondary}>Save</Button>
            </DialogActions>
        </Dialog> */}
            {/* @@@@@@@@@@@@@@@ */}
        </TableContainer>
    );
}
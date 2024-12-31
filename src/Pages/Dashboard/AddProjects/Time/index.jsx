import style from "./style.module.scss"

// import EditIcon from '@mui/icons-material/Edit';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import EditPointsDialog from "./EditPointsDialog";

import {
    // Avatar, Button,
    // IconButton, ListItemIcon,
    // Menu, MenuItem,
    Stack, Table,
    TableBody, TableCell,
    TableContainer, TableHead,
    TableRow, Typography
} from '@mui/material'

export default function index() {
    const subTasks = [
        { id: 1, title: "Title", assign: "example@gmail.com", name: "John Doe", description: "Dummy Description", taskList: "TaskList", startDate: "12/12/2020", dueDate: "12/12/2020", points: "7" },
        { id: 2, title: "Title", assign: "work@gmail.com", name: "Jane Smith", description: "Dummy Description", taskList: "TaskList", startDate: "12/12/2020", dueDate: "12/12/2020", points: "10" },
        { id: 3, title: "Title", assign: "example32@gmail.com", name: "Alice Johnson", description: "Dummy Description", taskList: "TaskList", startDate: "12/12/2020", dueDate: "12/12/2020", points: "9" },
        { id: 4, title: "Title", assign: "assign", name: "Bob Lee", description: "Dummy Description", taskList: "TaskList", startDate: "12/12/2020", dueDate: "12/12/2020", points: "2" },
    ];

    const sortedSubTasks = subTasks.sort((a, b) => Number(a.points) - Number(b.points));


    return (
        <Stack variant="div" className={style.boxMain2}>
            <TableContainer>
                {
                    subTasks?.length > 0 ? (
                        <Table className={style.table}>
                            <TableHead className={style.tableHead}>
                                <TableRow className={style.tableRowHead}>
                                    <TableCell align="left" variant="h6" className={style.tableInfo}>name</TableCell>
                                    <TableCell variant="h6" className={style.tableInfo}>email</TableCell>
                                    <TableCell align="left" variant="h6" className={style.tableInfo} >Points</TableCell>
                                    {/* <TableCell variant="h6" className={style.tableInfo}>Task Completed</TableCell> */}
                                    {/* <TableCell align="left" variant="h6" className={style.tableInfo}>Start Date</TableCell>
                                    <TableCell align="left" variant="h6" className={style.tableInfo}>Due Date</TableCell>
                                    <TableCell align="right" variant="h6" className={style.tableInfo}>Points</TableCell>
                                    <TableCell align="right" variant="h6" className={style.tableInfo}>TaskList</TableCell>
                                    <TableCell align="right" variant="h6" className={style.tableInfo}>&nbsp;</TableCell> */}
                                </TableRow>
                            </TableHead>

                            <TableBody >
                                {sortedSubTasks?.map((task, index) => {
                                    return (
                                        <TableRow key={index} className={style.tableRowBody}>
                                            <TableCell component="th" scope="row" >{task.name}</TableCell>
                                            <TableCell component="th" scope="row" className={style.textGrey} sx={{ color: 'purple !important' }}>{task.assign}</TableCell>

                                            <TableCell align="left">
                                                <Stack
                                                    flexDirection="row"
                                                    gap={1}
                                                    sx={{ cursor: "pointer", maxWidth: "6rem", minWidth: "6rem" }}>
                                                    {/* <Avatar sx={{ bgcolor: "silver", width: "1.4rem", height: "1.4rem", fontSize: '14px' }}>
                                                        {task.name?.[0]?.toUpperCase()}
                                                    </Avatar> */}
                                                    <Typography className={style.textGrey} sx={{ color: 'green !important' }}>{task.points}/10</Typography>
                                                </Stack>
                                            </TableCell>

                                            {/* <TableCell align="left">
                                                <Typography sx={{ fontSize: '0.8rem' }} className={style.textGrey}>{task.description}</Typography>
                                            </TableCell> */}

                                            {/* <TableCell align="left" className={style.textGrey} sx={{ color: 'green !important' }}>{new Date(task.startDate).toLocaleDateString()}</TableCell>
                                            <TableCell align="left" className={style.textGrey} sx={{ color: 'red !important' }}>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                                            <TableCell align="right" sx={{ color: 'purple !important' }} className={style.textGrey}>{task.points}</TableCell> */}

                                            {/* <TableCell align="right">

                                                <IconButton
                                                    disableRipple
                                                    sx={{ padding: '1px', color: 'gray' }}>
                                                    <MoreVertIcon />
                                                </IconButton>

                                                <Menu
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

                                                    <MenuItem
                                                        className={style.anchorMenuItem}>
                                                        <ListItemIcon sx={{ minWidth: '0 !important', marginRight: '8px' }}>
                                                            <EditIcon fontSize="small" sx={{ minWidth: '10px' }} />
                                                        </ListItemIcon>Edit</MenuItem>

                                                    <MenuItem
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
                                            </TableCell> */}
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
            </TableContainer >
        </Stack>
    )
}

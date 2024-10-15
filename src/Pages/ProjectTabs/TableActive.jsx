import {
    Box,
    Menu,
    Table,
    Button,
    TableRow,
    MenuItem,
    TableCell,
    TableBody,
    TableHead,
    IconButton,
    ListItemIcon,
    TableContainer,
    // Stack,
    // Typography,
} from '@mui/material';
import { useState } from 'react';
import style from './style.module.scss'
import { Link } from 'react-router-dom';
import { RouteNames } from '../../Constants/route';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import theme from '../../Theme/Theme';
// import AddIcon from '@mui/icons-material/Add';


export default function TableActive() {
    const [anchor, setAnchor] = useState(null);
    const open = Boolean(anchor);

    const handleClick = (event) => {
        setAnchor(event.currentTarget)
    }

    const handleClose = () => {
        setAnchor(null)
    }

    return (
        <TableContainer>
            <Table className={style.table}>
                <TableHead className={style.tableHead}>
                    <TableRow className={style.tableRowHead}>
                        <TableCell>Project Title</TableCell>
                        <TableCell align="left">Client Name</TableCell>
                        <TableCell align="left">Project Status</TableCell>
                        <TableCell align="left">Members</TableCell>
                        <TableCell align="left">Start Date</TableCell>
                        <TableCell align="left">Due Date</TableCell>
                        <TableCell align="right">Budget</TableCell>
                        <TableCell align="right">&nbsp;</TableCell>
                    </TableRow>
                </TableHead>
                <Box sx={{ height: '16px' }} />
                <TableBody>
                    <TableRow className={style.tableRowBody}>
                        <TableCell component="th" scope="row">Website Design with Responsiveness</TableCell>
                        <TableCell align="left">Charley Robertson</TableCell>
                        <TableCell align="left">
                            <Link to={`${RouteNames.ADDPRODUCTS}`}>
                                <Button variant="text" className={style.tableBodyBtn} endIcon={<KeyboardArrowDownIcon />} size="small">In Progress</Button>
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
                                    className={style.anchorElParent}>
                                    <MenuItem onClick={handleClose} className={style.anchorMenuItem} >
                                        <ListItemIcon
                                            sx={{ minWidth: '0 !important', marginRight: '8px' }}>
                                            <UploadFileIcon fontSize="small" sx={{ minWidth: '10px' }} />
                                        </ListItemIcon>
                                        Upload a file
                                    </MenuItem>
                                </Menu>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            {/* <Stack alignItems='center' justifyContent='end' height='50vh' gap={4} variant="div">
                    <Typography sx={{ fontWeight: '600', color: theme.palette.grey.darkGrey, fontSize: '1.3rem' }}>No active project yet</Typography>

                    <Stack gap={2} width={350} textAlign='center'>
                        <Typography component='p' className={style.btnText}>You haven&apos;t started any projects. Begin a new project to see it appear in your active list.</Typography>
                        <Button variant='contained' size='large' startIcon={<AddIcon />}
                            className={style.projectBtn}>Add Project</Button>
                    </Stack>
                </Stack> */}

        </TableContainer >
    );
}
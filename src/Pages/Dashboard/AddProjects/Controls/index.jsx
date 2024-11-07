import {
    Box,
    // Menu,
    Table,
    Button,
    TableRow,
    // MenuItem,
    TableCell,
    TableBody,
    TableHead,
    // IconButton,
    // ListItemIcon,
    TableContainer,
    Typography,
    // Stack,
    // Typography,
} from '@mui/material';
// import { useState } from 'react';
import style from './style.module.scss';
// import { Link } from 'react-router-dom';
// import { RouteNames } from '../../Constants/route';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import UploadFileIcon from '@mui/icons-material/UploadFile';
// import EditIcon from '@mui/icons-material/Edit';
// import { RouteNames } from '../../../../Constants/route';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import theme from '../../Theme/Theme';
// import AddIcon from '@mui/icons-material/Add';


export default function TableActive() {
    // const [anchor, setAnchor] = useState(null);
    // const open = Boolean(anchor);

    // const handleClick = (event) => {
    //     setAnchor(event.currentTarget)
    // }

    // const handleClose = () => {
    //     setAnchor(null)
    // }

    return (
        <TableContainer>
            <Table className={style.table}>
                <TableHead className={style.tableHead}>
                    <TableRow className={style.tableRowHead}>
                        <TableCell>Team Head</TableCell>
                        <TableCell align="left">Task Title</TableCell>
                        <TableCell align="left">Task Description</TableCell>
                        {/* <TableCell align="left">Members</TableCell> */}
                        <TableCell align="left">Assigned Date</TableCell>
                        <TableCell align="left">Due Date</TableCell>
                        <TableCell align="right">Controls</TableCell>
                        <TableCell align="right">&nbsp;</TableCell>
                    </TableRow>
                </TableHead>
                <Box sx={{ height: '16px' }} />
                <TableBody>
                    <TableRow className={style.tableRowBody}>
                        <TableCell component="th" scope="row">John Doe</TableCell>
                        <TableCell align="left">Task One</TableCell>
                        <TableCell align="left">
                            <Typography sx={{ fontSize: '0.8rem' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae dolor corrupti error illo doloremque itaque nisi unde facere, numquam enim!</Typography>
                        </TableCell>
                        <TableCell align="left">3/18/23</TableCell>
                        {/* <TableCell align="left">carbs</TableCell> */}
                        <TableCell align="left">8/15/24</TableCell>
                        <TableCell align="right">$5,000</TableCell>
                        <TableCell align="right">
                            <Button color="secondary" className={`${style.dialogBtnPrimary}`}>
                                Done
                            </Button>
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
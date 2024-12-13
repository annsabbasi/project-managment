import style from './style.module.scss';

import {
    Button, TableRow,
    TableCell, TableBody,
    Box, Table, Typography,
    TableHead, TableContainer,
} from '@mui/material';


export default function TableActive() {

    return (
        <TableContainer>
            <Table className={style.table}>
                <TableHead className={style.tableHead}>
                    <TableRow className={style.tableRowHead}>
                        <TableCell>Team Head</TableCell>
                        <TableCell align="left">Task Title</TableCell>
                        <TableCell align="left">Task Description</TableCell>
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
                        <TableCell align="left">8/15/24</TableCell>
                        <TableCell align="right">$5,000</TableCell>
                        <TableCell align="right">
                            <Button color="secondary" className={`${style.dialogBtnPrimary}`}>Done</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>

            </Table>
        </TableContainer >
    );
}
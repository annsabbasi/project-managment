import style from './style.module.scss'

import {
    Table, TableCell,
    TableContainer, TableHead,
    TableRow, Box,
    TableBody, Button,
} from '@mui/material';


export default function Complete() {
    return (
        <TableContainer>
            <Table className={style.table}>

                <TableHead className={style.tableHead}>
                    <TableRow className={style.tableRowHead}>
                        <TableCell>Project Title</TableCell>
                        <TableCell align="left">Client Name</TableCell>
                        <TableCell align="left">Project Status</TableCell>
                        <TableCell align="left">Start Date</TableCell>
                        <TableCell align="left">Due Date</TableCell>
                        <TableCell align="left">Complete Date</TableCell>
                        <TableCell align="left">&nbsp;</TableCell>
                    </TableRow>
                </TableHead>


                <Box sx={{ height: '16px' }} />
                <TableBody>
                    <TableRow className={style.tableRowBody}>
                        <TableCell component="th" scope="row">Website Design with Responsiveness</TableCell>
                        <TableCell align="left">Charley Robertson</TableCell>

                        <TableCell align="left">
                            <Button
                                variant="outlined"
                                color="success"
                                className={style.tableBodyBtn}
                                size="small"
                                sx={{
                                    backgroundColor: 'transparent',
                                    color: '#1CAC78',
                                    border: 'none',
                                    cursor: 'default',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        boxShadow: 'none'
                                    },
                                    '& .MuiButton-endIcon': {
                                        marginLeft: '1px',
                                    },
                                }}>Completed</Button>
                        </TableCell>

                        <TableCell align="left">3/18/23</TableCell>
                        <TableCell align="left">Flexible</TableCell>
                        <TableCell align="left">3/18/23</TableCell>
                        <TableCell align="right">&nbsp;</TableCell>
                    </TableRow>
                </TableBody>


            </Table>
        </TableContainer >
    );
}
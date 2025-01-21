import style from './style.module.scss'
import { useAuth } from '../../context/AuthProvider';


import {
    TableRow,
    Table, TableCell,
    TableContainer, TableHead,
    TableBody, Button,
} from '@mui/material';


export default function Complete() {
    const { theme, mode } = useAuth();
    const tableGap = mode === 'light' ? style.tableBodyLight : style.tableBodyDark;

    return (
        <TableContainer>
            <Table sx={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                overflow: 'visible',
                borderRadius: '0.6rem'
            }}>

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

                <TableBody className={tableGap}>
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
                                    color: '#1CAC78',
                                    border: 'none',
                                    cursor: 'default'
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
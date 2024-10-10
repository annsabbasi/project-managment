import {
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    TableBody,
    Button,
} from '@mui/material';
import style from './style.module.scss'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function TableActive() {
    return (
        <TableContainer>
            <Table className={style.table}>
                <TableHead className={style.tableHead}>
                    <TableRow className={style.tableRowHead}>
                        <TableCell>Project Title</TableCell>
                        <TableCell align="right">Client Name</TableCell>
                        <TableCell align="right">Project Status</TableCell>
                        <TableCell align="right">Members</TableCell>
                        <TableCell align="right">Start Date</TableCell>
                        <TableCell align="right">Due Date</TableCell>
                        <TableCell align="right">Budget</TableCell>
                    </TableRow>
                </TableHead>
                <Box sx={{ height: '16px' }} />
                <TableBody>
                    <TableRow className={style.tableRowBody}>
                        <TableCell component="th" scope="row">Website Design with Responsiveness</TableCell>
                        <TableCell align="right">Charley Robertson</TableCell>
                        <TableCell align="right">
                            <Button variant="outlined" className={style.tableBodyBtn} endIcon={<KeyboardArrowDownIcon />}>In Progress</Button>
                        </TableCell>
                        <TableCell align="right">carbs</TableCell>
                        <TableCell align="right">3/18/23</TableCell>
                        <TableCell align="right">8/15/24</TableCell>
                        <TableCell align="right">$5,000</TableCell>
                    </TableRow>
                </TableBody>

            </Table>
        </TableContainer >
    );
}
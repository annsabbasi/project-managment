import style from './style.module.scss'
import { Table, TableCell, TableContainer, TableHead, TableRow, Box, TableBody, Button, } from '@mui/material';

export default function Request() {
    return (
        <TableContainer>
            <Table className={style.table}>
                <TableHead className={style.tableHead}>
                    <TableRow className={style.tableRowHead}>
                        <TableCell>Project Title</TableCell>
                        <TableCell align="left">Client Name</TableCell>
                        <TableCell align="left">Project Status</TableCell>
                        <TableCell align="left">Request Date</TableCell>
                        <TableCell align="left">Due Date</TableCell>
                        <TableCell align="left">&nbsp;</TableCell>
                        <TableCell align="right">&nbsp;</TableCell>
                    </TableRow>
                </TableHead>

                <Box sx={{ height: '16px' }} />
                <TableBody>
                    <TableRow className={style.tableRowBody}>
                        <TableCell component="th" scope="row">Website Design with Responsiveness</TableCell>
                        <TableCell align="left">Charley Robertson</TableCell>
                        <TableCell align="left">
                            <Button variant="text" className={style.tableBodyBtn} size="small">In Progress</Button>
                        </TableCell>

                        <TableCell align="left">carbs</TableCell>
                        <TableCell align="left">3/18/23</TableCell>
                        <TableCell align="right">&nbsp;</TableCell>
                        <TableCell align="left" className={style.btnCell}>
                            <Button variant='outlined' className={style.decline}>Decline</Button>
                            <Button variant='contained' className={style.accept}>Accept</Button>
                        </TableCell>

                    </TableRow>
                </TableBody>

            </Table>
        </TableContainer >
    );
}
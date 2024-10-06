import {
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    Button,
    Avatar,
} from '@mui/material';
import style from './style.module.scss'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function TableActive() {
    return (
        <TableContainer>
            <Table className={style.table}>
                <TableHead>
                    <Box className={style.tableBox}>
                        <TableRow
                            className={style.tableRow}>
                            <TableCell>Project Title</TableCell>
                            <TableCell>Client Name</TableCell>
                            <TableCell>Project Status</TableCell>
                            <TableCell>Members</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>Due Date</TableCell>
                            <TableCell>Budget</TableCell>
                        </TableRow>
                    </Box>
                </TableHead>

                <TableHead>
                    <Box className={style.tableBoxData}>
                        <TableRow
                            className={style.tableRowData}>
                            <TableCell>Website Design with Responsiveness</TableCell>
                            <TableCell>Charley Robertson</TableCell>
                            <TableCell>
                                <Button endIcon={<KeyboardArrowDownIcon />} variant="outlined" size="small">In Progress</Button>
                            </TableCell>
                            <TableCell>
                                <Avatar />
                            </TableCell>
                            <TableCell>3/18/2020</TableCell>
                            <TableCell>8/18/2020</TableCell>
                            <TableCell>$5000</TableCell>
                        </TableRow>
                    </Box>
                </TableHead>

                <TableHead>
                    <Box className={style.tableBoxData}>
                        <TableRow
                            className={style.tableRowData}>
                            <TableCell>Website Design with Responsiveness</TableCell>
                            <TableCell>Charley Robertson</TableCell>
                            <TableCell>
                                <Button endIcon={<KeyboardArrowDownIcon />} variant="outlined" size="small">In Progress</Button>
                            </TableCell>
                            <TableCell>
                                <Avatar />
                            </TableCell>
                            <TableCell>3/18/2020</TableCell>
                            <TableCell>8/18/2020</TableCell>
                            <TableCell>$5000</TableCell>
                        </TableRow>
                    </Box>
                </TableHead>

                <TableHead>
                    <Box className={style.tableBoxData}>
                        <TableRow
                            className={style.tableRowData}>
                            <TableCell>Website Design with Responsiveness</TableCell>
                            <TableCell>Charley Robertson</TableCell>
                            <TableCell>
                                <Button endIcon={<KeyboardArrowDownIcon />} variant="outlined" size="small">In Progress</Button>
                            </TableCell>
                            <TableCell>
                                <Avatar />
                            </TableCell>
                            <TableCell>3/18/2020</TableCell>
                            <TableCell>8/18/2020</TableCell>
                            <TableCell>$5000</TableCell>
                        </TableRow>
                    </Box>
                </TableHead>

                <TableHead>
                    <Box className={style.tableBoxData}>
                        <TableRow
                            className={style.tableRowData}>
                            <TableCell>Website Design with Responsiveness</TableCell>
                            <TableCell>Charley Robertson</TableCell>
                            <TableCell>
                                <Button endIcon={<KeyboardArrowDownIcon />} variant="outlined" size="small">In Progress</Button>
                            </TableCell>
                            <TableCell>
                                <Avatar />
                            </TableCell>
                            <TableCell>3/18/2020</TableCell>
                            <TableCell>8/18/2020</TableCell>
                            <TableCell>$5000</TableCell>
                        </TableRow>
                    </Box>
                </TableHead>

                <TableHead>
                    <Box className={style.tableBoxData}>
                        <TableRow
                            className={style.tableRowData}>
                            <TableCell>Website Design with Responsiveness</TableCell>
                            <TableCell>Charley Robertson</TableCell>
                            <TableCell>
                                <Button endIcon={<KeyboardArrowDownIcon />} variant="outlined" size="small">In Progress</Button>
                            </TableCell>
                            <TableCell>
                                <Avatar />
                            </TableCell>
                            <TableCell>3/18/2020</TableCell>
                            <TableCell>8/18/2020</TableCell>
                            <TableCell>$5000</TableCell>
                        </TableRow>
                    </Box>
                </TableHead>

            </Table>
        </TableContainer>
    );
}







// import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

// export default function TableActive() {
//     const rows = [
//         createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//         createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//         createData('Eclair', 262, 16.0, 24, 6.0),
//         createData('Cupcake', 305, 3.7, 67, 4.3),
//         createData('Gingerbread', 356, 16.0, 49, 3.9),
//     ];


//     function createData(name, calories, fat, carbs, protein) {
//         return { name, calories, fat, carbs, protein };
//     }

//     return (
//         <Box>
//             <TableContainer component={Paper}>
//                 <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Dessert (100g serving)</TableCell>
//                             <TableCell align="right">Calories</TableCell>
//                             <TableCell align="right">Fat&nbsp;(g)</TableCell>
//                             <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//                             <TableCell align="right">Protein&nbsp;(g)</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {rows.map((row) => (
//                             <TableRow
//                                 key={row.name}
//                                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                             >
//                                 <TableCell component="th" scope="row">
//                                     {row.name}
//                                 </TableCell>
//                                 <TableCell align="right">{row.calories}</TableCell>
//                                 <TableCell align="right">{row.fat}</TableCell>
//                                 <TableCell align="right">{row.carbs}</TableCell>
//                                 <TableCell align="right">{row.protein}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </Box>
//     )
// }

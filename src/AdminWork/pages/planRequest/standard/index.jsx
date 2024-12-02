import style from '../../../../Pages/ProjectTabs/style.module.scss';

import {
    Button, TableRow,
    Table, TableCell,
    TableBody, TableHead,
    TableContainer, Stack,
    Typography
} from '@mui/material';
// import { useState } from 'react';
import { Link } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import theme from '../../../../Theme/Theme';


export default function index() {

    return (
        <TableContainer><Table className={style.table}>
            <TableHead className={style.tableHead}>
                <TableRow className={style.tableRowHead}>
                    <TableCell>Name</TableCell>
                    <TableCell align="left">email</TableCell>
                    <TableCell align="left">Plan</TableCell>
                    <TableCell align="left">Purchase Date</TableCell>
                </TableRow>
            </TableHead>

            <TableBody sx={{ borderTop: '12px solid white' }}>
                <TableRow className={style.tableRowBody}>
                    <TableCell component="th" scope="row">John Doe</TableCell>
                    <TableCell align="left">john@gmail.com</TableCell>
                    <TableCell align="left">Standard</TableCell>
                    <TableCell align="left">12/12/2020</TableCell>
                </TableRow>

            </TableBody>
        </Table>
            <Stack alignItems='center' justifyContent='end' height='50vh' gap={4} variant="div">
                <Typography sx={{ fontWeight: '600', color: theme.palette.grey.darkGrey, fontSize: '1.3rem' }}>No active project yet</Typography>

                <Stack gap={2} width={350} textAlign='center'>
                    <Typography component='p' className={style.btnText}>You haven&apos;t started any projects. Begin a new project to see it appear in your active list.</Typography>

                    <Link>
                        <Button variant='contained' size='large' startIcon={<AddIcon />}
                            className={style.projectBtn} >Add Project</Button>
                    </Link>

                </Stack>
            </Stack>

        </TableContainer>
    );
}
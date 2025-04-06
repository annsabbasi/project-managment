import style from "../../../../Pages/ProjectTabs/style.module.scss";
import {
    Button, TableRow,
    Table, TableCell,
    TableBody, TableHead,
    TableContainer, Stack,
    Typography
} from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../../../../context/AuthProvider';

export default function Index() {
    const { mode, theme } = useAuth();
    const tableGap = mode === 'light' ? style.tableBodyLight : style.tableBodyDark;

    const tableClassText = mode === 'light' ? style.lightTableText : style.darkTableText;
    const tableHeadClass = mode === 'light' ? style.lightTableHead : style.darkTableHead;
    const tableBodyClass = mode === 'light' ? style.lightTableBody : style.darkTableBody;
    const tableBtnClass = mode === 'light' ? style.lightTableBtn : style.darkTableBtn;

    return (
        <TableContainer>
            <Table className={style.table} sx={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderRadius: '0.6rem'
            }}>
                <TableHead className={tableHeadClass}>
                    <TableRow className={style.tableRowHead}>
                        <TableCell className={tableClassText}>Name</TableCell>
                        <TableCell align="left" className={tableClassText}>Email</TableCell>
                        <TableCell align="left" className={tableClassText}>Plan</TableCell>
                        <TableCell align="left" className={tableClassText}>Purchase Date</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody className={`${tableBodyClass} ${tableGap}`}>
                    <TableRow className={style.tableRowBody}>
                        <TableCell component="th" scope="row" className={tableClassText}>John Doe</TableCell>
                        <TableCell align="left" className={tableClassText}>john@gmail.com</TableCell>
                        <TableCell align="left" className={tableClassText}>Standard</TableCell>
                        <TableCell align="left" className={tableClassText}>12/12/2020</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            {/* Empty state with "No active project yet" */}
            <Stack alignItems='center' justifyContent='end' height='50vh' gap={4} variant="div">
                <Typography sx={{ fontWeight: '600', fontSize: '1.3rem' }}>No active project yet</Typography>

                <Stack gap={2} width={350} textAlign='center'>
                    <Typography component='p' className={style.btnText}>You haven&apos;t started any projects. Begin a new project to see it appear in your active list.</Typography>

                    <Link>
                        <Button
                            variant='contained'
                            size='large'
                            startIcon={<AddIcon />}
                            className={`${style.projectBtn} ${tableBtnClass}`} // Apply dynamic button styles
                            sx={{
                                color: theme.palette.text.primary,
                                border: `1px solid ${theme.palette.text.primary}`,
                                '&:hover': {
                                    opacity: `0.4 !important`,
                                }
                            }}
                        >
                            Add Project
                        </Button>
                    </Link>
                </Stack>
            </Stack>
        </TableContainer>
    );
}

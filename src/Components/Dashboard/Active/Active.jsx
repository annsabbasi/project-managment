import {
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    Stack,
    Typography,
    Button,
} from '@mui/material';
import theme from '../../../Theme/Theme';
import AddIcon from '@mui/icons-material/Add';
import style from './style.module.scss'

export default function Active() {
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

                <Stack alignItems='center' justifyContent='center' height='75vh' gap={4}>
                    <Typography sx={{ fontWeight: '600', color: theme.palette.grey.darkGrey, fontSize: '1.3rem' }}>No active project yet</Typography>
                    
                    <Stack gap={2} width={350} textAlign='center'>
                        <Typography component='p' className={style.btnText}>You haven&apos;t started any projects. Begin a new project to see it appear in your active list.</Typography>
                        <Button variant='contained' size='large' startIcon={<AddIcon />}
                            className={style.projectBtn}>Add Project</Button>
                    </Stack>
                </Stack>

            </Table>
        </TableContainer>
    );
}

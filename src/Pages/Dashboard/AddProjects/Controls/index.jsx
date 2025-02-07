import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import theme from '../../../../Theme/Theme';
import style from './style.module.scss';


import {
    Table,
    Button, TableRow,
    TableCell,
    TableBody, TableHead,
    TableContainer, Stack,
    Typography
} from '@mui/material';
import { getCompleteSubTask, subCompleteTaskApproval } from '../../../../api/userSubTask';
import { toast } from 'react-toastify';
import { useAuth } from '../../../../context/AuthProvider';



export default function Request() {
    const { theme, mode } = useAuth();
    const tableClassText = mode === 'light' ? style.lightTableText : style.darkTableText;
    const tableGap = mode === 'light' ? style.tableBodyLight : style.tableBodyDark;

    const queryClient = useQueryClient();
    const { data: getCompleteTask } = useQuery({
        queryKey: ['getCompleteSubTask'],
        queryFn: getCompleteSubTask,
        staleTime: 200000,
    })

    // Approve for the Complete Sub Task
    const mutation = useMutation({
        mutationFn: ({ taskID, status }) => subCompleteTaskApproval(taskID, { status }),
        onSuccess: (data) => {
            toast.success(data?.message, {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: false,
            })
            queryClient.invalidateQueries(['getCompleteSubTask'])
        },
        onError: (error) => {
            toast.error(error?.message, {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: false,
            })
        },
    })

    const handleApprove = (taskID) => {
        mutation.mutate({ taskID, status: 'approved' })
    }

    const handleReject = (taskID) => {
        mutation.mutate({ taskID, status: 'progress' })
    }


    return (
        <TableContainer>
            {getCompleteTask?.data?.length > 0 ? (

                <Table sx={{
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    overflow: 'visible',
                    borderRadius: '0.6rem'
                }}>
                    <TableHead className={style.tableHead}>
                        <TableRow className={style.tableRowHead}>
                            <TableCell className={tableClassText}>Title</TableCell>
                            <TableCell align="left" className={tableClassText}>Assign Person</TableCell>
                            <TableCell align="left" className={tableClassText}>Assigned By</TableCell>
                            <TableCell align="left" className={tableClassText}>Start Date</TableCell>
                            <TableCell align="left" className={tableClassText}>Due Date</TableCell>
                            <TableCell align="right" className={tableClassText}>Points</TableCell>
                            <TableCell align="right" className={tableClassText}>Sended By</TableCell>
                            <TableCell align="right" className={tableClassText}>&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody className={tableGap}>
                        {getCompleteTask?.data?.map((task, index) => {
                            return (
                                <TableRow key={index} className={style.tableRowBody}>
                                    <TableCell component="th" scope="row">{task.title}</TableCell>
                                    <TableCell align="left">{task.assign}</TableCell>
                                    <TableCell align="left">{task.assignedBy.name}</TableCell>
                                    <TableCell align="left">{new Date(task.startDate).toLocaleDateString()}</TableCell>
                                    <TableCell align="left">{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                                    <TableCell align="left">{task.points}</TableCell>
                                    <TableCell align="right">sended By</TableCell>

                                    <TableCell align="right" className={style.btnCell}>
                                        <Button variant="outlined" className={style.decline} onClick={() => handleReject(task._id)}>Reject</Button>
                                        <Button variant="contained" className={style.accept} onClick={() => handleApprove(task._id)}>Approve</Button>
                                    </TableCell>
                                </TableRow>
                            )

                        })}
                    </TableBody>
                </Table>
            ) : (
                <Stack alignItems='center' justifyContent='end' height='50vh' gap={2} variant="div">
                    <Typography sx={{ fontWeight: '600', fontSize: '1.3rem' }}>No Completed Sub-Task yet!</Typography>
                    <Stack width={350} textAlign='center'>
                        <Typography component='p'>When any of the User&apos;s Completes their Task then it will be shown up here.</Typography>
                    </Stack>
                </Stack>
            )}

        </TableContainer >
    );
}

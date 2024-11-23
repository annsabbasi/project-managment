/* eslint-disable react-hooks/rules-of-hooks */
import {
    Avatar,
    Box,
    Button,
    // Divider,
    Stack,
    Typography,
    Table,
    TableRow,
    TableCell,
    TableBody,
    TableHead,
    TableContainer,
} from "@mui/material";
import style from "./style.module.scss"
// import theme from "../../../../Theme/Theme";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchTaskById } from "../../../../api/taskApi";
import { getSubTask } from "../../../../api/userSubTask";
import { useEffect, useState } from "react";

export default function index({ projectId }) {
    // Fetching The Admin User Project Task...
    const { id } = useParams();
    const { data: taskData } = useQuery({
        queryKey: ['task', id],
        queryFn: () => fetchTaskById(id),
        enabled: !!id, // Fetch only if taskId exists
        staleTime: 50000
    }
    )

    // Fetching The SubUser Task...
    // const { data } = useQuery({
    //     queryKey: ['userSubTask', projectId],
    //     queryFn: () => getSubTask(projectId),
    //     enabled: !!projectId, // Ensures the query runs only when projectId is available
    // })
    // const tasks = data?.data || [];

    // console.log("This is the SubUserTask from the Overview.jsx", tasks)


    const [subTasks, setSubTasks] = useState([]);

    useEffect(() => {
        const fetchSubTasks = async () => {
            try {
                const response = await getSubTask(id);
                if (response) {
                    setSubTasks(response.data);
                }
            } catch (error) {
                console.error("Error fetching subtasks:", error);
            }
        };

        fetchSubTasks();
    }, [projectId]);

    return (
        <Stack variant="main" flexDirection="column" gap={2}>
            <Stack gap={2}>

                <Box variant="div" className={style.boxMain1}>
                    <Box variant="header" sx={{ marginBlock: '0.4rem', marginBottom: '1rem' }}>
                        <Typography variant="h6">Project Info</Typography>
                    </Box>

                    <Stack sx={{ width: '100%' }} gap={2}>
                        <Stack flexDirection="row" width="100%" justifyContent="space-between">
                            <Stack flexDirection="row" gap={2} alignItems="center">
                                <Typography className={style.textGrey}>Team Head</Typography>
                                <Typography className={style.textGreyInfo}>{taskData?.data?.teamLeadName && Array.isArray(taskData?.data?.teamLeadName) && taskData?.data?.teamLeadName.join(', ')}</Typography>
                            </Stack>
                            <Stack flexDirection="row" gap={2} alignItems="center">
                                <Typography className={style.textGrey}>Start Date</Typography>
                                <Typography className={style.textGreyInfo}>3/18/2020</Typography>
                            </Stack>
                        </Stack>

                        <Stack flexDirection="row" width="100%" justifyContent="space-between">
                            <Stack flexDirection="row" gap={2} alignItems="center">
                                <Typography className={style.textGrey}>Status</Typography>
                                <Button variant="text" className={style.statusBtn}>{taskData?.data?.projectStatus}</Button>
                            </Stack>
                            <Stack flexDirection="row" gap={2} alignItems="center">
                                <Typography className={style.textGrey}>Due Date</Typography>
                                <Typography className={style.textGreyInfo} sx={{ color: 'red !important' }}>3/18/2020</Typography>
                            </Stack>
                        </Stack>

                        <Stack flexDirection="row" width="100%" justifyContent="space-between">
                            <Stack flexDirection="row" gap={2} alignItems="center">
                                <Typography className={style.textGrey}>Budget</Typography>
                                <Typography className={style.textGreyInfo}>$-{taskData?.data?.budget}</Typography>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Box sx={{ marginBlock: '0.8rem' }}>
                        <Typography variant="h6" className={style.texth6}>Description</Typography>
                        <Typography variant="p" className={style.textGreyDesc}>{taskData?.data?.description}</Typography>
                    </Box>

                    <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
                        <Box mb={2}>
                            <Typography variant="h6" className={style.texth6}>Project Points</Typography>
                            <Typography variant="p" className={style.textGreyDesc} sx={{ color: 'green !important' }}>{taskData?.data?.points}</Typography>
                        </Box>
                        <Button color="primary" className={`${style.dialogBtnSecondary}`}>
                            Submit
                        </Button>
                    </Stack>
                </Box>

                <Stack flexDirection="row" justifyContent="space-between" gap={5}>
                    <Box className={style.BoxContent} sx={{ flexGrow: '1' }}>
                        <Box variant="header" sx={{ marginBlock: '0.4rem', marginBottom: '1rem' }}>
                            <Typography variant="h6">Project Info</Typography>
                        </Box>
                        <Stack flexDirection="row" justifyContent="space-between" mb={2}>
                            <Typography className={style.texth6}>Client Aggrement</Typography>
                            <Button variant="text" className={style.statusBtn} sx={{ backgroundColor: 'rgba(57, 245, 57, 0.2)', color: 'green' }}>in progress</Button>
                        </Stack>
                    </Box>

                    <Box className={style.BoxContent} sx={{ flexGrow: '1' }}>
                        <Box variant="header" sx={{ marginBlock: '0.4rem', marginBottom: '1rem' }}>
                            <Typography variant="h6">Project Info</Typography>
                        </Box>

                        <Stack flexDirection="row" justifyContent='space-between' gap={4} mb={2}>
                            <Stack flexDirection="row" gap={1} sx={{ color: 'silver' }}>
                                <Stack gap={1}>
                                    <Typography sx={{ color: 'black' }}>Income</Typography>
                                    <Typography className={style.textGreyDesc}>$10,000</Typography>
                                </Stack>
                                =
                                <Stack gap={1}>
                                    <Typography sx={{ color: 'black' }}>Expense</Typography>
                                    <Typography className={style.textGreyDesc}>$5,000</Typography>
                                </Stack>
                                =
                                <Stack gap={1}>
                                    <Typography sx={{ color: 'black' }}>Profit</Typography>
                                    <Typography className={style.textGreyDesc}>$1,000</Typography>
                                </Stack>
                            </Stack>

                            <Box>
                                <Typography className={style.textGrey}>Margin</Typography>
                                <Typography variant="h6" sx={{ color: 'green' }}>50%</Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Stack>
            </Stack>

            <Stack variant="div" className={style.boxMain2}>

                <TableContainer>
                    <Table className={style.table}>
                        <TableHead className={style.tableHead}>
                            <TableRow className={style.tableRowHead}>
                                <TableCell align="left" variant="h6" sx={{ fontSize: "1.1rem" }}>Title</TableCell>
                                <TableCell variant="h6" sx={{ fontSize: "1.1rem" }}>Assign To</TableCell>
                                <TableCell variant="h6" sx={{ fontSize: "1.1rem" }}>Assign By</TableCell>
                                <TableCell align="left" variant="h6" sx={{ fontSize: "1.1rem" }}>Description</TableCell>
                                <TableCell align="left" variant="h6" sx={{ fontSize: "1.1rem" }}>Start Date</TableCell>
                                <TableCell align="left" variant="h6" sx={{ fontSize: "1.1rem" }}>Due Date</TableCell>
                                <TableCell align="right" variant="h6" sx={{ fontSize: "1.1rem" }}>Points</TableCell>
                                <TableCell align="right" variant="h6" sx={{ fontSize: "1.1rem" }}>TaskList</TableCell>
                                <TableCell align="right" variant="h6" sx={{ fontSize: "1.1rem" }}>&nbsp;</TableCell>
                            </TableRow>
                        </TableHead>

                        <Box sx={{ height: '16px' }} />
                        <TableBody>
                            {subTasks.map((task, index) => {
                                return (
                                    <TableRow key={index} className={style.tableRowBody}>
                                        <TableCell component="th" scope="row" >{task.title}</TableCell>
                                        <TableCell component="th" scope="row" className={style.textGrey}>{task.assign && Array.isArray(task.assign) && task.assign.join(', ')}</TableCell>

                                        <TableCell align="left">
                                            <Stack
                                                flexDirection="row"
                                                gap={1}
                                                sx={{ cursor: "pointer", maxWidth: "6rem", minWidth: "6rem" }}>
                                                <Avatar sx={{ bgcolor: "silver", width: "1.4rem", height: "1.4rem", fontSize: '14px' }}>
                                                    {task.assignedBy?.name?.[0]?.toUpperCase()}
                                                </Avatar>
                                                <Typography className={style.textGrey}>{task.assignedBy?.name}</Typography>
                                            </Stack>
                                        </TableCell>

                                        <TableCell align="left">
                                            <Typography sx={{ fontSize: '0.8rem' }} className={style.textGrey}>{task.description}</Typography>
                                        </TableCell>

                                        <TableCell align="left" className={style.textGrey} sx={{ color: 'green !important' }}>{new Date(task.startDate).toLocaleDateString()}</TableCell>
                                        <TableCell align="left" className={style.textGrey} sx={{ color: 'red !important' }}>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                                        <TableCell align="right" sx={{ color: 'purple !important' }} className={style.textGrey}>{task.points}</TableCell>
                                        <TableCell align="right">
                                            <Button variant="text" className={style.statusBtn}>{task.taskList}</Button>
                                        </TableCell>

                                        <TableCell align="right">
                                            <Button color="error" className={`${style.dialogBtnPrimary}`}>
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>

                </TableContainer >
            </Stack>
        </Stack>
    );
}

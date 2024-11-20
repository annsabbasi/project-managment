/* eslint-disable react-hooks/rules-of-hooks */
import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import style from "./style.module.scss"
import theme from "../../../../Theme/Theme";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchTaskById } from "../../../../api/taskApi";

export default function index() {
    const { id } = useParams();

    const { data: taskData } = useQuery({
        queryKey: ['task', id],
        queryFn: () => fetchTaskById(id),
        enabled: !!id, // Fetch only if taskId exists
        staleTime: 50000
    }
    )

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
                <Stack justifyContent="space-between" flexDirection="row" padding="1.2rem 0" paddingInlineStart={2} paddingInlineEnd={2}>
                    <Typography variant="h6" sx={{ fontSize: "1.1rem" }}>Title</Typography>
                    <Typography variant="h6" sx={{ fontSize: "1.1rem" }}>Assignee</Typography>
                    <Typography variant="h6" sx={{ fontSize: "1.1rem" }}>Due Date</Typography>
                    <Typography variant="h6" sx={{ fontSize: "1.1rem" }}>Start Date</Typography>
                    <Typography variant="h6" sx={{ fontSize: "1.1rem" }}>Task List</Typography>
                </Stack>
                <Divider />

                <Box sx={{ padding: '0.2rem 0.8rem' }}>
                    <Stack justifyContent="space-between" flexDirection="row" padding="0.2rem 0" my={1}>
                        <Typography sx={{ maxWidth: '50px' }}>Lorem ipsum</Typography>

                        <Stack flexDirection="row" gap={1} sx={{ cursor: 'pointer', maxWidth: '6rem', minWidth: '6rem' }}>
                            <Avatar sx={{ bgcolor: theme.palette.grey.A300, width: '1.4rem', height: '1.4rem' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: '1rem', height: '1rem' }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                            </Avatar>
                        </Stack>

                        <Typography className={style.textGrey}>90/78/2020</Typography>
                        <Typography className={style.textGrey}>90/78/2022</Typography>
                        <Stack flexDirection="row" gap={1} alignItems="center">
                            {/* <TaskAltIcon sx={{ width: '1.2rem', height: '1.2rem' }} /> */}
                            <Typography className={style.textGrey}>Completed</Typography>
                        </Stack>
                    </Stack>

                </Box>
            </Stack>
        </Stack>
    )
}

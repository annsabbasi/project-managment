import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import style from "./style.module.scss"
import TaskAltIcon from '@mui/icons-material/TaskAlt';

export default function index() {
    return (
        <Stack variant="main" flexDirection="row" gap={2}>
            <Stack gap={2} sx={{flexGrow: '1'}}>
                <Box variant="div" className={style.boxMain1}>
                    <Box variant="header" sx={{ marginBlock: '0.4rem', marginBottom: '1rem' }}>
                        <Typography variant="h6">Project Info</Typography>
                    </Box>
                    <Stack sx={{ width: '100%' }} gap={2}>
                        <Stack flexDirection="row" width="100%" justifyContent="space-between">
                            <Stack flexDirection="row" gap={2} alignItems="center">
                                <Typography className={style.textGrey}>Client</Typography>
                                <Typography className={style.textGreyInfo}>Steven Li</Typography>
                            </Stack>
                            <Stack flexDirection="row" gap={2} alignItems="center">
                                <Typography className={style.textGrey}>Start Date</Typography>
                                <Typography className={style.textGreyInfo}>3/18/2020</Typography>
                            </Stack>
                        </Stack>
                        <Stack flexDirection="row" width="100%" justifyContent="space-between">
                            <Stack flexDirection="row" gap={2} alignItems="center">
                                <Typography className={style.textGrey}>Status</Typography>
                                <Button variant="text" className={style.statusBtn}>in progress</Button>
                            </Stack>
                            <Stack flexDirection="row" gap={2} alignItems="center">
                                <Typography className={style.textGrey}>Due Date</Typography>
                                <Typography className={style.textGreyInfo}>3/18/2020</Typography>
                            </Stack>
                        </Stack>
                        <Stack flexDirection="row" width="100%" justifyContent="space-between">
                            <Stack flexDirection="row" gap={2} alignItems="center">
                                <Typography className={style.textGrey}>Budget</Typography>
                                <Typography className={style.textGreyInfo}>15000-$</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Box sx={{ marginBlock: '0.8rem' }}>
                        <Typography variant="h6" className={style.texth6}>Description</Typography>
                        <Typography variant="p" className={style.textGreyDesc}>Here, the project description will be shown up.</Typography>
                    </Box>
                    <Box mb={2}>
                        <Typography variant="h6" className={style.texth6}>Services</Typography>
                        <Typography variant="p" className={style.textGreyDesc}>Website Design - <Typography variant="span">Due in 7 days.</Typography></Typography>
                    </Box>
                </Box>

                <Box className={style.BoxContent}>
                    <Box variant="header" sx={{ marginBlock: '0.4rem', marginBottom: '1rem' }}>
                        <Typography variant="h6">Project Info</Typography>
                    </Box>
                    <Stack flexDirection="row" justifyContent="space-between" mb={2}>
                        <Typography className={style.texth6}>Client Aggrement</Typography>
                        <Button variant="text" className={style.statusBtn} sx={{ backgroundColor: 'rgba(57, 245, 57, 0.2)', color: 'green' }}>in progress</Button>
                    </Stack>
                </Box>

                <Box className={style.BoxContent}>
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


            <Box variant="div" className={style.boxMain2}>
                <Stack justifyContent="space-between" flexDirection="row" padding="1.2rem 0" paddingInlineStart={4} paddingInlineEnd={2}>
                    <Typography variant="h6" sx={{ fontSize: "1.1rem" }}>Task List</Typography>
                    <Typography variant="h6" sx={{ fontSize: "1.1rem" }}>Assignee</Typography>
                    <Typography variant="h6" sx={{ fontSize: "1.1rem" }}>Due Date</Typography>
                </Stack>
                <Divider />
                <Box sx={{ padding: '0.2rem 0.8rem' }}>
                    <Stack justifyContent="space-between" flexDirection="row" padding="0.2rem 0" my={1}>
                        <Stack flexDirection="row" gap={1} alignItems="center">
                            <TaskAltIcon sx={{ width: '1.2rem', height: '1.2rem' }} />
                            <Typography className={style.textGrey}>Task List</Typography>
                        </Stack>
                        <Typography className={style.textGrey}>Assignee</Typography>
                        <Typography className={style.textGrey}>Due Date</Typography>
                    </Stack>
                    <Divider />

                </Box>
            </Box>
        </Stack>
    )
}

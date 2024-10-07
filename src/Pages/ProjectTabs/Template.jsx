import { Card, CardContent, Typography, Avatar, Grid, Divider, Box, Stack, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import theme from '../../Theme/Theme';

export default function Template() {
    const members = [
        { name: 'Steven Li', avatar: 'SL', billable: '6h 24m', nonBillable: '3h 10m', total: '6h 24m' },
        { name: 'James Smith', avatar: 'JS', billable: '5h 15m', nonBillable: '1h 40m', total: '5h 15m' },
        { name: 'Philip Barnwell', avatar: 'PB', billable: '6h 40m', nonBillable: '4h 20m', total: '6h 40m' },
        { name: 'Charley Robertson', avatar: 'CR', billable: '4h 50m', nonBillable: '3h 40m', total: '4h 50m' },
    ];

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between' }}>
                <Card sx={{ boxShadow: 3, flexGrow: '1' }}>
                    <CardContent>
                        <Grid container justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h6" fontWeight="bold">Time Tracked</Typography>
                            <Typography variant="body2" color="textSecondary">This Week</Typography>
                        </Grid>
                        <Divider />

                        <Box mt={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <Typography width="20%" sx={{ fontSize: '1rem', fontWeight: 500, color: theme.palette.grey[900], }}>Member</Typography>
                                <Typography sx={{ fontSize: '1rem', fontWeight: 500, color: theme.palette.grey[900] }}>Billable</Typography>
                                <Typography sx={{ fontSize: '1rem', fontWeight: 500, color: theme.palette.grey[900] }}>Billable</Typography>
                                <Typography sx={{ fontSize: '1rem', fontWeight: 500, color: theme.palette.grey[900] }}>Billable</Typography>
                            </Box>

                            {members.map((member, index) => (
                                <Stack key={index} sx={{ mb: 2 }} alignItems="center" justifyContent="space-between" flexDirection="row">
                                    <Box display="flex" alignItems="center" width="20%">
                                        <Avatar sx={{ width: '2.2rem', height: '2.2rem' }}>{member.avatar}</Avatar>
                                        <Typography variant="body1" sx={{ marginLeft: 1, color: theme.palette.grey[600], fontSize: '0.8rem', lineHeight: '1.2' }}>{member.name}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontSize: '0.8rem', color: theme.palette.grey[600], }}>{member.billable}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontSize: '0.8rem', color: theme.palette.grey[600], }}>{member.nonBillable}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontSize: '0.8rem', color: theme.palette.grey[600], }}>{member.total}</Typography>
                                    </Box>
                                </Stack>
                            ))}
                        </Box>

                        <Divider />
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.9rem' }}>
                            <Typography width="21%" sx={{ fontSize: '1rem', fontWeight: 600, color: theme.palette.grey[700], }}>Totals</Typography>
                            <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: theme.palette.grey[700] }}>23h 9m</Typography>
                            <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: theme.palette.grey[700] }}>23h 9m</Typography>
                            <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: theme.palette.grey[700] }}>23h 9m</Typography>
                        </Box>
                    </CardContent>
                </Card>

                <Card sx={{ boxShadow: 3, flexGrow: '1' }}>
                    <CardContent>
                        <Grid container justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h6" fontWeight="bold">Time Tracked</Typography>
                            <Typography variant="body2" color="textSecondary">This Week</Typography>
                        </Grid>
                        <Divider />

                        <Box mt={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <Typography width="20%" sx={{ fontSize: '1rem', fontWeight: 500, color: theme.palette.grey[900], }}>Member</Typography>
                                <Typography sx={{ fontSize: '1rem', fontWeight: 500, color: theme.palette.grey[900] }}>Billable</Typography>
                                <Typography sx={{ fontSize: '1rem', fontWeight: 500, color: theme.palette.grey[900] }}>Billable</Typography>
                                <Typography sx={{ fontSize: '1rem', fontWeight: 500, color: theme.palette.grey[900] }}>Billable</Typography>
                            </Box>

                            {members.map((member, index) => (
                                <Stack key={index} sx={{ mb: 2 }} alignItems="center" justifyContent="space-between" flexDirection="row">
                                    <Box display="flex" alignItems="center" width="20%">
                                        <Avatar sx={{ width: '2.2rem', height: '2.2rem' }}>{member.avatar}</Avatar>
                                        <Typography variant="body1" sx={{ marginLeft: 1, color: theme.palette.grey[600], fontSize: '0.8rem', lineHeight: '1.2' }}>{member.name}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontSize: '0.8rem', color: theme.palette.grey[600], }}>{member.billable}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontSize: '0.8rem', color: theme.palette.grey[600], }}>{member.nonBillable}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontSize: '0.8rem', color: theme.palette.grey[600], }}>{member.total}</Typography>
                                    </Box>
                                </Stack>
                            ))}
                        </Box>

                        <Divider />
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.9rem' }}>
                            <Typography width="21%" sx={{ fontSize: '1rem', fontWeight: 600, color: theme.palette.grey[700], }}>Totals</Typography>
                            <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: theme.palette.grey[700] }}>23h 9m</Typography>
                            <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: theme.palette.grey[700] }}>23h 9m</Typography>
                            <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: theme.palette.grey[700] }}>23h 9m</Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Box>

            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                gap={2}
                sx={{ margin: "0 auto", marginTop: '1.5rem' }}
            >
                {/* Members Dropdown */}
                <FormControl fullWidth size="small">
                    <InputLabel>All Members</InputLabel>
                    <Select
                        label="All Members"
                    >
                        <MenuItem value="Member 1">Member 1</MenuItem>
                        <MenuItem value="Member 2">Member 2</MenuItem>
                        <MenuItem value="Member 3">Member 3</MenuItem>
                    </Select>
                </FormControl>

                {/* Date Pickers */}

                {/* Projects Dropdown */}
                <FormControl fullWidth size="small">
                    <InputLabel>All Projects</InputLabel>
                    <Select
                        label="All Projects"
                    >
                        <MenuItem value="Project 1">Project 1</MenuItem>
                        <MenuItem value="Project 2">Project 2</MenuItem>
                        <MenuItem value="Project 3">Project 3</MenuItem>
                    </Select>
                </FormControl>
            </Box>


        </Box>

    );
}

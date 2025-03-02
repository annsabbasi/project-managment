import { useParams, useNavigate } from "react-router-dom";
// import { useGetUserProfileData } from "../api/userProfileApi";
import { Avatar, Typography, Grid, IconButton, Divider, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useGetTeamProfileData } from "../../../../api/userProfile";

export default function GetUserPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: user, isLoading, error } = useGetTeamProfileData(id);

    if (isLoading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error: {error.message}</Typography>;

    const userData = user?.data;

    return (
        <Box sx={{ p: 4, maxWidth: "800px", margin: "auto", position: "relative" }}>
            <IconButton onClick={() => navigate(-1)} sx={{ position: "absolute", top: 0, left: -20 }}>
                <ArrowBackIcon sx={{ fontSize: 30 }} />
            </IconButton>

            <Box textAlign="center" mb={3}>
                <Avatar
                    src={userData?.avatar}
                    alt={userData?.name}
                    sx={{ width: 140, height: 140, margin: "auto", boxShadow: 3 }}
                />
                <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2 }}>
                    {userData?.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    {userData?.email}
                </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={2}>
                {[
                    { label: "Role", value: userData?.role },
                    { label: "Joined On", value: new Date(userData?.JoinedOn).toDateString() },
                    { label: "Plan", value: userData?.plan },
                    { label: "Hourly Rate", value: `$${userData?.hourlyRate}/hr` },
                    { label: "Gender", value: userData?.gender },
                    { label: "Slack ID", value: userData?.slackId },
                    { label: "Upwork ID", value: userData?.upworkId },
                    { label: "LinkedIn", value: userData?.linkedinId },
                    { label: "Facebook", value: userData?.facebookId },
                ].map((item, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: "2px" }}>
                            {item.label}:
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: "20px" }}>
                            {item.value || "N/A"}
                        </Typography>
                    </Grid>
                ))}
            </Grid>

            {userData?.description && (
                <Box mt={3}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Description
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {userData?.description}
                    </Typography>
                </Box>
            )}
        </Box>
    );
}

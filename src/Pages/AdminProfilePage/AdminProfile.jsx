import { useState } from "react";
import { Avatar, Box, Button, Grid, TextField, Typography, MenuItem, Stack, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EditProfileModal from "./EditProfileModal";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import style from "./style.module.scss"
import { useUpdateProfile } from "../../api/userProfile";
import { toast } from "react-toastify";

const AdminProfile = () => {
    const { theme } = useAuth();
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        description: "",
        slackId: "",
        upworkId: "",
        linkedinId: "",
        facebookId: "",
        gender: "",
    });
    const { mutate: updateProfile, isLoading } = useUpdateProfile();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        updateProfile(formData, {
            onSuccess: () => {
                toast.success("Profile updated successfully");
                setFormData({
                    description: "",
                    slackId: "",
                    upworkId: "",
                    linkedinId: "",
                    facebookId: "",
                    gender: "",
                });
            },
            onError: (error) => {
                toast.error(error.response?.data?.error || "Failed to update profile");
            },
        });
    };


    return (
        <Box sx={{ display: "flex", justifyContent: "center", }}>
            <Stack elevation={3} sx={{ width: "90%", p: 4, borderRadius: 3 }}>
                <Link className={style.goBack} to={`/project`}>
                    <IconButton disableRipple >
                        <ArrowBackIosNewIcon sx={{ color: theme.palette.text.primary }} />
                    </IconButton>
                    <Typography className={style.goBackTitle} sx={{ color: theme.palette.text.primary }}>Go Back</Typography>
                </Link>

                <Grid container spacing={3} alignItems="center">
                    {/* Profile Avatar & Info */}
                    <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
                        <Avatar
                            src="https://via.placeholder.com/150"
                            sx={{ width: 80, height: 80, margin: "auto" }}
                        />
                        <Typography variant="h6" fontWeight={600} mt={2}>
                            Alexa Rawles
                        </Typography>
                        <Typography color="gray">alexarawles@gmail.com</Typography>
                        <Typography color="gray">Hourly Rate: 45$</Typography>
                    </Grid>
                    <Grid item xs={12} sm={8} sx={{ textAlign: "right" }}>
                        <Button variant="contained" startIcon={<EditIcon />} onClick={() => setOpenModal(true)}>
                            Edit
                        </Button>
                    </Grid>
                </Grid>

                {/* Form Section */}
                <Grid container spacing={3} mt={3}>
                    {[
                        { name: "upworkId", label: "Upwork", link: "https://Upwork.com" },
                        { name: "linkedinId", label: "Linkedin", link: "https://Upwork.com" },
                        { name: "slackId", label: "Slack", link: "https://Upwork.com" },
                        { name: "facebookId", label: "Facebook", link: "https://Upwork.com" },
                        { name: "gender", label: "Gender", select: true, options: ["Male", "Female"] },
                    ].map((field, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            {field.select ? (
                                <Stack>
                                    <Typography mb={1}>{field.link}</Typography>
                                    <TextField
                                        fullWidth
                                        select
                                        name={field.name}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                        label={field.label}
                                    >
                                        {field.options.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Stack>
                            ) : (
                                <Stack>
                                    <Typography mb={1} sx={{ cursor: "pointer" }}>( {field.link} )</Typography>
                                    <TextField
                                        fullWidth
                                        name={field.name}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                        label={field.label}
                                    />

                                </Stack>
                            )}
                        </Grid>
                    ))}
                </Grid>

                {/* Email Address Section */}
                <Box mt={4}>
                    <Typography variant="h6" fontWeight={600}>
                        My Details
                    </Typography>
                    <Typography sx={{ fontSize: "13px", letterSpacing: "1px", lineHeight: "22px", paddingTop: "5px" }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ab atque eius suscipit quis distinctio tenetur, commodi deserunt perferendis vero officia quas error placeat incidunt eos dolorem harum iure consectetur illum quod velit laudantium minus nobis! Ullam cum libero in.
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Edit my details..."
                        sx={{ mt: 2 }}
                    />


                    <Button variant="outlined" sx={{ mt: 2 }} onClick={handleSubmit} disabled={isLoading}>
                        {isLoading ? "Saving..." : "✔ Save Changes"}
                    </Button>
                </Box>
            </Stack>
            <EditProfileModal open={openModal} handleClose={() => setOpenModal(false)} />
        </Box>
    );
};

export default AdminProfile;

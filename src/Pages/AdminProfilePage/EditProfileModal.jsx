import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { useUpdateProfile } from "../../api/userProfile";
import { toast } from "react-toastify";

const EditProfileModal = ({ open, handleClose, user }) => {
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        hourlyRate: user?.hourlyRate || "",
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const mutation = useUpdateProfile();

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async () => {
        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("hourlyRate", formData.hourlyRate);
        if (selectedFile) {
            data.append("profilePicture", selectedFile);
        }

        mutation.mutate(data, {
            onSuccess: () => {
                toast.success("Profile updated successfully!");
                setFormData({ name: "", email: "", hourlyRate: "" });
                setSelectedFile(null);
                handleClose();
            },
            onError: (error) => toast.error(error.response?.data?.error || "Update failed"),
        });
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h6" fontWeight={600} gutterBottom>
                    Edit Profile
                </Typography>
                <TextField fullWidth name="name" value={formData.name} onChange={handleChange} size="medium" label="Full Name" sx={{ mb: 2 }} />
                <TextField fullWidth name="email" value={formData.email} onChange={handleChange} size="medium" label="Email" sx={{ mb: 2 }} />
                <TextField fullWidth name="hourlyRate" value={formData.hourlyRate} onChange={handleChange} size="medium" label="Enter your hourly price" sx={{ mb: 2 }} />
                <Box>
                    <Button variant="outlined" component="label">
                        Upload Image
                        <input type="file" hidden onChange={handleFileChange} />
                    </Button>
                    {selectedFile && <Typography sx={{ mt: 1 }}>{selectedFile.name}</Typography>}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                    <Button onClick={handleClose} sx={{ mr: 2 }}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit} disabled={mutation.isLoading}>
                        {mutation.isLoading ? "Saving..." : "Save"}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditProfileModal;

EditProfileModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    user: PropTypes.object,
};
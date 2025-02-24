import { useState } from "react";
import {
    Stack,
    Box, Button,
    TextField, Typography,
    Snackbar,
    Alert,
} from "@mui/material";

import { styled } from "@mui/system";
import style from './styles.module.scss'
import { useAddVideo } from "./videoApi/addVideo";


const StyledInput = styled("input")({
    display: "none",
});


const Uploads = () => {
    const [video, setVideo] = useState(null);
    const [videoURL, setVideoURL] = useState("");
    const [description, setDescription] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const { mutate: addVideo } = useAddVideo();


    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (!file || file.size > 100 * 1024 * 1024) {
            setSnackbarOpen(true);
            return;
        } else {
            setVideo(file);
            const videoPreviewURL = URL.createObjectURL(file);
            setVideoURL(videoPreviewURL);
        }
    };


    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("video", video);
        formData.append("description", description);
        addVideo(formData);
        // console.log("Uploaded Video:", video);
        // console.log("This vifro is brrn uploafrf gtom ghr vloifinatrye  ", video)
        // console.log("Description:", description);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };


    return (
        <Box component="form" onSubmit={handleSubmit} noValidate className={style.mainContainer}>
            <Typography variant="h4" component="h1" gutterBottom textAlign="left" mb={4}>
                Upload Your Video
            </Typography>
            <Stack spacing={3}>
                <label htmlFor="video-upload" style={{ width: 'fit-content' }}>
                    <StyledInput
                        accept="video/*"
                        id="video-upload"
                        type="file"
                        onChange={handleVideoChange} />
                    <Button
                        variant="contained"
                        component="span"
                        fullWidth
                        className={style.dialogBtnSecondary}
                    >
                        {video ? video.name : "Choose Video"}
                    </Button>
                </label>
                {videoURL && (
                    <Box
                        className={style.previewVideo}>
                        <Typography variant="h6" gutterBottom>
                            Video Preview
                        </Typography>
                        <video
                            src={videoURL}
                            controls
                            style={{ maxWidth: "100%", borderRadius: "8px" }}
                        />
                    </Box>
                )}
                <TextField
                    label="Video Description"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={description}
                    onChange={handleDescriptionChange}
                    fullWidth />
                <Button
                    size="md"
                    variant="outlined"
                    // className={style.linkBtn}
                    type="submit"
                >Submit</Button>
            </Stack>
            {/* Snackbar for showing file size error */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="error"
                    sx={{ width: '100%' }}
                >
                    File size exceeds 100MB!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Uploads;

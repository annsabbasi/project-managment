import { useState } from "react";
import {
    Stack,
    Box, Button,
    TextField, Typography,
} from "@mui/material";

import { styled } from "@mui/system";
import style from './styles.module.scss'


const StyledInput = styled("input")({
    display: "none",
});


const Uploads = () => {
    const [video, setVideo] = useState(null);
    const [videoURL, setVideoURL] = useState("");
    const [description, setDescription] = useState("");

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
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
        console.log("Uploaded Video:", video);
        console.log("Description:", description);
    };


    return (
        <Box className={style.mainContainer}>
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
                    variant="contained"
                    size="md"
                    onClick={handleSubmit}
                    className={style.linkBtn}
                >Submit</Button>
            </Stack>
        </Box>
    );
};

export default Uploads;

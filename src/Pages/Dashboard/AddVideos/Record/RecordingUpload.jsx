import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Snackbar,
  Alert,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import style from "./../styles.module.scss";
import { useAddRecordVideo } from "../videoApi/addVideo";

export const RecordingUpload = (prop) => {
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // State for success message
  const { mutate: addRecordVideo } = useAddRecordVideo();

  const handleClose = () => {
    prop.closePopup();
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    try {
      if (!prop.videoURL) {
        setError("Video URL is missing.");
        return;
      }
      const response = await fetch(prop.videoURL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();

      // Create a File object from the blob
      const file = new File([blob], "recorded-video.mp4", {
        type: blob.type || "video/mp4",
      });

      formData.append("video", file);
      formData.append("description", description);
      formData.append("type", "Record"); // Type of video upload or record
      await addRecordVideo(formData);
      console.log("Video submitted successfully.");
      setSuccess(true); // Show success message
      handleClose();
    } catch (error) {
      console.error("Failed to submit:", error);
      setError(error.message);
    }
  };

  return (
    <div className={style.record_preview}>
      {prop.videoURL && (
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          className={style.previewVideo}
        >
          <IconButton className={style.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom className={style.videoTitle}>
            Video Preview
          </Typography>

          <video
            src={prop.videoURL}
            autoPlay
            controls
            style={{ maxWidth: "100%", borderRadius: "8px" }}
          />
          <TextField
            label="Video Description"
            multiline
            rows={4}
            variant="outlined"
            value={description}
            onChange={handleDescriptionChange}
            fullWidth
            className={style.descriptionField}
          />
          <div className={style.uploadButtonContainer}>
            <Button
              variant="contained"
              size="md"
              className={style.linkBtn}
              type="submit"
            >
              Submit
            </Button>
          </div>
        </Box>
      )}
      <Snackbar
        className={style.snackbar}
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Video added successfully!
        </Alert>
      </Snackbar>
      {error && (
        <Snackbar
          className={style.snackbar}
          open={true}
          autoHideDuration={3000}
          onClose={() => setError(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setError(null)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
      )}
      <Snackbar
        className={style.snackbar}
        open={prop.snackbarOpen}
        autoHideDuration={3000}
        onClose={prop.handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={prop.handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          File size exceeds 100MB!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RecordingUpload;

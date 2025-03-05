import { useState, useEffect } from "react";
import style from "./../styles.module.scss";
import Tooltip from "@mui/material/Tooltip";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseIcon from "@mui/icons-material/Pause";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import CloseIcon from "@mui/icons-material/Close";
import StopIcon from "@mui/icons-material/Stop";
import { ReactMediaRecorder } from "react-media-recorder";
import { Dialog, Box } from "@mui/material";
import RecordingUpload from "./RecordingUpload";

export const RecordSmallPopup = (prop) => {
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(prop.showPopup);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setShowPopup(prop.showPopup);
  }, [prop.showPopup]);

  const handleRecordingStart = (startRecording) => {
    setRecording(true);
    startRecording();
  };

  const handleRecordingStop = (stopRecording) => {
    setRecording(false);
    stopRecording();
  };

  const handlePauseRecording = (pauseRecording) => {
    setPaused(true);
    pauseRecording();
  };

  const handleResumeRecording = (resumeRecording) => {
    setPaused(false);
    resumeRecording();
  };

  const handleRecordingComplete = (blobUrl) => {
    setVideoURL(blobUrl);
    setOpenModal(true); // Show modal when recording ends
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <ReactMediaRecorder
      screen
      audio
      onStop={handleRecordingComplete}
      render={({
        startRecording,
        stopRecording,
        mediaBlobUrl,
        pauseRecording,
        resumeRecording,
      }) => (
        <div className={style.record_mini_popup_container}>
          {showPopup && !mediaBlobUrl && (
            <div className={style.record_mini_popup_inner}>
              <div className={style.record_mini_popup_selection}>
                {!recording ? (
                  <Tooltip title="Start Recording" placement="left">
                    <FiberManualRecordIcon
                      className={style.record_mini_popup_selection_button}
                      onClick={() => handleRecordingStart(startRecording)}
                    />
                  </Tooltip>
                ) : paused ? (
                  <Tooltip title="Resume Recording" placement="left">
                    <PlayCircleOutlineIcon
                      className={style.record_mini_popup_selection_button}
                      onClick={() => handleResumeRecording(resumeRecording)}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Pause Recording" placement="left">
                    <PauseIcon
                      className={style.record_mini_popup_selection_button}
                      onClick={() => handlePauseRecording(pauseRecording)}
                    />
                  </Tooltip>
                )}
                <HorizontalRuleIcon
                  className={style.record_mini_popup_selection_gap}
                />
                {recording && (
                  <>
                    <Tooltip title="Stop Recording" placement="left">
                      <StopIcon
                        className={style.record_mini_popup_selection_button}
                        onClick={() => handleRecordingStop(stopRecording)}
                      />
                    </Tooltip>
                  </>
                )}
                <Tooltip title="Close" placement="left">
                  <CloseIcon
                    className={style.record_mini_popup_selection_cross_button}
                    onClick={prop.closePopup}
                  />
                </Tooltip>
              </div>
            </div>
          )}

          {/* Modal for RecordingUpload */}
          <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
            <Box className={style.modalContainer}>
              {videoURL && (
                <RecordingUpload
                  videoURL={videoURL}
                  snackbarOpen={snackbarOpen}
                  handleCloseSnackbar={() => setSnackbarOpen(false)}
                  closePopup={handleCloseModal}
                />
              )}
            </Box>
          </Dialog>
        </div>
      )}
    />
  );
};

export default RecordSmallPopup;